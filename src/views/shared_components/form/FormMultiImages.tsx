import { capFirstLetter, shortenMiddle } from "@/utils/strings";
import {
  styleFormErrorMessage,
  styleFormLabel,
  styleImagePreview,
  styleImageUploadIndicator,
} from "@/utils/styles";
import { ChangeEvent, useRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import { MdImageNotSupported } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";

interface FormInputProps {
  additionalStyleButton?: string; // for the input field
  additionalStyleLabel?: string; // for the input field
  additionalStyleWrapper?: string; // for the input field
  additionalStyleError?: string; // for the input field
  showLabel?: boolean;
  registration: UseFormRegisterReturn;
  label?: string; // default to registration.name
  id?: string; // default to registration.name
  errorMessage?: string | undefined;
  uploadedImages: { id: string; file: File | string; name: string }[];
  handleAddImages: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (removeIndex: string) => void;
  disabled?: boolean;
}

export default function FormMultipleImages({
  additionalStyleButton,
  additionalStyleLabel,
  additionalStyleWrapper,
  additionalStyleError,
  showLabel = true,
  registration,
  label,
  id,
  errorMessage,
  uploadedImages,
  handleAddImages,
  handleRemoveImage,
  disabled,
}: FormInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleClickImageUploadButton() {
    fileInputRef.current?.click();
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
        multiple
        {...registration}
        ref={fileInputRef}
        onChange={handleAddImages}
        className="hidden"
        id={id ?? registration.name}
      />

      {/* TODO: support drag and re-roder */}
      <div className="flex gap-2 flex-wrap">
        {/* Show Images */}

        {uploadedImages &&
          Array.from(uploadedImages)?.map(({ id, file, name }) => (
            <div
              key={id}
              className="flex flex-col justify-start items-center w-28"
            >
              <button
                className="relative w-[inherit] aspect-square group"
                type="button"
                disabled={disabled}
              >
                {typeof file === "string" ? (
                  <img src={file} alt="Preview" className={styleImagePreview} />
                ) : file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className={styleImagePreview}
                  />
                ) : (
                  <div className="w-[inherit] aspect-square border border-sky-50 rounded-2xl shadow-2xl flex flex-col justify-center items-center bg-red-400 gap-y-2 group-hover:brightness-[30%]">
                    <MdImageNotSupported className="text-[3rem]" />
                    <span className="text-sm">Unsupported </span>
                  </div>
                )}

                {/* DELETE */}
                {!disabled && (
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  hidden group-hover:inline-flex text-[3rem] border-2 shadow-2xl rounded-full p-1 bg-rose-200 text-rose-900 not-disabled:hover:scale-110 transition"
                    onClick={() => handleRemoveImage(id)}
                  >
                    <MdDelete />
                  </div>
                )}
              </button>

              {/* File Name */}

              <span className="text-xs text-center">
                {shortenMiddle(name, 25)}
              </span>
            </div>
          ))}

        {/* ADD new image */}
        {!disabled && (
          <button
            className={`${styleImageUploadIndicator} ${additionalStyleButton}`}
            type="button"
            onClick={handleClickImageUploadButton}
            disabled={disabled}
          >
            <IoIosAddCircle className="text-2xl group-hover:scale-110 transition" />
            <span className="text-sm">Click to upload multiple images</span>
          </button>
        )}
      </div>

      {/* TODO: show error messages individually */}
      {errorMessage && (
        <p className={`${styleFormErrorMessage} ${additionalStyleError}`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
