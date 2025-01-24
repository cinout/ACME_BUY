import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import NewCategoryDialog from "./NewCategoryDialog";
import HeadSearch from "@/views/shared_components/HeadSearch";
import HeadShowCount from "@/views/shared_components/HeadShowCount";
import ButtonCreateNew from "@/views/shared_components/ButtonCreateNew";

interface HeadProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  itemsPerPage: number;
  handleItemsPerPageChange: (value: number) => void;
  itemsPerPageOptions: number[];
}

export default function Head({
  searchValue,
  setSearchValue,
  itemsPerPage,
  handleItemsPerPageChange,
  itemsPerPageOptions,
}: HeadProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 justify-center justify-items-center items-end content-end gap-y-4 md:gap-y-0">
      {/* TODO: implement search function */}

      <HeadSearch
        placeholder="search categories ..."
        additionalStyle="md:justify-self-start"
        value={searchValue}
        onChangeValue={setSearchValue}
      />

      <ButtonCreateNew content="New Category" onClick={() => setIsOpen(true)} />

      <NewCategoryDialog isOpen={isOpen} setIsOpen={setIsOpen} />

      <HeadShowCount
        itemsPerPage={itemsPerPage}
        itemsPerPageOptions={itemsPerPageOptions}
        handleItemsPerPageChange={handleItemsPerPageChange}
        additionalStyle="md:justify-self-end"
      />
    </div>
  );
}
