import { ProductEntity } from "@/utils/entities";
import {
  iconChat,
  iconLoveEmpty,
  iconLoveFilled,
  iconMinusSimple,
  iconPlusSimple,
} from "@/utils/icons";
import CustomTooltip from "@/views/shared_components/CustomTooltip";
import { calculateDiscountedPrice } from "@/utils/numbers";
import { translateAddress } from "@/utils/strings";
import { useState } from "react";
import InfoTabs from "./InfoTabs";
import { Rating } from "@smastrom/react-rating";
import { ratingStyle } from "@/utils/styles";

const styleRowContainer = "flex gap-x-2 items-center flex-wrap my-[0.1rem]";
const styleRowTitle = "font-arsenal-spaced-1 text-aqua-forest-800 font-bold";
const styleRowContentWithLink =
  "font-lato font-light border-b border-aqua-forest-200 hover:border-aqua-forest-300 transition hover:bg-aqua-forest-50";
const styleRowContentWithoutLink = "font-lato font-light";

interface Props {
  product: ProductEntity;
}

export default function MainInfo({ product }: Props) {
  /**
   * State
   */
  const [requiredQuantity, setRequiredQuantity] = useState(1);

  return (
    <div className="justify-self-center flex flex-col w-full">
      {/* <div className="flex flex-col max-w-[32rem] xl:max-w-[40rem] justify-self-center"> */}

      {/* Title */}
      <div className="text-2xl md:text-[2rem] font-arsenal-spaced-1 text-aqua-forest-800 font-bold flex gap-x-8">
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
      <div className={"flex gap-x-2 flex-wrap my-[0.1rem]"}>
        <span className={styleRowTitle}>Shop:</span>

        {product.user && (
          <div className="flex flex-col gap-y-1">
            <div className="flex gap-x-2 items-center">
              <button className={styleRowContentWithLink}>
                {product.user.shopName}
              </button>
              {/* <button className="h-6 w-6">
                <img
                  src={product.user.imageUrl}
                  alt={product.user.shopName}
                  className="h-full w-full object-cover rounded-full border border-sky-300 hover:shadow-md transition"
                />
              </button> */}
            </div>
            <div className="flex gap-x-2 items-center">
              <Rating
                style={{ width: 100 }}
                value={product.user.rating}
                readOnly
                itemStyles={ratingStyle}
              />

              {/* TODO:[3] implement CHAT */}
              <button
                className="text-lg text-aqua-forest-700 hover:scale-110 transition"
                data-tooltip-id={`tooltip-chat`}
              >
                {iconChat()}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Location */}
      <div className={styleRowContainer}>
        <span className={styleRowTitle}>Ships from:</span>

        <div className={styleRowContentWithoutLink}>
          {translateAddress(
            product.user?.city,
            product.user?.state,
            product.user?.country
          )}
        </div>
      </div>

      {/* Tabs */}
      <InfoTabs product={product} />

      {/* TODO: change content based on whether user has added it to wish list */}
      <CustomTooltip id={`tooltip-wishlist`} content={"add to wish list"} />
      <CustomTooltip id={`tooltip-chat`} content={"chat with the seller"} />
    </div>
  );
}
