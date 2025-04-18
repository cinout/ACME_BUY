import { useEffect, useState } from "react";
import Pagination from "@/views/shared_components/Pagination";
import Head from "./Head";
import OrderTable from "./OrderTable";
import {
  GQL_GET_ORDER_AND_PRODUCT_DETAILS_BY_SELLER_ID,
  OrderEntity,
  OrderStatusEnum,
} from "@/graphql/orderGql";
import { useQuery } from "@apollo/client";
import useHookPageSwitch from "@/customHooks/useHookPageSwitch";

export default function SectionIncomingOrders() {
  /**
   * State
   */
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

  // filter
  const [orderStatusFilter, setOrderStatusFilter] = useState<
    OrderStatusEnum | "All"
  >("All");

  /**
   * GQL
   */
  const gqlGetOrderAndProductDetailsBySellerId = useQuery(
    GQL_GET_ORDER_AND_PRODUCT_DETAILS_BY_SELLER_ID
  );
  const orders = gqlGetOrderAndProductDetailsBySellerId.data
    ?.getOrderAndProductDetailsBySellerId as OrderEntity[];

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

  const numPaidOrders = orders?.filter(
    (a) => a.status === OrderStatusEnum.Paid
  ).length;

  useEffect(() => {
    if (orders && orders.length > 0) {
      setDetailShown(orders.map((order) => order.id));
    }
  }, [orders]);

  // TODO:[3] provide filter/sort function, e.g., sort by time/price, fitler by order/payment status

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
        numPaidOrders={numPaidOrders}
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
