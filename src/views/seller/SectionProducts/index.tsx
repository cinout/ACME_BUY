import { useState } from "react";
import Head from "./Head";
import { useParams } from "react-router-dom";
import CreateProduct from "./CreateProduct";
import ProductTable from "./ProductTable";

const itemsPerPageOptions = [10, 20, 30, 40];

export default function SectionProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]!); // show #orders per page

  const { productId } = useParams();

  function handleItemsPerPageChange(value: number) {
    setItemsPerPage(value); // set value
    setCurrentPage(1); // default to page 1
  }

  return (
    <div>
      <Head
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        itemsPerPage={itemsPerPage}
        handleItemsPerPageChange={handleItemsPerPageChange}
        itemsPerPageOptions={itemsPerPageOptions}
      />

      {productId ? (
        productId === "new" ? (
          <CreateProduct />
        ) : null
      ) : (
        <ProductTable />
      )}
    </div>
  );
}
