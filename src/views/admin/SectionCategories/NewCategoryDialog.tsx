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
import { gql, useMutation } from "@apollo/client";
import { getErrorMessage } from "@/utils/gql";

interface NewCategoryDialogProps {
  isOpen: boolean;
}

// TODO: is there a way to abstract some repetitive query fields? (Fragment)?
const GQL_CREATE_CATEGORY = gql`
  mutation createCategory($name: String!, $image: Upload!) {
    createCategory(name: $name, image: $image) {
      id
      name
      imageUrl
    }
  }
`;

export default function NewCategoryDialog({ isOpen }: NewCategoryDialogProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<FormNewCategoryProps>();

  // TODO: how to update cache after mutation?
  // TODO: how to handle error?
  const [createCategory, mutationResult] = useMutation(GQL_CREATE_CATEGORY, {
    onError: (err) => {
      setShowLoader(false);
      const errorMessage = getErrorMessage(err);
      toast.error(errorMessage);
    },
    onCompleted: (data) => {
      // data is the query result, in the form of object, e.g., createCategory{ id ... }
      setShowLoader(false);
      onCloseDialog();
    },
  });

  // const dispatch = useAppDispatch();
  // const { showLoader } = useAppSelector((state) => state.category);
  const [showLoader, setShowLoader] = useState(false);

  const uploadedImage = watch("image");

  function handleAddImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file, { shouldValidate: true });
    }
  }

  function handleRemoveImage() {
    setValue("image", null);
    clearErrors("image");
  }

  function onSubmit(data: FormNewCategoryProps): void {
    setShowLoader(true);
    void createCategory({ variables: { name: data.name, image: data.image } });
    // .then(() => {
    //   console.log(mutationResult);
    //   setShowLoader(false);
    //   onCloseDialog();
    // })
    // .catch((e) => {
    //   setShowLoader(false);
    //   // toast.error(e);
    // });
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
      header="Create New Category"
    >
      {/* TODO: show header to indicate what this dialog is for */}

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
          // TODO: vallidate -- not duplicate with exisiting ones
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
                image?.type.startsWith("image/") ||
                "Only image files are allowed",
              fileSize: (image) =>
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
          <AdminDialogButtons onCancel={onCloseDialog} submitText="Create" />
        )}
      </form>
    </AdminDialog>
  );
}
