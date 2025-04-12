import { useState } from "react";

export default function useHookPageSwitch() {
  const itemsPerPageOptions = [10, 20, 30, 40];
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]!); // show #orders per page
  const [currentPage, setCurrentPage] = useState(1);
  const start_index = (currentPage - 1) * itemsPerPage;
  const end_index = currentPage * itemsPerPage;

  function handleItemsPerPageChange(value: number) {
    setItemsPerPage(value); // set value
    setCurrentPage(1); // default to page 1
  }

  return {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    handleItemsPerPageChange,
    start_index,
    end_index,
    itemsPerPageOptions,
  };
}
