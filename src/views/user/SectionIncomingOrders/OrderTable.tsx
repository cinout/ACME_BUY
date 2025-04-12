import { Fragment, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { iconDownWithCircle, iconUpWithCircle } from "@/utils/icons";
import {
  GQL_DELETE_ORDER,
  OrderEntity,
  OrderStatusEnum,
} from "@/graphql/orderGql";
import {
  calculateDiscountedPriceAndReturnNumber,
  calculateDiscountedPriceAndReturnString,
  calculateNonPendingOrderTotalPrice,
} from "@/utils/numbers";
import {
  albumCoverImageSmall,
  convertDateString,
  shortenMiddle,
  translateAddress,
} from "@/utils/strings";
import { Link } from "react-router-dom";
import DeleteConfirmDialog from "@/views/shared_components/DeleteConfirmDialog";

interface OrderTableProps {
  orderStats: OrderEntity[];
  detailShown: string[];
  handleClickShowDetails: (order_id: string) => void;
}

export default function OrderTable({
  handleClickShowDetails,
  orderStats,
  detailShown,
}: OrderTableProps) {
  /** State */
  const [toDeleteItemId, setToDeleteItemId] = useState<string>("");
  const toDeleteOrder = orderStats?.find((a) => a.id === toDeleteItemId);

  /**
   * GQL
   */

  return (
    <>
      <div className="grid  grid-cols-[3fr_1fr_2fr_1fr]  sm:grid-cols-[2fr_1fr_1fr_1fr_1fr] w-full text-left mt-8 text-white text-sm">
        <span className="font-bold">Order ID</span>
        <span className="font-bold">Status</span>
        <span className="font-bold hidden sm:inline">Total Price</span>
        <span className="font-bold justify-self-end sm:justify-self-start">
          Created
        </span>
        <span className="font-bold justify-self-end sm:justify-self-start">
          View
        </span>

        {orderStats?.map((order) => {
          const isDetailOpen = detailShown.includes(order.id);
          const totalPrice = calculateNonPendingOrderTotalPrice(order);
          return (
            <Fragment key={order.id}>
              <span className="hidden tn:inline mt-2">{order.id}</span>
              <span className="tn:hidden mt-2">
                {shortenMiddle(order.id, 13)}
              </span>

              <span
                className={`mt-2 italic ${
                  order.status === OrderStatusEnum.Paid &&
                  "font-bold text-aqua-forest-300"
                }`}
              >
                {order.status}
              </span>

              <span className="hidden sm:inline mt-2">{`$${totalPrice.toFixed(
                2
              )}`}</span>

              <span className="mt-2 justify-self-end sm:justify-self-start">
                {convertDateString(order.createdAt)}{" "}
              </span>

              <button
                className={`hover:scale-110 transition text-xl mt-2 justify-self-end sm:justify-self-start ${
                  isDetailOpen && "text-sky-300"
                }`}
                onClick={() => handleClickShowDetails(order.id)}
              >
                {isDetailOpen ? iconUpWithCircle() : iconDownWithCircle()}
              </button>

              {/* Details of the ORDER */}
              <AnimatePresence>
                {isDetailOpen && (
                  <motion.div
                    className="col-span-4 sm:col-span-5 text-sky-100 bg-white/15 p-2 md:p-4 rounded-md mt-2"
                    initial={{ translateY: "-0.5rem", opacity: 0 }}
                    animate={{
                      translateY: 0,
                      opacity: 1,
                      transition: { duration: 0.3 },
                    }}
                    exit={{
                      translateY: "-0.5rem",
                      opacity: 0,
                      transition: { duration: 0.3 },
                    }}
                  >
                    {/* Summarize */}
                    <div className="flex flex-wrap gap-x-3 mb-4">
                      <div className="flex gap-x-1">
                        <span className="font-bold">Order ID:</span>
                        <span className="font-light">{order.id}</span>
                      </div>

                      <div className="flex gap-x-1">
                        <span className="font-bold">Created:</span>
                        <span className="font-light">
                          {convertDateString(order.createdAt)}
                        </span>
                      </div>

                      <div className="flex gap-x-1">
                        <span className="font-bold">Status:</span>
                        <span className="font-light">{order.status}</span>
                      </div>

                      <div className="flex gap-x-1">
                        <span className="font-bold">Total Price: </span>
                        <span className="font-light">
                          ${totalPrice?.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Products in the order */}
                    <div className="flex flex-wrap gap-4">
                      {order?.items?.map((item) => {
                        const product = order?.itemDetails?.find(
                          (a) => a.id === item.productId
                        );

                        return (
                          <div className="" key={item.productId}>
                            <div className="flex">
                              <Link
                                to={`/product/${product?.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block w-20 h-20"
                              >
                                <img
                                  src={albumCoverImageSmall(
                                    product?.images?.[0]?.file
                                  )}
                                  alt={product?.name}
                                  className="w-20 h-20 object-contain"
                                />
                              </Link>
                              <div className="flex-1 flex flex-col ml-2 max-w-52">
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
                                <span className="text-xs text-sky-100">
                                  {product?.artist}
                                </span>

                                {/* Price */}
                                <div className="mt-2 flex gap-x-2 items-center  text-sm">
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
                    </div>

                    {/* Paid orders - Actions */}
                    {order.status === OrderStatusEnum.Paid && (
                      // TODO:[1] provide appropriate action for the order
                      <div className="flex gap-x-4 mt-4">
                        <button
                          className="bg-rose-600 rounded-md p-1 border-2 border-rose-400 hover:brightness-110 transition"
                          onClick={() => setToDeleteItemId(order.id)}
                        >
                          Cancel Order
                        </button>
                        <Link
                          to={`/order/${order.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-aqua-forest-600 rounded-md p-1 border-2 border-aqua-forest-400 hover:brightness-110 transition"
                        >
                          Ship Products
                        </Link>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-x-3 mt-4">
                      {/* Address */}
                      <div className="gap-x-1">
                        <span className="font-bold">Shipping Address: </span>
                        <span className="font-light">
                          {order.shippingAddress},&nbsp;
                          {translateAddress(
                            order.shippingCity,
                            order.shippingState,
                            order.shippingCountry
                          )}
                          &nbsp;
                          {order.shippingPostCode}
                        </span>
                      </div>

                      {/* Contact */}
                      <div className="gap-x-1">
                        <span className="font-bold">Customer Name: </span>
                        <span className="font-light">
                          {order.contactFirstname}&nbsp;
                          {order.contactLastname}
                        </span>
                      </div>

                      <div className="gap-x-1">
                        <span className="font-bold">Phone: </span>
                        <span className="font-light">{order.contactPhone}</span>
                      </div>

                      <div className="gap-x-1">
                        <span className="font-bold">Email: </span>
                        <span className="font-light">{order.contactEmail}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Fragment>
          );
        })}
      </div>

      {toDeleteOrder && (
        <DeleteConfirmDialog
          isOpen={!!toDeleteItemId}
          id={toDeleteOrder.id}
          name={toDeleteOrder.id}
          deletionQuery={GQL_DELETE_ORDER}
          setToDeleteItemId={setToDeleteItemId}
          gqlType="Order"
        />
      )}
    </>
  );
}
