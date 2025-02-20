import { shortenMiddle } from "@/utils/strings";
import { DialogPanel } from "@headlessui/react";
import { SetStateAction } from "react";
import LoadingIndicatorWithDiv from "./LoadingIndicatorWithDiv";
import useHookSingleImageLoading from "@/customHooks/useHookSingleImageLoading";
import { iconCrossClose } from "@/utils/icons";

interface Props {
  setFullScreenImage: (
    value: SetStateAction<{
      url: string | undefined;
      name: string | undefined;
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
  const { imageGridRef, imageGridRefOnLoad } = useHookSingleImageLoading();

  return (
    <div className="fixed inset-0 flex w-screen h-screen items-center justify-center bg-black/65">
      <DialogPanel className="flex flex-col">
        {imageGridRefOnLoad ? (
          <LoadingIndicatorWithDiv />
        ) : (
          <>
            <img
              src={url}
              alt="image"
              ref={imageGridRef}
              // className="border-8 gradient-border max-h-[90vh]"
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
                {iconCrossClose("text-2xl")}
              </button>
            </div>
          </>
        )}
      </DialogPanel>
    </div>
  );
}
