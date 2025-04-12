import {
  iconChat,
  iconLoveEmpty,
  iconLoveFilled,
  iconMinusSimple,
  iconPlusSimple,
  iconShoppingCart,
} from "@/utils/icons";
import CustomTooltip from "@/views/shared_components/CustomTooltip";
import { calculateDiscountedPriceAndReturnString } from "@/utils/numbers";
import { translateAddress } from "@/utils/strings";
import { useState } from "react";
import InfoTabs from "./InfoTabs";
import { Rating } from "@smastrom/react-rating";
import { ratingStyle, styleRowContentWithLink } from "@/utils/styles";
import { Link, useNavigate } from "react-router-dom";
import { useHookGetUserInfo } from "@/customHooks/useHookGetUserInfo";
import { useMutation } from "@apollo/client";
import {
  GQL_USER_GET_CURRENT,
  GQL_USER_UPDATE_CURRENT,
} from "@/graphql/userGql";
import { getErrorMessage } from "@/graphql";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "motion/react";
import { ProductEntity, ProductStatusEnum } from "@/graphql/productGql";
import {
  GQL_ADD_ITEM_TO_WISHLIST_BY_USER,
  GQL_REMOVE_WISHLIST_ITEM_BY_USER,
  WishListEntity,
} from "@/graphql/wishListGql";

const styleRowContainer = "flex gap-x-2 items-center flex-wrap my-[0.1rem]";
const styleRowTitle = "font-arsenal-spaced-1 text-aqua-forest-800 font-bold";
const styleRowContentWithoutLink = "font-lato font-light";

interface Props {
  product: ProductEntity;
}

export default function MainInfo({ product }: Props) {
  /**
   * State
   */
  const [requiredQuantity, setRequiredQuantity] = useState(1);
  const [flyingAnimation, setFlyingAnimation] = useState(false);

  /**
   * Hook
   */
  const userInfo = useHookGetUserInfo();

  /**
   * Routing
   */
  const navigate = useNavigate();

  /**
   * GQL
   */
  const [updateUser] = useMutation(GQL_USER_UPDATE_CURRENT, {
    onError: (err) => {
      const errorMessage = getErrorMessage(err);
      toast.error(errorMessage);
    },
    onCompleted: () => {
      //
    },
  });
  const [addItemToWishList] = useMutation(GQL_ADD_ITEM_TO_WISHLIST_BY_USER, {
    onError: (err) => {
      const errorMessage = getErrorMessage(err);
      toast.error(errorMessage);
    },
    update: (cache, result, third) => {
      const newWishListItem = result.data
        .addItemToWishListByUser as WishListEntity;

      cache.updateQuery(
        { query: GQL_USER_GET_CURRENT },
        ({ getCurrentUser }) => {
          return {
            getCurrentUser: {
              ...getCurrentUser,
              wishList: getCurrentUser.wishList.concat(newWishListItem),
            },
          };
        }
      );
    },
  });
  const [removeItemFromWishList] = useMutation(
    GQL_REMOVE_WISHLIST_ITEM_BY_USER,
    {
      onError: (err) => {
        const errorMessage = getErrorMessage(err);
        toast.error(errorMessage);
      },
      update: (cache, result, { variables }) => {
        const { id } = variables as { id: string };
        cache.evict({ id: cache.identify({ __typename: "WishList", id }) });
        cache.gc();
      },
    }
  );

  /**
   * Computed
   */
  // check if product is in wishlist
  const inWishList = userInfo?.wishList?.some(
    (item) => item.productId === product.id
  );

  function handleClickWishlistIcon(productId: string) {
    if (userInfo) {
      if (inWishList) {
        // remove
        const itemId = userInfo?.wishList?.find(
          (item) => item.productId === product.id
        )!.id;
        void removeItemFromWishList({
          variables: {
            id: itemId,
          },
        });
      } else {
        //  add
        void addItemToWishList({
          variables: {
            productId,
          },
        });
      }
    } else {
      // use is not logged in
      void navigate("/login");
    }
  }

  function handleClickAddToCart() {
    if (userInfo) {
      const currentCart = userInfo.cart ?? [];
      let newCart;
      const matchedItemInCart = currentCart.find(
        (a) => a.productId === product.id
      ); // check if item is already in cart
      if (matchedItemInCart) {
        const { quantity } = matchedItemInCart;
        const maxAllowedQuantity = product.stock;
        newCart = currentCart
          .filter((a) => a.productId !== product.id)
          .concat({
            productId: product.id,
            quantity: Math.min(quantity + requiredQuantity, maxAllowedQuantity),
          });
      } else {
        newCart = currentCart.concat({
          productId: product.id,
          quantity: requiredQuantity,
        });
      }
      void updateUser({
        variables: {
          input: { cart: newCart },
        },
      });
      setFlyingAnimation(true);
      setTimeout(() => setFlyingAnimation(false), 600);
    } else {
      // use is not logged in
      void navigate("/login");
    }
  }

  return (
    <div className="justify-self-center flex flex-col w-full">
      {/* <div className="flex flex-col max-w-[32rem] xl:max-w-[40rem] justify-self-center"> */}

      {/* Title */}
      <div className="text-2xl md:text-[2rem] font-arsenal-spaced-1 text-aqua-forest-800 font-bold flex gap-x-8">
        {product.name}

        {product.userId !== userInfo?.id && (
          <button
            data-tooltip-id={`tooltip-wishlist`}
            onClick={() => handleClickWishlistIcon(product.id)}
            disabled={!product}
          >
            {inWishList ? iconLoveFilled() : iconLoveEmpty()}
          </button>
        )}
      </div>

      {/* Artist */}
      <div className="font-lato text-aqua-forest-500">{product.artist}</div>

      {/* Price */}
      {product.status === ProductStatusEnum.Removed ? (
        <div className="bg-rose-50 text-rose-900 my-10 flex w-max p-2">
          This product is no longer available!
        </div>
      ) : (
        <>
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
                  $
                  {calculateDiscountedPriceAndReturnString(
                    product.price,
                    product.discount
                  )}
                </span>
              </>
            )}
          </div>

          {/* Quantity Select + Add to Cart */}

          {product.userId === userInfo?.id ? (
            <div className="bg-rose-50 text-rose-900 my-10 flex w-max p-2">
              This is your own product.
            </div>
          ) : (
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
              <div className="relative">
                <button
                  className="bg-aqua-forest-100 h-10 px-2 not-disabled:hover:bg-aqua-forest-300 transition disabled:bg-slate-200 shadow-md"
                  disabled={
                    !product || product.stock === 0 || requiredQuantity === 0
                  }
                  onClick={handleClickAddToCart}
                >
                  Add to cart
                </button>

                <div className="absolute">
                  <AnimatePresence>
                    {flyingAnimation && (
                      <motion.div
                        className="text-[2rem] text-sky-100 bg-sky-600 p-1 rounded-full absolute"
                        initial={{ opacity: 1, left: 40, top: -40 }}
                        animate={{
                          left: [40, 100, 160, 210, 250, 300, 340, 370], // to the right
                          top: [-40, -80, -130, -180, -220, -260, -310, -350], // upwards
                          opacity: [1, 0.7, 0.5, 0], // Gradual fade-out
                          transition: {
                            duration: 0.6,
                            ease: "linear",
                          },
                        }}
                        exit={{ opacity: 0 }}
                      >
                        {iconShoppingCart()}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Seller */}
      <div className={"flex gap-x-2 flex-wrap my-[0.1rem]"}>
        <span className={styleRowTitle}>Shop:</span>

        {product.user && (
          <div className="flex flex-col gap-y-1">
            <div className="flex gap-x-2 items-center">
              <Link
                className={`font-lato font-light ${styleRowContentWithLink}`}
                to={`/shop/${product.user.id}`}
              >
                {product.user.shopName}
              </Link>
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

              <span className="font-lato font-light text-aqua-forest-700">
                {product.user.rating}
              </span>

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

      <CustomTooltip
        id={`tooltip-wishlist`}
        content={inWishList ? "remove from wish list" : "add to wish list"}
      />
      <CustomTooltip id={`tooltip-chat`} content={"chat with the seller"} />
    </div>
  );
}
