import { useState } from "react";
import Head from "./Head";
import { Navigate, useParams } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import ProductTable from "./ProductTable";
import { ProductEntity } from "@/utils/entities";
import Pagination from "@/views/shared_components/Pagination";
import { useQuery } from "@apollo/client";
import { GQL_PRODUCT_GET_ALL_BY_SELLER } from "@/graphql/productGql";
import { useAppSelector } from "@/redux/hooks";
import LoadingIndicatorWithDiv from "@/views/shared_components/LoadingIndicatorWithDiv";

const itemsPerPageOptions = [10, 20, 30, 40];

// TODO: provide filtering by discounted status
export default function SectionProducts() {
  // Page
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]!); // show #orders per page
  const start_index = (currentPage - 1) * itemsPerPage;
  const end_index = currentPage * itemsPerPage;

  // Search Value
  const [searchValue, setSearchValue] = useState("");

  // Route
  const { productId } = useParams();

  // Redux
  const { userInfo } = useAppSelector((state) => state.auth);

  // GQL
  // TODO: should I query only when userInfo is not null?
  const gql_query_result = useQuery(GQL_PRODUCT_GET_ALL_BY_SELLER, {
    variables: { sellerId: userInfo?.id },
  });

  if (gql_query_result.loading) {
    return <LoadingIndicatorWithDiv />;
  }

  const allProductsBySeller = gql_query_result.data
    .getAllProductsBySeller as ProductEntity[];

  // Functions
  function handleItemsPerPageChange(value: number) {
    setItemsPerPage(value); // set value
    setCurrentPage(1); // default to page 1
  }

  return (
    <>
      {productId ? (
        productId === "new" ||
        allProductsBySeller.some((a) => a.id === productId) ? (
          <ProductDetail
            productId={productId}
            productStats={allProductsBySeller}
          />
        ) : (
          <Navigate to="/seller/products" replace />
        )
      ) : (
        <>
          <Head
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            itemsPerPage={itemsPerPage}
            handleItemsPerPageChange={handleItemsPerPageChange}
            itemsPerPageOptions={itemsPerPageOptions}
          />
          <ProductTable
            productStats={allProductsBySeller.slice(start_index, end_index)}
          />
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={Math.ceil(allProductsBySeller.length / itemsPerPage)}
              maxPageOptionsCount={5}
            />
          </div>
        </>
      )}
    </>
  );
}
