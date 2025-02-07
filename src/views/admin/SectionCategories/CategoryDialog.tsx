import AdminDialog from "@/views/shared_components/AdminDialog";
import AdminDialogButtons from "@/views/shared_components/AdminDialogButtons";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  VALID_NAME_GENERAL,
  VALID_NAME_GENERAL_ERROR_MSG,
} from "@/utils/strings";
import { imageMaxSizeMB } from "@/utils/numbers";
import FormSingleImage from "@/views/shared_components/form/FormSingleImages";
import FormInput from "@/views/shared_components/form/FormInput";
import { FormNewCategoryProps } from "@/redux/reducers/categoryReducer";
import LoadingIndicator from "@/views/shared_components/LoadingIndicator";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import {
  GQL_CATEGORY_CREATE,
  GQL_CATEGORIES_GET_ALL,
  GQL_CATEGORY_UPDATE,
} from "@/graphql/categoryGql";
import { getErrorMessage } from "@/graphql";
import { CategoryEntity } from "@/utils/entities";

interface CategoryDialogProps {
  isOpen: boolean;
  mode: "Create" | "Edit";
  editCategoryInfo: CategoryEntity | undefined;
}

export default function CategoryDialog({
  isOpen,
  mode,
  editCategoryInfo,
}: CategoryDialogProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
    reset,
    clearErrors,
  } = useForm<FormNewCategoryProps>({
    defaultValues: {
      name: mode === "Create" ? "" : editCategoryInfo?.name,
      image: mode === "Create" ? null : editCategoryInfo?.imageUrl,
    },
  });

  const [createCategory] = useMutation(GQL_CATEGORY_CREATE, {
    onError: (err) => {
      setShowLoader(false);
      const errorMessage = getErrorMessage(err);
      toast.error(errorMessage);
    },
    onCompleted: () => {
      setShowLoader(false);
      onCloseDialog();
    },
    update(cache, { data }) {
      // Read the current data from the cache
      const existingData = cache.readQuery<{
        getAllCategories: FormNewCategoryProps[];
      }>({
        query: GQL_CATEGORIES_GET_ALL,
      });

      cache.writeQuery({
        query: GQL_CATEGORIES_GET_ALL,
        data: {
          getAllCategories: [
            ...(existingData?.getAllCategories ?? []),
            data.createCategory,
          ],
        },
      });
    },
  });

  const [updateCategory] = useMutation(GQL_CATEGORY_UPDATE, {
    onError: (err) => {
      setShowLoader(false);
      const errorMessage = getErrorMessage(err);
      toast.error(errorMessage);
    },
    onCompleted: () => {
      setShowLoader(false);
      onCloseDialog();
    },
  });

  const [showLoader, setShowLoader] = useState(false);
  const uploadedImage = watch("image");

  function handleAddImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file, { shouldValidate: true, shouldDirty: true });
    }
  }

  function handleRemoveImage() {
    setValue("image", null, { shouldDirty: true });
    clearErrors("image");
  }

  function onSubmit(data: FormNewCategoryProps): void {
    setShowLoader(true);
    if (mode === "Create") {
      // Create Mode
      void createCategory({
        variables: { name: data.name, image: data.image },
      });
    } else {
      // Edit Mode
      void updateCategory({
        variables: {
          id: editCategoryInfo!.id,
          name: data.name,
          image: data.image,
        },
      });
    }
  }

  function onCloseDialog() {
    reset();
    void navigate(-1);
  }

  return (
    <AdminDialog
      isOpen={isOpen}
      onClose={onCloseDialog}
      disableClose={showLoader}
      header={
        mode === "Create"
          ? "Create New Category"
          : `Edit Category ${editCategoryInfo?.name}`
      }
    >
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
        className="w-full sm:w-96"
      >
        {/* Name Section */}
        <FormInput
          registration={register("name", {
            required: "Category name is required",
            maxLength: {
              value: 20,
              message: "Name must be at most 20 characters",
            },
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
            pattern: {
              value: VALID_NAME_GENERAL,
              message: VALID_NAME_GENERAL_ERROR_MSG,
            },
          })}
          // TODO: validate -- not duplicate with exisiting ones
          error={errors.name}
          label="Category Name"
          additionalStyleWrapper="flex gap-2 flex-wrap"
          additionalStyleLabel="flex-1"
          additionalStyleContentWrapper="w-60"
        />

        {/* Image Section */}
        <FormSingleImage
          registration={register("image", {
            required: "Image is required",
            validate: {
              fileType: (image) =>
                // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                typeof image === "string" ||
                image?.type.startsWith("image/") ||
                "Only image files are allowed",
              fileSize: (image) =>
                typeof image === "string" ||
                (image?.size ?? 0) < imageMaxSizeMB * 1024 * 1024 ||
                `Image must be smaller than ${imageMaxSizeMB}MB`,
            },
          })}
          label="Upload an image"
          handleAddImage={handleAddImage}
          handleRemoveImage={handleRemoveImage}
          uploadedImage={uploadedImage}
          additionalStyleWrapper="flex gap-2 mt-4 flex-wrap"
          additionalStyleLabel="flex-1"
          additionalStyleContentWrapper="w-60"
          error={errors.image}
        />

        {/* Submit */}
        {showLoader ? (
          <div className="flex justify-center mt-8">
            <LoadingIndicator />
          </div>
        ) : (
          <AdminDialogButtons
            onCancel={onCloseDialog}
            submitText="Update"
            isDirty={isDirty}
          />
        )}
      </form>
    </AdminDialog>
  );
}
