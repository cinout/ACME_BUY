import { useState } from "react";
import Pagination from "@/views/shared_components/Pagination";
import Head from "./Head";
import OrderTable from "./OrderTable";
import {
  GQL_GET_ORDER_AND_PRODUCT_DETAILS_BY_CUSTOMER_ID,
  OrderEntity,
} from "@/graphql/orderGql";
import { useQuery } from "@apollo/client";

const itemsPerPage = 20;

export default function SectionOrders() {
  /**
   * State
   */
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  // const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]!); // show #orders per page
  const [detailShown, setDetailShown] = useState<string[]>([]); // stored the order ids whose detail is revealed
  const start_index = (currentPage - 1) * itemsPerPage;
  const end_index = currentPage * itemsPerPage;

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

  // TODO:[2] provide filter/sort function, e.g., sort by time/price, fitler by order/payment status

  return (
    <>
      <Head searchValue={searchValue} setSearchValue={setSearchValue} />

      <OrderTable
        orderStats={orders?.slice(start_index, end_index)}
        handleClickShowDetails={handleClickShowDetails}
        detailShown={detailShown}
      />

      {/* Pagination */}
      {/* TODO: is there a more efficient way to retrieve and display information according to current page? */}
      <div className="mt-12">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={Math.ceil(orders?.length / itemsPerPage)}
          maxPageOptionsCount={5}
          backgroundTheme={"dark"}
        />
      </div>
    </>
  );
}
