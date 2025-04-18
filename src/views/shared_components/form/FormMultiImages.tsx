import {
  albumCoverImageLarge,
  albumCoverImageSmall,
  capFirstLetter,
  shortenMiddle,
} from "@/utils/strings";
import {
  styleFormErrorMessage,
  styleFormLabel,
  styleImagePreview,
  styleImageUploadIndicator,
} from "@/utils/styles";
import { ChangeEvent, useMemo, useRef, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { Dialog } from "@headlessui/react";
import FullScreenImage from "../FullScreenImage";
import LoadingIndicator from "../LoadingIndicator";
import useHookMultipleImageLoading from "@/customHooks/useHookMultipleImageLoading";
import {
  iconAddWithCircle,
  iconImageNotSupported,
  iconTrashCan,
} from "@/utils/icons";

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

  const imageIds = useMemo(() => {
    return uploadedImages?.map((image) => image.id) || [];
  }, [uploadedImages]);
  const { getImageRefMap, imageGridOnLoad } =
    useHookMultipleImageLoading(imageIds);

  const [fullScreenImage, setFullScreenImage] = useState<{
    url: string | undefined;
    name: string | undefined;
  } | null>(null);

  function handleClickImageUploadButton() {
    fileInputRef.current?.click();
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
        multiple
        {...registration}
        ref={fileInputRef}
        onChange={handleAddImages}
        className="hidden"
        id={id ?? registration.name}
      />

      {/* TODO:[3] support drag and re-roder */}
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
                // disabled={disabled}
              >
                {typeof file === "string" ? (
                  imageGridOnLoad.get(id) ? (
                    <div className="inline-flex justify-center items-center w-full aspect-square rounded-2xl outline">
                      <LoadingIndicator />
                    </div>
                  ) : (
                    <img
                      src={albumCoverImageSmall(file)}
                      alt="Preview"
                      className={styleImagePreview}
                      onClick={() =>
                        setFullScreenImage({
                          url: albumCoverImageLarge(file),
                          name,
                        })
                      }
                      ref={(node) => {
                        const map = getImageRefMap();
                        map.set(id, node);
                        return () => {
                          // called when removing
                          map.delete(id);
                        };
                      }}
                    />
                  )
                ) : file.type.startsWith("image/") ? (
                  // imageGridOnLoad.get(id) ? (
                  //   <div className="inline-flex justify-center items-center w-full aspect-square rounded-2xl outline">
                  //     <LoadingIndicator />
                  //   </div>
                  // ) : (
                  //   <img
                  //     src={URL.createObjectURL(file)}
                  //     alt="Preview"
                  //     className={styleImagePreview}
                  //     onClick={() =>
                  //       setFullScreenImage({
                  //         url: URL.createObjectURL(file),
                  //         name,
                  //       })
                  //     }
                  //     ref={(node) => {
                  //       const map = getImageRefMap();
                  //       map.set(id, node);
                  //       return () => {
                  //         // called when removing
                  //         map.delete(id);
                  //       };
                  //     }}
                  //   />
                  // )
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className={styleImagePreview}
                    onClick={() =>
                      setFullScreenImage({
                        url: URL.createObjectURL(file),
                        name,
                      })
                    }
                    // ref={(node) => {
                    //   const map = getImageRefMap();
                    //   map.set(id, node);
                    //   return () => {
                    //     // called when removing
                    //     map.delete(id);
                    //   };
                    // }}
                  />
                ) : (
                  <div className="w-[inherit] aspect-square border border-sky-50 rounded-2xl shadow-2xl flex flex-col justify-center items-center bg-red-400 gap-y-2 group-hover:brightness-[30%]">
                    {iconImageNotSupported("text-[3rem]")}
                    <span className="text-sm">Unsupported </span>
                  </div>
                )}

                {/* DELETE */}
                {!disabled && (
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:inline-flex text-[3rem] border-2 shadow-2xl rounded-full p-4 bg-rose-200 text-rose-900 not-disabled:hover:scale-105 transition"
                    onClick={() => handleRemoveImage(id)}
                  >
                    {iconTrashCan()}
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
            {iconAddWithCircle("text-2xl group-hover:scale-105 transition")}
            <span className="text-sm">Click to upload multiple images</span>
          </button>
        )}
      </div>

      {/* TODO:[2] show error messages individually */}
      {errorMessage && (
        <p className={`${styleFormErrorMessage} ${additionalStyleError}`}>
          {errorMessage}
        </p>
      )}

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
