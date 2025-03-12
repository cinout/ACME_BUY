import { useState } from "react";
import { faker } from "@faker-js/faker";
import { PaymentStatusEnum } from "@/utils/enums";
import Pagination from "@/views/shared_components/Pagination";
import Head from "./Head";
import OrderTable from "./OrderTable";
import { useParams } from "react-router-dom";
import OrderDetails from "./OrderDetails";
import { OrderEntity, OrderStatusEnum } from "@/graphql/orderGql";

// TODO: can also add images and things later

// TODO: fetch from backend
const orderStats: OrderEntity[] = Array.from({ length: 34 }, () => ({
  id: faker.string.uuid(),
  createdAt: faker.date.recent(),
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

const itemsPerPageOptions: number[] = [5, 10, 15, 20];

export default function SectionOrders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]!); // show #orders per page
  const [detailShown, setDetailShown] = useState<string[]>([]); // stored the order ids whose detail is revealed

  const start_index = (currentPage - 1) * itemsPerPage;
  const end_index = currentPage * itemsPerPage;

  const { orderId } = useParams();
  const currentOrder = orderStats.find((a) => a.id === orderId);

  function handleClickShowDetails(order_id: string) {
    setDetailShown((currentlyShown) => {
      return currentlyShown.includes(order_id)
        ? currentlyShown.filter((a) => a !== order_id)
        : [...currentlyShown, order_id];
    });
  }

  function handleItemsPerPageChange(value: number) {
    setItemsPerPage(value); // set value
    setCurrentPage(1); // default to page 1
    // setDetailShown([]); // hide all shown details
  }

  // TODO: provide filter/sort function, e.g., sort by time/price, fitler by order/payment status

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
      {/* TODO: is there a more efficient way to retrieve and display information according to current page? */}
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
