import { OrderEntity } from "@/graphql/orderGql";
import {
  calculateDiscountedPriceAndReturnNumber,
  calculateDiscountedPriceAndReturnString,
  calculatePendingOrderTotalPrice,
} from "@/utils/numbers";
import { albumCoverImageSmall } from "@/utils/strings";
import { Link } from "react-router-dom";

interface Props {
  orderDetails: OrderEntity;
  orderId: string | undefined;
  priceChanged: string[];
}

export default function OrderSummary({
  orderDetails,
  orderId,
  priceChanged,
}: Props) {
  const productDetails = orderDetails?.itemDetails;

  /**
   * Calculated
   */
  const totalPrice = calculatePendingOrderTotalPrice(orderDetails);

  const totalQuantity = orderDetails?.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div className="bg-aqua-forest-50 p-4 w-full md:w-[420px] md:h-[calc(100vh-5rem)] overflow-y-auto">
      {orderDetails?.items?.map((item) => {
        const product = productDetails?.find((a) => a.id === item.productId);

        return (
          <div className="mb-4" key={item.productId}>
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
                  <span className="text-sm font-arsenal-spaced-1">
                    {product?.name}
                  </span>
                </Link>

                {/* Artist */}
                <span className="text-xs font-lato text-aqua-forest-500">
                  {product?.artist}
                </span>

                {/* Price */}
                <div className="mt-2 flex gap-x-2 items-center font-lato text-sm">
                  <span className="">
                    $
                    {product &&
                      calculateDiscountedPriceAndReturnString(
                        product?.price,
                        product?.discount
                      )}
                  </span>
                  <span>&times;</span>
                  <span>{item.quantity}</span>
                  <span>=</span>
                  <span>
                    $
                    {product &&
                      (
                        calculateDiscountedPriceAndReturnNumber(
                          product.price,
                          product.discount
                        ) * item.quantity
                      ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            {!product ||
              (item.quantity > product?.stock && (
                <div className="text-sm text-rose-600 font-lato">
                  This product&apos;s stock has been reduced!
                </div>
              ))}
            {priceChanged.includes(item.productId) && (
              <div className="text-sm text-rose-600 font-lato">
                This product&apos;s price has been updated!
              </div>
            )}
          </div>
        );
      })}

      {/* TODO:[1] implement voucher */}
      <div className="mt-8 flex items-center justify-between">
        <input
          className="h-12 w-72 bg-white border-2 border-aqua-forest-600 rounded-md px-2 outline-none placeholder:text-sm"
          placeholder="Discount code or gift card"
        />
        <button className="h-12 px-4 bg-aqua-forest-600 text-white rounded-md">
          Apply
        </button>
      </div>

      <div className="flex justify-between items-center mt-8 font-lato">
        <span>
          <span className="text-lg font-semibold"> Total </span>
          <span className="text-sm">&middot; {totalQuantity} items</span>
        </span>
        <span>
          <span className="text-sm"> AUD </span>
          <span className="text-lg font-semibold">
            ${totalPrice?.toFixed(2)}
          </span>
        </span>
      </div>
    </div>
  );
}
