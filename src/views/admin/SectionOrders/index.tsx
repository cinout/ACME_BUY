import { useState } from "react";
import { faker } from "@faker-js/faker";
import Pagination from "@/views/shared_components/Pagination";
import Head from "./Head";
import OrderTable from "./OrderTable";
import { useParams } from "react-router-dom";
import OrderDetails from "./OrderDetails";
import { OrderEntity, OrderStatusEnum } from "@/graphql/orderGql";
import useHookPageSwitch from "@/customHooks/useHookPageSwitch";

// TODO:[3] fetch from backend
const orderStats: OrderEntity[] = Array.from({ length: 34 }, () => ({
  id: faker.string.uuid(),
  createdAt: faker.date.recent().toDateString(),
  // price: faker.commerce.price(),
  // payment_status: PaymentStatusEnum.Pending,
  status: OrderStatusEnum.Pending,
  items: [],
  userId: "2222",
  // details: Array.from({ length: 3 }, () => ({
  //   id: faker.string.uuid(),
  //   createdAt: faker.date.recent(),
  //   product_id: faker.string.uuid(),
  //   product_name: faker.commerce.product(),
  //   sellor_id: faker.string.uuid(),
  //   sellor_name: faker.company.name(),
  //   price: faker.commerce.price(),
  // })),
}));

export default function SectionOrders() {
  const [searchValue, setSearchValue] = useState("");
  const [detailShown, setDetailShown] = useState<string[]>([]); // stored the order ids whose detail is revealed

  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    handleItemsPerPageChange,
    start_index,
    end_index,
    itemsPerPageOptions,
  } = useHookPageSwitch();

  const { orderId } = useParams();
  const currentOrder = orderStats.find((a) => a.id === orderId);

  function handleClickShowDetails(order_id: string) {
    setDetailShown((currentlyShown) => {
      return currentlyShown.includes(order_id)
        ? currentlyShown.filter((a) => a !== order_id)
        : [...currentlyShown, order_id];
    });
  }

  // TODO:[3] provide filter/sort function, e.g., sort by time/price, fitler by order/payment status

  return (
    <>
      <Head
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        itemsPerPage={itemsPerPage}
        handleItemsPerPageChange={handleItemsPerPageChange}
        itemsPerPageOptions={itemsPerPageOptions}
      />

      <OrderTable
        orderStats={orderStats.slice(start_index, end_index)}
        handleClickShowDetails={handleClickShowDetails}
        detailShown={detailShown}
      />

      {currentOrder && <OrderDetails order={currentOrder} />}

      {/* Pagination */}
      {/* TODO:[1] is there a more efficient way to retrieve and display information according to current page? */}
      <div className="mt-12">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={Math.ceil(orderStats.length / itemsPerPage)}
          maxPageOptionsCount={5}
          backgroundTheme={"dark"}
        />
      </div>
    </>
  );
}
