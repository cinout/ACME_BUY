import { useState } from "react";
import { faker } from "@faker-js/faker";
import Pagination from "@/views/shared_components/Pagination";
import Head from "./Head";
import CategoryTable from "./CategoryTable";
import { CategoryEntity } from "@/utils/entities";

// TODO: fetch from server
const categoryStats: CategoryEntity[] = Array.from({ length: 34 }, () => ({
  id: faker.string.uuid(),
  name: faker.commerce.product(),
  image: faker.image.avatar(),
}));

const itemsPerPageOptions = [10, 20, 30, 40];

export default function SectionCategory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]!); // show #orders per page

  const start_index = (currentPage - 1) * itemsPerPage;
  const end_index = currentPage * itemsPerPage;

  function handleItemsPerPageChange(value: number) {
    setItemsPerPage(value); // set value
    setCurrentPage(1); // default to page 1
    // setDetailShown([]); // hide all shown details
  }

  return (
    <>
      <Head
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        itemsPerPage={itemsPerPage}
        handleItemsPerPageChange={handleItemsPerPageChange}
        itemsPerPageOptions={itemsPerPageOptions}
      />

      <CategoryTable
        categoryStats={categoryStats.slice(start_index, end_index)}
      />

      {/* Pagination */}
      {/* TODO: is there a more efficient way to retrieve and display information according to current page? */}
      <div className="mt-12">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={Math.ceil(categoryStats.length / itemsPerPage)}
          maxPageOptionsCount={5}
        />
      </div>
    </>
  );
}
