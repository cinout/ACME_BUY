import { Fragment } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { OrderEntity } from "@/utils/entities";
import { joinUrl } from "@/utils/strings";
import { iconDownWithCircle } from "@/utils/icons";
import { OrderStatusEnum } from "@/utils/enums";

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
  const { pathname } = useLocation();
  return (
    <div className="grid grid-cols-[6fr_2fr_2fr_2fr_1fr_1fr] w-full  text-left mt-8 text-white text-xs sm:text-sm">
      <span className="font-bold">Order ID</span>
      <span className="font-bold">Price</span>
      <span className="font-bold">Payment Status</span>
      <span className="font-bold">Order Status</span>
      <span className="font-bold">Details</span>
      <span className="font-bold">Action</span>

      {orderStats.map((order) => (
        <Fragment key={order.id}>
          <span className="mt-2">{order.id}</span>
          {/* TODO:[3] use real data */}
          <span className="mt-2">{"AU$ 100"}</span>
          {/* TODO:[3] use real data */}
          <span className="mt-2">{"HAHA"}</span>
          {/* TODO:[3] use real data */}
          <span className="mt-2">{OrderStatusEnum.Canceled}</span>
          <span className="mt-2 text-xl">
            <button
              className={`hover:scale-125 transition ${
                detailShown.includes(order.id) &&
                "scale-125 text-aqua-forest-400"
              }`}
              onClick={() => handleClickShowDetails(order.id)}
            >
              {iconDownWithCircle()}
            </button>
          </span>
          <span className="mt-2">
            <Link
              to={joinUrl(pathname, order.id)}
              className="bg-slate-100 text-sky-900 border-2 border-slate-300 rounded-md px-1 hover:bg-sky-200 hover:border-sky-500"
            >
              View
            </Link>
          </span>

          <AnimatePresence>
            {detailShown.includes(order.id) && (
              <motion.div
                className="col-span-6 text-sky-100 bg-white/15 p-4 rounded-md"
                initial={{ translateY: "-0.5rem", opacity: 0 }}
                animate={{
                  translateY: 0,
                  opacity: 1,
                  transition: { duration: 0.6 },
                }}
                exit={{
                  translateY: "-0.5rem",
                  opacity: 0,
                  transition: { duration: 0.6 },
                }}
              >
                {/* TODO:[3] fix here */}

                <div
                  // key={order.id + "_" + product.product_id}
                  className="flex gap-4"
                >
                  {/* <span>{product.product_id}</span> */}
                  <span>
                    <strong> Product:</strong> {"haha"}
                  </span>
                  {/* <span>{product.sellor_id}</span> */}
                  <span>
                    <strong> Sellor:</strong>
                    {"haha"}
                  </span>
                  <span>
                    <strong> Price: AU$</strong>
                    {"haha"}
                  </span>
                </div>
                {/* ))} */}
              </motion.div>
            )}
          </AnimatePresence>
        </Fragment>
      ))}
    </div>
  );
}
