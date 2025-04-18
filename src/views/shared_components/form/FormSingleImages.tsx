import {
  albumCoverImageLarge,
  capFirstLetter,
  shortenMiddle,
} from "@/utils/strings";
import {
  styleFormErrorMessage,
  styleFormLabel,
  styleImagePreview,
  styleImageUploadIndicator,
} from "@/utils/styles";
import { ChangeEvent, useRef, useState } from "react";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from "react-hook-form";
import { Dialog } from "@headlessui/react";
import FullScreenImage from "../FullScreenImage";
import LoadingIndicator from "../LoadingIndicator";
import useHookSingleImageLoading from "@/customHooks/useHookSingleImageLoading";
import {
  iconAddWithCircle,
  iconImageNotSupported,
  iconTrashCan,
} from "@/utils/icons";

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
  error?:
    | Merge<
        FieldError,
        FieldErrorsImpl<{
          file: NonNullable<string | File | null>;
          name: string;
        }>
      >
    | undefined;
  uploadedImage: { file: File | string | null; name: string | null };
  handleAddImage: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: () => void;
  disabled?: boolean;
  hideImageName?: boolean;
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
  disabled = false,
  hideImageName = false,
}: FormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fullScreenImage, setFullScreenImage] = useState<{
    url: string | undefined;
    name: string | undefined;
  } | null>(null);

  const { imageGridRef, imageGridRefOnLoad } = useHookSingleImageLoading();

  // TODO:[2] there is an error when add two same files consecutively
  function handleClickImageUploadButton() {
    if (!uploadedImage.file) fileInputRef.current?.click();
  }

  return (
    <div className={`${additionalStyleWrapper}`}>
      {showLabel && (
        <div
          // htmlFor={registration.name}
          className={`${styleFormLabel} ${additionalStyleLabel}`}
        >
          {label ?? capFirstLetter(registration.name)}:
        </div>
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
          className={`relative group flex flex-col justify-center items-center w-28 h-28 rounded-2xl text-sky-700 gap-y-2 not-disabled:hover:brightness-75 transition ${additionalStyleButton}`}
          type="button"
          onClick={handleClickImageUploadButton}
          // disabled={disabled}
        >
          {uploadedImage.file ? (
            // image read from backend
            typeof uploadedImage.file === "string" ? (
              imageGridRefOnLoad ? (
                <div className="inline-flex justify-center items-center w-full aspect-square rounded-2xl outline outline-white">
                  <LoadingIndicator />
                </div>
              ) : (
                <img
                  src={uploadedImage.file}
                  alt="Preview"
                  className={`${styleImagePreview}`}
                  onClick={() =>
                    setFullScreenImage({
                      url: albumCoverImageLarge(uploadedImage.file as string),
                      name: uploadedImage.name!,
                    })
                  }
                  ref={imageGridRef}
                />
              )
            ) : // image is uploaded by user, and of correct file type
            uploadedImage.file?.type.startsWith("image/") ? (
              // imageGridRefOnLoad ? (
              //   <div className="inline-flex justify-center items-center w-full aspect-square rounded-2xl outline outline-white">
              //     <LoadingIndicator />
              //   </div>
              // ) : (
              //   <img
              //     src={URL.createObjectURL(uploadedImage.file)}
              //     alt="Preview"
              //     className={`${styleImagePreview}`}
              //     onClick={() =>
              //       setFullScreenImage({
              //         url: albumCoverImageLarge(
              //           URL.createObjectURL(uploadedImage.file as File)
              //         ),
              //         name: uploadedImage.name!,
              //       })
              //     }
              //     ref={imageGridRef}
              //   />
              // )
              <img
                src={URL.createObjectURL(uploadedImage.file)}
                alt="Preview"
                className={`${styleImagePreview}`}
                onClick={() =>
                  setFullScreenImage({
                    url: albumCoverImageLarge(
                      URL.createObjectURL(uploadedImage.file as File)
                    ),
                    name: uploadedImage.name!,
                  })
                }
                // ref={imageGridRef}
              />
            ) : (
              // Unspported format
              <div
                className={`w-[inherit] aspect-square border border-sky-50 rounded-2xl shadow-2xl flex flex-col justify-center items-center bg-red-400 gap-y-2 text-white group-hover:brightness-[30%]`}
              >
                {iconImageNotSupported("text-[3rem]")}
                <span className="text-sm">Unsupported </span>
              </div>
            )
          ) : (
            // Upload Indicator
            <div className={styleImageUploadIndicator}>
              {iconAddWithCircle("text-2xl  group-hover:scale-105 transition")}
              <span className="text-sm">Click to upload an image</span>
            </div>
          )}

          {/* DELETE */}
          {uploadedImage.file && !disabled && (
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  hidden group-hover:inline-flex text-[3rem] border-2 shadow-2xl rounded-full p-1 bg-rose-200 text-rose-900 not-disabled:hover:scale-105 transition"
              onClick={() => handleRemoveImage()}
            >
              {iconTrashCan()}
            </div>
          )}
        </button>

        {/* File Name */}
        {!hideImageName && uploadedImage?.name && (
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

      <Dialog
        open={!!(fullScreenImage && disabled)}
        onClose={() => {
          setFullScreenImage(null);
        }}
        className="relative z-[60]"
      >
        <FullScreenImage
          setFullScreenImage={setFullScreenImage}
          url={albumCoverImageLarge(fullScreenImage?.url)}
          name={fullScreenImage?.name}
        />
      </Dialog>
    </div>
  );
}
