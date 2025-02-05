import { useState } from "react";
import Pagination from "@/views/shared_components/Pagination";
import Head from "./Head";
import CategoryTable from "./CategoryTable";
import { CategoryEntity } from "@/utils/entities";
import { gql, useQuery } from "@apollo/client";
import LoadingIndicatorWithDiv from "@/views/shared_components/LoadingIndicatorWithDiv";

// // fetch from server
// const categoryStats: CategoryEntity[] = Array.from({ length: 34 }, () => ({
//   id: faker.string.uuid(),
//   name: faker.commerce.product(),
//   image: faker.image.avatar(),
//   createdAt: faker.date.recent(),
// }));

const itemsPerPageOptions = [10, 20, 30, 40];

const GQL_GET_ALL_CATEGORIES = gql`
  query {
    getAllCategories {
      id
      name
      imageUrl
    }
  }
`;

export default function SectionCategory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]!); // show #orders per page

  const start_index = (currentPage - 1) * itemsPerPage;
  const end_index = currentPage * itemsPerPage;

  const gql_result = useQuery(GQL_GET_ALL_CATEGORIES);

  function handleItemsPerPageChange(value: number) {
    setItemsPerPage(value); // set value
    setCurrentPage(1); // default to page 1
    // setDetailShown([]); // hide all shown details
  }

  if (gql_result.loading) {
    return <LoadingIndicatorWithDiv />;
  }

  const allCategories = gql_result.data.getAllCategories as CategoryEntity[];

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
        categoryStats={allCategories.slice(start_index, end_index)}
      />

      {/* Pagination */}
      {/* TODO: is there a more efficient way to retrieve and display information according to current page? */}
      <div className="mt-12">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={Math.ceil(allCategories.length / itemsPerPage)}
          maxPageOptionsCount={5}
        />
      </div>
    </>
  );
}
