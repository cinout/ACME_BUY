import useHookSingleImageLoading from "@/customHooks/useHookSingleImageLoading";
import { GQL_PRODUCT_GET_BY_ID } from "@/graphql/productGql";
import { ProductEntity } from "@/utils/entities";
import { albumCoverImageLarge } from "@/utils/strings";
import FullScreenImage from "@/views/shared_components/FullScreenImage";
import { useQuery } from "@apollo/client";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductPage() {
  /**
   * GQL
   */
  const { productId } = useParams();
  const gqlProductGetById = useQuery(GQL_PRODUCT_GET_BY_ID, {
    skip: !productId,
    variables: { id: productId },
  });
  const product = gqlProductGetById?.data?.getById as ProductEntity;

  /**
   * Hooks
   */
  const { imageGridRef, imageGridRefOnLoad } = useHookSingleImageLoading();

  /**
   * State
   */
  const [selectedImage, setSelectedImage] = useState(0);
  const [fullScreenImage, setFullScreenImage] = useState<{
    url: string | undefined;
    name: string | undefined;
  } | null>(null);
  return (
    <>
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr]">
        {/* LEFT */}
        <div className="w-[24rem] lg:w-[28rem] flex flex-col gap-y-4">
          {/* Display Image */}
          <button
            className="w-full aspect-square outline-none"
            onClick={() =>
              setFullScreenImage({
                url: product?.images[selectedImage]?.file,
                name: product?.images[selectedImage]?.name,
              })
            }
          >
            <img
              src={albumCoverImageLarge(product?.images[selectedImage]?.file)}
              alt={"product image"}
              ref={imageGridRef}
              className={`w-full h-full object-contain ${
                !product || imageGridRefOnLoad
                  ? "bg-aqua-forest-50"
                  : "bg-white"
              }`}
            />
          </button>

          {/* other multiple images */}
          <div className="flex w-full gap-x-2 overflow-x-scroll">
            {product?.images.map((image, index) => (
              <button
                key={image.id}
                className={`w-12 h-12 outline-none ${
                  selectedImage === index
                    ? "border-2 border-aqua-forest-300"
                    : ""
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

        <Dialog
          open={!!fullScreenImage}
          onClose={() => {
            setFullScreenImage(null);
          }}
          className="relative z-[60]"
        >
          <FullScreenImage
            setFullScreenImage={setFullScreenImage}
            url={fullScreenImage?.url}
            name={fullScreenImage?.name}
          />
        </Dialog>

        {/* RIGHT */}
        <div>{product?.name}</div>
      </div>
    </>
  ); // TODO:[3] update UI later
}
