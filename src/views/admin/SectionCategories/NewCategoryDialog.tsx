import AdminDialog from "@/views/shared_components/AdminDialog";
import AdminDialogButtons from "@/views/shared_components/AdminDialogButtons";
import { useRef } from "react";
import { FaImage } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  VALID_NAME_GENERAL,
  VALID_NAME_GENERAL_ERROR_MSG,
} from "@/utils/strings";

interface NewCategoryDialogProps {
  isOpen: boolean;
  // setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormInput {
  name: string;
  image: FileList | null;
}

export default function NewCategoryDialog({ isOpen }: NewCategoryDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormInput>();

  const uploadedImage = watch("image")?.[0];

  function handleClickImageUploadButton() {
    fileInputRef.current?.click();
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
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[30rem]"
      >
        {/* Name Section */}
        <div className="flex justify-between gap-2 flex-wrap">
          <label htmlFor="name" className="font-semibold">
            New Category Name:
          </label>

          <div className="w-full tn:w-1/2 flex flex-col items-start ">
            <input
              type="text"
              id="name"
              {...register("name", {
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
              className="bg-sky-100 text-sky-700 px-2 py-1 rounded-md"
              autoComplete="on"
            />

            {errors.name && (
              <p className="text-slate-300 text-sm italic">
                {errors.name.message}
              </p>
            )}
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-between gap-2 flex-wrap mt-4">
          <label htmlFor="image" className="font-semibold">
            Upload an image:
          </label>

          {/* Hidden */}
          <input
            type="file"
            id="image"
            {...register("image", {
              required: "Image is required",
              validate: {
                fileType: (files) =>
                  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                  files?.[0]?.type.startsWith("image/") ||
                  "Only image files are allowed",
                fileSize: (files) =>
                  (files?.[0]?.size ?? 0) < 2 * 1024 * 1024 ||
                  "File must be smaller than 2MB",
              },
            })}
            ref={fileInputRef}
            onChange={
              (e) => setValue("image", e.target.files, { shouldValidate: true }) // Trigger validation
            }
            className="hidden"
          />

          <div className="flex flex-col justify-center items-center w-1/2">
            <button
              className="flex justify-center items-center w-28 h-28 bg-sky-100 rounded-2xl text-sky-700"
              type="button"
              onClick={handleClickImageUploadButton}
            >
              {uploadedImage?.type.startsWith("image/") && !errors.image ? (
                <img
                  src={URL.createObjectURL(uploadedImage)}
                  alt="Preview"
                  className="w-[inherit] h-[inherit] rounded-[inherit] shadow-2xl"
                />
              ) : (
                <FaImage className="text-2xl" />
              )}
            </button>

            {errors.image ? (
              <p className="text-slate-300 text-sm italic">
                {errors.image?.message}
              </p>
            ) : (
              <div className="text-sm w-44 text-center">
                {uploadedImage?.name}
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <AdminDialogButtons onCancel={onCloseDialog} submitText="Create" />
      </form>
    </AdminDialog>
  );
}
