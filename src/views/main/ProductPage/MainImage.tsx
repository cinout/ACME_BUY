import useHookSingleImageLoading from "@/customHooks/useHookSingleImageLoading";
import { ProductEntity } from "@/utils/entities";
import { albumCoverImageLarge } from "@/utils/strings";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  product: ProductEntity;
  setFullScreenImage: Dispatch<
    SetStateAction<{
      url: string | undefined;
      name: string | undefined;
    } | null>
  >;
}

export default function MainImage({ product, setFullScreenImage }: Props) {
  /**
   * Hooks
   */
  const { imageGridRef, imageGridRefOnLoad } = useHookSingleImageLoading();

  /**
   * State
   */
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="w-full tn:w-[24rem] sm:w-[24rem] lg:w-[28rem] flex flex-col gap-y-4 justify-self-center">
      {/* Display Image */}
      <button
        className="w-full aspect-square outline-none"
        onClick={() =>
          setFullScreenImage({
            url: product.images[selectedImage]?.file,
            name: product.images[selectedImage]?.name,
          })
        }
      >
        <img
          src={albumCoverImageLarge(product.images[selectedImage]?.file)}
          alt={"product image"}
          ref={imageGridRef}
          className={`w-full aspect-square object-contain ${
            !product || imageGridRefOnLoad ? "bg-aqua-forest-50" : "bg-white"
          }`}
        />
      </button>

      {/* other multiple images */}
      <div className="flex w-full gap-x-2 overflow-x-scroll">
        {product.images.map((image, index) => (
          <button
            key={image.id}
            className={`w-14 h-14 outline-none p-1 ${
              selectedImage === index ? "border-b-2 border-aqua-forest-300" : ""
            }`}
            onClick={() => setSelectedImage(index)}
          >
            <img
              src={albumCoverImageLarge(image.file)}
              alt={image.name}
              className="w-full h-full object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
