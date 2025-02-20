import useHookSingleImageLoading from "@/customHooks/useHookSingleImageLoading";
import { GQL_PRODUCT_GET_BY_ID } from "@/graphql/productGql";
import { ProductEntity } from "@/utils/entities";
import {
  iconLoveEmpty,
  iconLoveFilled,
  iconMinusSimple,
  iconPlusSimple,
} from "@/utils/icons";
import { calculateDiscountedPrice } from "@/utils/numbers";
import { albumCoverImageLarge, translateAddress } from "@/utils/strings";
import CustomTooltip from "@/views/shared_components/CustomTooltip";
import FullScreenImage from "@/views/shared_components/FullScreenImage";
import { useQuery } from "@apollo/client";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const styleRowContainer = "flex gap-x-2 items-center flex-wrap my-[0.1rem]";
const styleRowTitle = "font-arsenal-spaced-1 text-aqua-forest-800";
const styleRowContentWithLink =
  "font-lato font-light border-b border-aqua-forest-100 hover:border-aqua-forest-200 transition";
const styleRowContentWithoutLink = "font-lato font-light";
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
  const [requiredQuantity, setRequiredQuantity] = useState(1);

  return product ? (
    <div>
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-x-2">
        {/* LEFT */}
        <div className="w-full tn:w-[24rem] sm:w-[24rem] lg:w-[28rem] flex flex-col gap-y-4 outline justify-self-center">
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
                !product || imageGridRefOnLoad
                  ? "bg-aqua-forest-50"
                  : "bg-white"
              }`}
            />
          </button>

          {/* other multiple images */}
          <div className="flex w-full gap-x-2 overflow-x-scroll">
            {product.images.map((image, index) => (
              <button
                key={image.id}
                className={`w-14 h-14 outline-none p-1 ${
                  selectedImage === index
                    ? "border-b-2 border-aqua-forest-300"
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

        {/* RIGHT */}
        <div className="outline flex flex-col">
          {/* Title */}
          <div className="text-2xl md:text-[2rem] font-arsenal-spaced-1 text-aqua-forest-800 font-bold flex justify-between">
            {product.name}
            {/* TODO: implement wish list */}
            <button data-tooltip-id={`tooltip-wishlist`}>
              {iconLoveEmpty()}
              {/* {iconLoveFilled()} */}
            </button>
          </div>

          {/* Artist */}
          <div className="text font-lato text-aqua-forest-500">
            {product.artist}
          </div>

          {/* Price */}
          <div className="my-2 flex gap-x-2 items-center">
            <span
              className={`text-xl text-aqua-forest-700 font-arsenal-spaced-1 ${
                product.discount > 0 && "line-through"
              }`}
            >
              ${product.price}
            </span>
            {product.discount > 0 && (
              <>
                <div className="bg-rose-300 text-rose-800 px-1 font-lato">
                  {product.discount}% off
                </div>

                <span className="text-xl text-rose-900 font-arsenal-spaced-1">
                  ${calculateDiscountedPrice(product.price, product.discount)}
                </span>
              </>
            )}
          </div>

          {/* Quantity Select + Add to Cart */}
          <div className="flex gap-x-6 my-4  font-arsenal-spaced-1">
            {/*  Quantity Select */}
            <div className="flex flex-col">
              {/* quantity selector */}
              <div className="flex">
                <button
                  className="bg-aqua-forest-100 text-aqua-forest-950 text-lg w-10 h-10 flex justify-center items-center group not-disabled:hover:bg-aqua-forest-300 transition disabled:bg-slate-200"
                  disabled={product.stock === 0 || requiredQuantity === 0}
                  onClick={() => setRequiredQuantity((v) => v - 1)}
                >
                  {iconMinusSimple(`group-hover:scale-125 transition`)}
                </button>
                <input
                  type="number"
                  name="order quantity"
                  id="order quantity"
                  className="w-20 h-10 bg-aqua-forest-50 text-center appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none outline-none disabled:bg-slate-100"
                  // defaultValue={product.stock > 0 ? 1 : 0}
                  value={requiredQuantity}
                  onChange={(e) => {
                    const inputValue = parseInt(e.target.value || "0", 10);
                    setRequiredQuantity(
                      Math.max(0, Math.min(inputValue, product.stock)) // ensures value does not exceed max
                    );
                  }}
                  disabled={product.stock === 0}
                  min={0}
                  max={product.stock}
                  step={1}
                />
                <button
                  className="bg-aqua-forest-100 text-aqua-forest-950 text-lg w-10 h-10 flex justify-center items-center group not-disabled:hover:bg-aqua-forest-300 transition disabled:bg-slate-200"
                  disabled={
                    product.stock === 0 || requiredQuantity >= product.stock
                  }
                  onClick={() => setRequiredQuantity((v) => v + 1)}
                >
                  {iconPlusSimple("group-hover:scale-125 transition")}
                </button>
              </div>

              {/* stock information */}
              <div className="text-sm">
                {product.stock > 0 ? (
                  <span>Stock: {product.stock}</span>
                ) : (
                  <span className="text-rose-500">Out of stock!</span>
                )}
              </div>
            </div>

            {/* Add to Cart */}
            {/* TODO:[3] implement */}
            <button
              className="bg-aqua-forest-100 h-10 px-2 not-disabled:hover:bg-aqua-forest-300 transition disabled:bg-slate-200 shadow-md"
              disabled={product.stock === 0}
            >
              Add to cart
            </button>
          </div>

          {/* Seller */}
          {/* TODO:[3] click and lead to seller page */}
          <div className={styleRowContainer}>
            <span className={styleRowTitle}>Seller:</span>

            <button className={styleRowContentWithLink}>
              {product.user?.shopName}
            </button>

            <button className="h-6 w-6">
              <img
                src={product.user?.imageUrl}
                alt={product.user?.shopName}
                className="h-full w-full object-cover rounded-full border border-sky-300 hover:shadow-md transition"
              />
            </button>
          </div>

          {/* Location */}
          <div className={styleRowContainer}>
            <span className={styleRowTitle}>Ships from:</span>

            <button className={styleRowContentWithoutLink}>
              {translateAddress(
                product.user?.city,
                product.user?.state,
                product.user?.country
              )}
            </button>
          </div>

          {/*  */}
        </div>

        {/* Full-screen */}
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
      </div>

      {/* TODO: change content based on whether user has added it to wish list */}
      <CustomTooltip id={`tooltip-wishlist`} content={"add to wish list"} />
    </div>
  ) : (
    <div className="h-[100vh]"></div>
  );
}
