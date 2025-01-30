import AdminDialog from "@/views/shared_components/AdminDialog";
import AdminDialogButtons from "@/views/shared_components/AdminDialogButtons";
import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  VALID_NAME_GENERAL,
  VALID_NAME_GENERAL_ERROR_MSG,
} from "@/utils/strings";
import { imageMaxSizeMB } from "@/utils/numbers";
import FormSingleImage from "@/views/shared_components/form/FormSingleImages";
import FormInput from "@/views/shared_components/form/FormInput";

interface NewCategoryDialogProps {
  isOpen: boolean;
  // setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormInput {
  name: string;
  image: File | null;
}

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
  } = useForm<FormInput>();

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

  function onSubmit(data: FormInput): void {
    // TODO: create an entry in the backend, and also udpate in the frontend
    onCloseDialog();
  }

  function onCloseDialog() {
    reset();
    void navigate(-1);
  }

  return (
    <AdminDialog isOpen={isOpen} onClose={onCloseDialog}>
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
        <AdminDialogButtons onCancel={onCloseDialog} submitText="Create" />
      </form>
    </AdminDialog>
  );
}
