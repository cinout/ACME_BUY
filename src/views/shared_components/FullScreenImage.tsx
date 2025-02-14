import { shortenMiddle } from "@/utils/strings";
import { DialogPanel } from "@headlessui/react";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import LoadingIndicatorWithDiv from "./LoadingIndicatorWithDiv";

interface Props {
  setFullScreenImage: (
    value: SetStateAction<{
      url: string;
      name: string;
    } | null>
  ) => void;
  url: string | undefined;
  name: string | undefined;
}

export default function FullScreenImage({
  url,
  name,
  setFullScreenImage,
}: Props) {
  const fullScreenImageRef = useRef<HTMLImageElement>(null);
  const [fullScreenImageRefOnLoad, setFullScreenImageRefOnLoad] =
    useState(false);

  useEffect(() => {
    if (fullScreenImageRef.current) {
      setFullScreenImageRefOnLoad(true);

      const handleLoad = () => {
        setFullScreenImageRefOnLoad(false);
      };

      const handleError = () => {
        setFullScreenImageRefOnLoad(false);
      };

      // Attach event listeners
      fullScreenImageRef.current.onload = handleLoad;
      fullScreenImageRef.current.onerror = handleError;
    }
  }, [url]);

  return (
    <div className="fixed inset-0 flex w-screen h-screen items-center justify-center bg-black/65">
      <DialogPanel className="flex flex-col">
        {fullScreenImageRefOnLoad ? (
          <LoadingIndicatorWithDiv />
        ) : (
          <>
            <img
              src={url}
              alt="image"
              ref={fullScreenImageRef}
              className="border-8 border-aqua-forest-300/50 max-h-[90vh]"
            />
            <div className="flex justify-between text-white">
              <span className="text-sm font-light">
                {shortenMiddle(name, 90)}
              </span>
              <button
                onClick={() => {
                  setFullScreenImage(null);
                }}
              >
                <IoCloseOutline className="text-2xl" />
              </button>
            </div>{" "}
          </>
        )}
      </DialogPanel>
    </div>
  );
}
