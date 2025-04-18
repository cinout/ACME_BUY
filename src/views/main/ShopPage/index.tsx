import useHookMultipleImageLoading from "@/customHooks/useHookMultipleImageLoading";
import {
  GQL_PRODUCT_GET_BY_USER_ID,
  ProductEntity,
} from "@/graphql/productGql";
import { GQL_GET_USER_BY_ID, UserEntity } from "@/graphql/userGql";
import { iconChat, iconLocation } from "@/utils/icons";
import { calculateDiscountedPriceAndReturnString } from "@/utils/numbers";
import { albumCoverImageLarge, translateAddress } from "@/utils/strings";
import { ratingStyle, styleUnableToFind } from "@/utils/styles";
import CustomTooltip from "@/views/shared_components/CustomTooltip";
import UserStatusIndicator from "@/views/shared_components/UserStatusIndicator";
import { useQuery } from "@apollo/client";
import { Rating } from "@smastrom/react-rating";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

const styleContentPadding = "px-2 sm:px-4 lg:px-8";
const cssPlaceholderContainer = "w-full aspect-square bg-aqua-forest-50";

// TODO:[2] add pagination if you want
// TODO:[2] allow user to rate seller after purchasing product from their shop. Mahy need to have it in the orders page

export default function ShopPage() {
  /**
   * GQL
   */
  const { shopId } = useParams();
  const getUserById = useQuery(GQL_GET_USER_BY_ID, {
    skip: !shopId,
    variables: { id: shopId },
  });
  const seller = getUserById.data?.getUserById as UserEntity;
  const getProductByUserId = useQuery(GQL_PRODUCT_GET_BY_USER_ID, {
    skip: !shopId,
    variables: { id: shopId },
  });
  const products = getProductByUserId.data
    ?.getProductByUserId as ProductEntity[];

  /**
   * Hooks
   */
  const imageIds = useMemo(() => {
    return products?.map((a) => a.id) || [];
  }, [products]);
  const { getImageRefMap, imageGridOnLoad } =
    useHookMultipleImageLoading(imageIds);

  /**
   * Calculated
   */
  const userAddress = translateAddress(
    seller?.city,
    seller?.state,
    seller?.country
  );

  return seller && products ? (
    <div className="flex flex-col gap-y-8">
      {/* Header */}
      <div className="flex flex-wrap justify-center items-start gap-4">
        {/* Image */}
        <div className="h-36 w-36 rounded-md">
          <img
            src={seller?.imageUrl}
            alt={seller?.shopName}
            className="h-36 w-36 rounded-md"
          />
        </div>

        {/* Infos */}
        <div className="flex flex-col font-lato text-aqua-forest-800">
          {/* Shop Name */}
          <div className="font-bold ">{seller?.shopName}</div>

          {/* Owner Status */}
          <div className="flex flex-wrap items-center">
            <span className="mr-2">Owner: </span>
            <span className="font-light">
              {seller?.firstname + " " + seller?.lastname}{" "}
            </span>
            <UserStatusIndicator
              status={seller?.status}
              additionalStyle="mx-2"
            />
            <span className="font-light">({seller?.status})</span>
          </div>

          {/* Rating */}
          <div className="flex gap-x-2 items-center">
            <Rating
              style={{ width: 100 }}
              value={seller?.rating}
              readOnly
              itemStyles={ratingStyle}
            />

            <span className="font-lato font-light text-aqua-forest-700">
              {seller?.rating}
            </span>

            {/* TODO:[3] implement CHAT */}
            <button
              className="text-lg text-aqua-forest-700 hover:scale-110 transition"
              data-tooltip-id={`tooltip-chat`}
            >
              {iconChat()}
            </button>
          </div>

          {/* Contact */}
          {/* <div className="text-sm font-light mt-4">
            {iconEmail("inline mr-2")}
            {seller?.email}
          </div> */}
          <div className="text-sm font-light mt-5">
            {iconLocation("inline mr-1")} {userAddress}
          </div>
        </div>
      </div>

      {/* Products */}

      {products &&
        (products.length === 0 ? (
          <div className={styleUnableToFind}>
            This seller currently has no product for sale.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 text-center">
            {products?.map((product) => (
              <div
                key={product.id}
                className={`w-full py-3 flex flex-col items-center ${styleContentPadding}`}
              >
                {imageGridOnLoad.get(product.id) ? (
                  <div className={cssPlaceholderContainer} />
                ) : (
                  <Link
                    to={`/product/${product.id}`}
                    className="w-full max-w-96 aspect-square"
                  >
                    <img
                      src={albumCoverImageLarge(product.images[0]?.file)}
                      alt={product.name}
                      className={`w-full max-w-96 aspect-square object-contain hover:scale-[102%] transition duration-300`}
                      ref={(node) => {
                        const map = getImageRefMap();
                        map.set(product.id, node);
                        return () => {
                          // called when removing
                          map.delete(product.id);
                        };
                      }}
                    />
                  </Link>
                )}

                <Link
                  className={`font-arsenal-spaced-1 text-aqua-forest-800 hover:underline`}
                  to={`/product/${product.id}`}
                >
                  {product.name}
                </Link>

                <span className="font-lato text-aqua-forest-500 text-sm">
                  {product.artist}
                </span>
                <span className="text-aqua-forest-700 font-arsenal-spaced-1 text-lg mt-1">
                  $
                  {calculateDiscountedPriceAndReturnString(
                    product.price,
                    product.discount
                  )}
                </span>

                {product.stock === 0 && (
                  <span className="text-rose-700 font-arsenal-spaced-1 text-sm bg-rose-100">
                    Out of stock!
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}

      <CustomTooltip id={`tooltip-chat`} content={"chat with the seller"} />
    </div>
  ) : getUserById.error ? (
    <div className={styleUnableToFind}>Unable to find the shop.</div>
  ) : getProductByUserId.error ? (
    <div className={styleUnableToFind}>
      Error finding products of this shop.
    </div>
  ) : (
    // still loading query
    <div className="min-h-[100vh]" />
  );
}
