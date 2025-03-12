import { useHookGetUserInfo } from "@/customHooks/useHookGetUserInfo";
import {
  GQL_GET_ORDER_AND_PRODUCT_DETAILS_BY_ORDER_ID,
  OrderEntity,
  OrderStatusEnum,
} from "@/graphql/orderGql";
import { useAppSelector } from "@/redux/hooks";
import LoadingPage from "@/views/LoadingPage";
import { useQuery } from "@apollo/client";
import { Link, Navigate, useParams } from "react-router-dom";
import orderSuccessImage from "@/assets/images/orderSuccess.svg";
import { albumCoverImageSmall } from "@/utils/strings";
import {
  calculateDiscountedPriceAndReturnNumber,
  calculateDiscountedPriceAndReturnString,
} from "@/utils/numbers";
import {
  iconGoLeftWithoutCircle,
  iconGoRightWithoutCircle,
} from "@/utils/icons";

interface Props {
  orderId: string;
  orderDetails: OrderEntity;
}

export function Content({ orderId, orderDetails }: Props) {
  const productDetails = orderDetails?.itemDetails;

  /**
   * Calculated
   */
  const totalPrice = orderDetails?.items.reduce((acc, item) => {
    const { quantity, priceSnapshot, discountSnapshot } = item;

    return (
      acc +
      calculateDiscountedPriceAndReturnNumber(
        priceSnapshot!,
        discountSnapshot!
      ) *
        quantity
    );
  }, 0);
  const totalQuantity = orderDetails?.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div className="flex flex-col items-center my-10 sm:my-20">
      <img src={orderSuccessImage} alt="Order Success" className="h-28 w-28" />
      <div className="font-arsenal-spaced-1 text-2xl font-bold text-aqua-forest-800 px-4">
        Thank you for your purchase
      </div>
      <div className="font-arsenal-spaced-1  text-aqua-forest-600 px-4">
        The sellers have recieved your order, and will ship the products soon.
      </div>

      <div className="flex my-10 gap-x-12 gap-y-6 px-4">
        <Link to="/" className="border-b border-sky-700 text-sky-950 group">
          {iconGoLeftWithoutCircle(
            "inline group-hover:-translate-x-2 transition"
          )}{" "}
          Go to home page
        </Link>
        <Link
          to="/user/orders"
          className="border-b border-sky-700 text-sky-950 group"
        >
          View your order history{" "}
          {iconGoRightWithoutCircle(
            "inline group-hover:translate-x-2 transition"
          )}
        </Link>
      </div>

      <div className="bg-aqua-forest-50 p-4 w-full font-lato">
        <div className="text-center mb-10 text-xl font-semibold">
          Your Order Summary
        </div>

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
                      {calculateDiscountedPriceAndReturnString(
                        item.priceSnapshot!,
                        item.discountSnapshot!
                      )}
                    </span>
                    <span>&times;</span>
                    <span>{item.quantity}</span>
                    <span>=</span>
                    <span>
                      $
                      {(
                        calculateDiscountedPriceAndReturnNumber(
                          item.priceSnapshot!,
                          item.discountSnapshot!
                        ) * item.quantity
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

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
    </div>
  );
}

export default function OrderSuccessPage() {
  /**
   * Redux
   */
  const { role, updateUserRoleDoneOnFirstRender } = useAppSelector(
    (state) => state.auth
  );

  /**
   * Hooks
   */
  const userInfo = useHookGetUserInfo();

  /**
   * Routing
   */
  const { orderId } = useParams();

  /**
   * GQL
   */
  const gqlQueryOrder = useQuery(
    GQL_GET_ORDER_AND_PRODUCT_DETAILS_BY_ORDER_ID,
    {
      skip: !orderId || !userInfo,
      variables: { id: orderId },
    }
  );
  const orderDetails = gqlQueryOrder.data
    ?.getOrderAndProductDetailsByOrderId as OrderEntity;

  if (!orderId) {
    <Navigate replace to="/" />;
  } else {
    if (!updateUserRoleDoneOnFirstRender) {
      // If user is not hydrated yet
      return <LoadingPage />;
    } else {
      // user is hydrated
      if (!role) {
        // If user is not logged in
        return <Navigate replace to="/login" />;
      }
      {
        // user is logged in

        if (gqlQueryOrder.error) {
          // query has error (such as the order does not belong to the user)
          return <Navigate to="/unauthorized" replace />;
        } else if (gqlQueryOrder.data) {
          // query is successful

          if (orderDetails.status === OrderStatusEnum.Pending) {
            return <Navigate replace to="/user/orders" />;
          } else {
            return <Content orderId={orderId} orderDetails={orderDetails} />;
          }
        } else {
          // query is not dispatched yet or is loading
          return <LoadingPage />;
        }
      }
    }
  }
}
