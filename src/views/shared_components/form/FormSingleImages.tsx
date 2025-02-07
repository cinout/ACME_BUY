import { capFirstLetter, shortenMiddle } from "@/utils/strings";
import {
  styleFormErrorMessage,
  styleFormLabel,
  styleImagePreview,
  styleImageUploadIndicator,
} from "@/utils/styles";
import { ChangeEvent, useRef } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import { MdImageNotSupported } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";

interface FormProps {
  additionalStyleButton?: string;
  additionalStyleLabel?: string;
  additionalStyleWrapper?: string;
  additionalStyleError?: string;
  additionalStyleContentWrapper?: string;
  showLabel?: boolean;
  registration: UseFormRegisterReturn;
  label?: string; // default to registration.name
  id?: string; // default to registration.name
  error?: FieldError | undefined;
  uploadedImage: File | string | null;
  handleAddImage: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: () => void;
  disabled?: boolean;
}

export default function FormSingleImage({
  additionalStyleButton,
  additionalStyleLabel,
  additionalStyleWrapper,
  additionalStyleError,
  showLabel = true,
  registration,
  label,
  id,
  error,
  uploadedImage,
  handleAddImage,
  handleRemoveImage,
  additionalStyleContentWrapper,
  disabled, // TODO: how to treat that?
}: FormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // TODO: there is an error when add two same files consecutively
  function handleClickImageUploadButton() {
    if (!uploadedImage) fileInputRef.current?.click();
  }

  return (
    <div className={`${additionalStyleWrapper}`}>
      {showLabel && (
        <label
          // htmlFor={registration.name}
          className={`${styleFormLabel} ${additionalStyleLabel}`}
        >
          {capFirstLetter(label ?? registration.name)}:
        </label>
      )}

      {/* HIDDEN */}
      <input
        type="file"
        {...registration}
        ref={fileInputRef}
        onChange={handleAddImage}
        className="hidden"
        id={id ?? registration.name}
      />

      <div
        className={`flex flex-col items-center ${additionalStyleContentWrapper}`}
      >
        <button
          className={`relative group flex flex-col justify-center items-center w-28 h-28  rounded-2xl text-sky-700 gap-y-2 hover:brightness-75 transition ${additionalStyleButton}`}
          type="button"
          onClick={handleClickImageUploadButton}
        >
          {uploadedImage ? (
            // image read from backend
            typeof uploadedImage === "string" ? (
              <img
                src={uploadedImage}
                alt="Preview"
                className={`${styleImagePreview}`}
              />
            ) : // image is uploaded by user, and of correct file type
            uploadedImage?.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(uploadedImage)}
                alt="Preview"
                className={`${styleImagePreview}`}
              />
            ) : (
              // Unspported format
              <div className="w-[inherit] aspect-square border border-sky-50 rounded-2xl shadow-2xl flex flex-col justify-center items-center bg-red-400 gap-y-2  group-hover:brightness-[30%] text-white">
                <MdImageNotSupported className="text-[3rem]" />
                <span className="text-sm">Unsupported </span>
              </div>
            )
          ) : (
            // Upload Indicator
            <div className={styleImageUploadIndicator}>
              <IoIosAddCircle className="text-2xl  group-hover:scale-110 transition" />
              <span className="text-sm">Click to upload an image</span>
            </div>
          )}

          {/* DELETE */}
          {uploadedImage && (
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  hidden group-hover:inline-flex text-[3rem] border-2 shadow-2xl rounded-full p-1 bg-rose-200 text-rose-900 hover:scale-110 transition"
              onClick={() => handleRemoveImage()}
            >
              <MdDelete />
            </div>
          )}
        </button>

        {/* File Name */}
        {uploadedImage instanceof File && uploadedImage?.name && (
          <span className="text-xs text-center">
            {shortenMiddle(uploadedImage.name, 30)}
          </span>
        )}

        {/* Error Message */}
        {error?.message && (
          <p className={`${styleFormErrorMessage} ${additionalStyleError}`}>
            {error?.message}
          </p>
        )}
      </div>
    </div>
  );
}
