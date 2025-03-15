import { useState } from "react";
import Head from "./Head";
import { Navigate, useParams } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import ProductTable from "./ProductTable";
import Pagination from "@/views/shared_components/Pagination";
import { useQuery } from "@apollo/client";
import {
  GQL_PRODUCT_DELETE,
  GQL_PRODUCT_GET_ALL_BY_USER,
  ProductEntity,
} from "@/graphql/productGql";
import LoadingIndicatorWithDiv from "@/views/shared_components/LoadingIndicatorWithDiv";
import DeleteConfirmDialog from "@/views/shared_components/DeleteConfirmDialog";

const itemsPerPageOptions = [20, 40];

// TODO: provide filtering by discounted status
export default function SectionProducts() {
  // Page
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]!); // show #orders per page
  const start_index = (currentPage - 1) * itemsPerPage;
  const end_index = currentPage * itemsPerPage;
  // Search Value
  const [searchValue, setSearchValue] = useState("");
  // delete ID
  const [toDeleteItemId, setToDeleteItemId] = useState<string>("");

  // Route
  const { productId } = useParams();

  // GQL
  const gql_query_result = useQuery(GQL_PRODUCT_GET_ALL_BY_USER);

  if (gql_query_result.loading) {
    return <LoadingIndicatorWithDiv />;
  }
  const allProductsByUser = gql_query_result.data
    .getAllProductsByUser as ProductEntity[];
  const toDeleteProduct = allProductsByUser.find((a) => a.id == toDeleteItemId);

  // Functions
  function handleItemsPerPageChange(value: number) {
    setItemsPerPage(value); // set value
    setCurrentPage(1); // default to page 1
  }

  return (
    <>
      {productId ? (
        productId === "new" ||
        allProductsByUser.some((a) => a.id === productId) ? (
          <ProductDetail
            productId={productId}
            productStats={allProductsByUser}
          />
        ) : (
          <Navigate to="/user/products" replace />
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
            productStats={allProductsByUser.slice(start_index, end_index)}
            setToDeleteItemId={setToDeleteItemId}
          />
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={Math.ceil(allProductsByUser.length / itemsPerPage)}
              maxPageOptionsCount={5}
              backgroundTheme={"dark"}
            />
          </div>

          {toDeleteItemId && toDeleteProduct && (
            <DeleteConfirmDialog
              isOpen={!!toDeleteItemId}
              id={toDeleteProduct.id}
              name={toDeleteProduct.name}
              deletionQuery={GQL_PRODUCT_DELETE}
              setToDeleteItemId={setToDeleteItemId}
              gqlType="Product"
            />
          )}
        </>
      )}
    </>
  );
}
