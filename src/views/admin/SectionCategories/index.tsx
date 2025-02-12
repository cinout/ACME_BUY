import { useState } from "react";
import Pagination from "@/views/shared_components/Pagination";
import Head from "./Head";
import CategoryTable from "./CategoryTable";
import { CategoryEntity } from "@/utils/entities";
import { useQuery } from "@apollo/client";
import LoadingIndicatorWithDiv from "@/views/shared_components/LoadingIndicatorWithDiv";
import {
  GQL_CATEGORIES_GET_ALL,
  GQL_CATEGORY_DELETE,
} from "@/graphql/categoryGql";
import DeleteConfirmDialog from "../../shared_components/DeleteConfirmDialog";
import { useParams } from "react-router-dom";
import CategoryDialog from "./CategoryDialog";

const itemsPerPageOptions = [10, 20, 30, 40];

export default function SectionCategory() {
  /**
   * State
   */
  // search value
  const [searchValue, setSearchValue] = useState("");
  // delete ID
  const [toDeleteItemId, setToDeleteItemId] = useState<string>("");
  // page
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]!); // show #orders per page
  const start_index = (currentPage - 1) * itemsPerPage;
  const end_index = currentPage * itemsPerPage;

  /**
   * Route
   */
  const { categoryId } = useParams();

  /**
   * GQL
   */
  const gql_result = useQuery(GQL_CATEGORIES_GET_ALL);
  if (gql_result.loading) {
    return <LoadingIndicatorWithDiv />;
  }
  const allCategories = gql_result.data.getAllCategories as CategoryEntity[];
  const toDeleteCategory = allCategories.find((a) => a.id == toDeleteItemId);
  const validCategory = allCategories.find((a) => a.id == categoryId);

  /**
   * Functions
   */
  function handleItemsPerPageChange(value: number) {
    setItemsPerPage(value); // set value
    setCurrentPage(1); // default to page 1
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
        categoryStats={allCategories.slice(start_index, end_index)}
        setToDeleteItemId={setToDeleteItemId}
      />

      {toDeleteItemId && toDeleteCategory && (
        <DeleteConfirmDialog
          isOpen={!!toDeleteItemId}
          id={toDeleteCategory.id}
          name={toDeleteCategory.name}
          deletionQuery={GQL_CATEGORY_DELETE}
          setToDeleteItemId={setToDeleteItemId}
          gqlType="Category"
        />
      )}

      {(categoryId === "new" || !!validCategory) && (
        <CategoryDialog
          isOpen={categoryId === "new" || !!validCategory}
          mode={categoryId === "new" ? "Create" : "Edit"}
          editCategoryInfo={validCategory}
          submitText={categoryId === "new" ? "Create" : "Update"}
        />
      )}

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
