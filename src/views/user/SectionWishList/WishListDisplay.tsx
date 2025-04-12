import { ProductEntity, ProductStatusEnum } from "@/graphql/productGql";
import { UserEntity } from "@/graphql/userGql";
import { WishListEntity } from "@/graphql/wishListGql";
import { iconTrashCan, iconView } from "@/utils/icons";
import { calculateDiscountedPriceAndReturnString } from "@/utils/numbers";
import { albumCoverImageSmall } from "@/utils/strings";
import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

const styleWarning =
  "text-rose-900 font-arsenal-spaced-1 text-sm bg-red-50 w-full text-center rounded-sm";

function Details({
  label,
  content,
}: {
  label: string;
  content: string | number | undefined;
}) {
  return (
    <div className="flex gap-x-2 text-sm">
      <span className="font-semibold">{label}:</span>
      <span className="font-light">{content}</span>
    </div>
  );
}

interface Props {
  userInfo: UserEntity | null;
  wishList: WishListEntity[] | undefined;
  setToDeleteItemId: Dispatch<SetStateAction<string>>;
  wishListDetails: (ProductEntity & {
    user: UserEntity;
  })[]; // product details of wish list items
}

export default function WishListDisplay({
  userInfo,
  wishList,
  setToDeleteItemId,
  wishListDetails,
}: Props) {
  return (
    <div className="text-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-x-4 mt-8">
      {wishList?.map((wishListItem) => {
        const wishListItemId = wishListItem.id;
        const product = wishListDetails?.find(
          (a) => a.id === wishListItem.productId
        );

        return (
          <div
            className="mb-6 flex flex-col justify-between gap-y-2 w-80 bg-white/20 rounded-lg p-2"
            key={wishListItemId}
          >
            {/* Product Infos */}
            <div className="flex">
              <Link
                to={`/product/${product?.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-20 h-20"
              >
                <img
                  src={albumCoverImageSmall(product?.images?.[0]?.file)}
                  alt={product?.name}
                  className="w-20 h-20 object-contain"
                />
              </Link>

              <div className="flex-1 flex flex-col ml-2">
                {/* Name */}
                <Link
                  to={`/product/${product?.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  <span className="font-arsenal-spaced-1">{product?.name}</span>
                </Link>

                {/* Artist */}
                <span className="text-sm font-lato text-aqua-forest-300">
                  {product?.artist}
                </span>

                {/* Price */}
                <div className="mt-2 flex gap-x-2 items-center font-lato">
                  <span className="">
                    $
                    {product &&
                      calculateDiscountedPriceAndReturnString(
                        product?.price,
                        product?.discount
                      )}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <Details label="Format" content={product?.format} />
              <Details label="Year" content={product?.year} />
              <Details label="Grading" content={product?.grading} />
              <Details label="Region" content={product?.region} />
            </div>

            {/* Out of Stock */}
            {product?.status === ProductStatusEnum.Removed ? (
              <div className={styleWarning}>Unavailable!</div>
            ) : (
              product?.stock === 0 && (
                <div className={styleWarning}>Out of stock!</div>
              )
            )}

            {/* Actions */}
            <div className="flex justify-center gap-x-4">
              <Link
                to={`/product/${product?.id}`}
                className="text-aqua-forest-600 hover:scale-105 w-24 transition flex justify-center items-center gap-x-2 bg-white/60 rounded-md"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span> {iconView()}</span>
                <span> View </span>
              </Link>
              <button
                onClick={() => {
                  if (userInfo && product && wishListItemId) {
                    setToDeleteItemId(wishListItemId);
                  }
                }}
                className="text-rose-600 hover:scale-105 w-24 transition flex justify-center items-center gap-x-2 bg-white/60 rounded-md"
              >
                <span> {iconTrashCan()}</span>
                <span> Remove </span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
