import { useEffect, useState } from "react";
import Pagination from "@/views/shared_components/Pagination";
import Head from "./Head";
import OrderTable from "./OrderTable";
import {
  GQL_GET_ORDER_AND_PRODUCT_DETAILS_BY_CUSTOMER_ID,
  OrderEntity,
  OrderStatusEnum,
} from "@/graphql/orderGql";
import { useQuery } from "@apollo/client";

const itemsPerPageOptions = [10, 20, 30, 40];

export default function SectionOrders() {
  /**
   * State
   */
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]!); // show #orders per page
  const [detailShown, setDetailShown] = useState<string[]>([]); // stored the order ids whose detail is revealed
  const start_index = (currentPage - 1) * itemsPerPage;
  const end_index = currentPage * itemsPerPage;
  // filter
  const [orderStatusFilter, setOrderStatusFilter] = useState<
    OrderStatusEnum | "All"
  >("All");

  /**
   * GQL
   */
  const gqlGetOrderAndProductDetailsByCustomerId = useQuery(
    GQL_GET_ORDER_AND_PRODUCT_DETAILS_BY_CUSTOMER_ID
  );
  const orders = gqlGetOrderAndProductDetailsByCustomerId.data
    ?.getOrderAndProductDetailsByCustomerId as OrderEntity[];

  function handleClickShowDetails(order_id: string) {
    setDetailShown((currentlyShown) => {
      return currentlyShown.includes(order_id)
        ? currentlyShown.filter((a) => a !== order_id)
        : [...currentlyShown, order_id];
    });
  }

  const ordersByFilter = orders
    ?.slice()
    .sort((a, b) => -a.createdAt.localeCompare(b.createdAt))
    ?.filter(
      (a) => orderStatusFilter === "All" || a.status === orderStatusFilter
    );

  const numPendingOrders = orders?.filter(
    (a) => a.status === OrderStatusEnum.Pending
  ).length;

  function handleItemsPerPageChange(value: number) {
    setItemsPerPage(value); // set value
    setCurrentPage(1); // default to page 1
  }

  useEffect(() => {
    if (orders && orders.length > 0) {
      setDetailShown(orders.map((order) => order.id));
    }
  }, [orders]);

  return (
    <>
      <Head
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        orderStatusFilter={orderStatusFilter}
        setOrderStatusFilter={setOrderStatusFilter}
        itemsPerPage={itemsPerPage}
        handleItemsPerPageChange={handleItemsPerPageChange}
        itemsPerPageOptions={itemsPerPageOptions}
        numPendingOrders={numPendingOrders}
      />

      <OrderTable
        orderStats={ordersByFilter?.slice(start_index, end_index)}
        handleClickShowDetails={handleClickShowDetails}
        detailShown={detailShown}
      />

      {/* Pagination */}
      {/* TODO:[3] is there a more efficient way to retrieve and display information according to current page? */}
      <div className="mt-12">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={Math.ceil(ordersByFilter?.length / itemsPerPage)}
          maxPageOptionsCount={5}
          backgroundTheme={"dark"}
        />
      </div>
    </>
  );
}
