import { Fragment, useState } from "react";
import { Input } from "@headlessui/react";
import { Select } from "@headlessui/react";
import { faker } from "@faker-js/faker";
import { Link } from "react-router-dom";
import { MdOutlineExpandCircleDown } from "react-icons/md";
import { OrderStatus, PaymentStatus } from "@/utils/enums";
import { motion, AnimatePresence } from "motion/react";

// TODO: can also add images and thigns later
interface OrderDetailsProps {
  product_id: string;
  product_name: string;
  sellor_id: string;
  sellor_name: string;
  price: string;
}

interface OrderStatsProps {
  id: string;
  price: string;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  details: OrderDetailsProps[];
}

// TODO: fetch from backend
const orderStats: OrderStatsProps[] = Array.from({ length: 6 }).map((a) => ({
  id: faker.string.uuid(),
  price: faker.commerce.price(),
  payment_status: PaymentStatus.Pending,
  order_status: OrderStatus.Pending,
  details: Array.from({ length: 3 }).map(
    (b) =>
      ({
        product_id: faker.string.uuid(),
        product_name: faker.commerce.product(),
        sellor_id: faker.string.uuid(),
        sellor_name: faker.company.name(),
        price: faker.commerce.price(),
      } as OrderDetailsProps)
  ),
}));

export default function Orders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5); // show #orders per page
  const [detailShown, setDetailShown] = useState<string[]>([]); // stored the order ids whose detail is revealed

  // TODO: implement search function
  // TODO: implement setRowsPerPage function

  function handleClickShowDetails(order_id: string) {
    setDetailShown((currentlyShown) => {
      return currentlyShown.includes(order_id)
        ? currentlyShown.filter((a) => a !== order_id)
        : [...currentlyShown, order_id];
    });
  }

  return (
    <>
      {/* Search Bar & perPage selector */}
      <div className="flex justify-between items-center ">
        <Input
          placeholder="search orders ..."
          name="search"
          type="text"
          className={
            "py-2 bg-transparent border-b-[1px] border-sky-200 px-2 text-sky-100 w-36 sm:w-64 ml-4 outline-none"
          }
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className="text-white font-light">
          <span>show</span>
          <Select
            name="rowsPerPage"
            className="mx-2 bg-transparent border-b-[1px] cursor-pointer"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(parseInt(e.target.value));
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </Select>
          <span>orders per page</span>
        </div>
      </div>

      {/* Table */}
      <div className="grid grid-cols-[6fr_2fr_2fr_2fr_1fr_1fr] w-full text-sm text-left mt-5 text-white">
        <span className="font-bold">Order ID</span>
        <span className="font-bold">Price</span>
        <span className="font-bold">Payment Status</span>
        <span className="font-bold">Order Status</span>
        <span className="font-bold">Details</span>
        <span className="font-bold">Action</span>

        {orderStats.map((order) => (
          <Fragment key={order.id}>
            <span className="mt-2">{order.id}</span>
            <span className="mt-2">{"AU$ " + order.price}</span>
            <span className="mt-2">{order.payment_status}</span>
            <span className="mt-2">{order.order_status}</span>
            <span className="mt-2 text-xl">
              <button
                className={`hover:scale-125 transition ${
                  detailShown.includes(order.id) && "scale-125 text-lime-400"
                }`}
                onClick={() => handleClickShowDetails(order.id)}
              >
                <MdOutlineExpandCircleDown />
              </button>
            </span>
            <span className="mt-2">
              <Link
                to=""
                className="bg-slate-100 text-sky-900 border-2 border-slate-300 rounded-md px-1"
              >
                View
              </Link>
            </span>
            {/* TODO: need to implement view */}

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
                  {order.details.map((product) => (
                    <div
                      key={order.id + "_" + product.product_id}
                      className="flex gap-4"
                    >
                      {/* <span>{product.product_id}</span> */}
                      <span>
                        <strong> Product:</strong> {product.product_name}
                      </span>
                      {/* <span>{product.sellor_id}</span> */}
                      <span>
                        <strong> Sellor:</strong>
                        {product.sellor_name}
                      </span>
                      <span>
                        <strong> Price: AU$</strong>
                        {product.price}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </Fragment>
        ))}
      </div>
    </>
  );
}
