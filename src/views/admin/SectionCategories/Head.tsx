import { Input, Select } from "@headlessui/react";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import NewCategoryDialog from "./NewCategoryDialog";

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
    <div className="grid grid-cols-1 md:grid-cols-3 justify-center justify-items-center gap-y-4 md:gap-y-0">
      {/* TODO: implement search function */}
      <Input
        placeholder="search categories ..."
        name="search"
        type="text"
        className={
          "md:justify-self-start  py-2 bg-transparent border-b-[1px] border-sky-200 px-2 text-sky-100 w-36 sm:w-64 ml-4 outline-none"
        }
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      {/* TODO: implement add new category function, make it a pop-up */}
      <button
        className="flex justify-center items-center gap-2 bg-sky-600 text-white h-8 w-32 rounded-md text-sm font-bold px-2 py-1 box-content border-2 hover:w-36 hover:bg-sky-500 transition-all"
        onClick={() => setIsOpen(true)}
      >
        <IoMdAdd />
        <span>New Category</span>
      </button>

      <NewCategoryDialog isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="md:justify-self-end text-white font-light">
        <span>Show</span>
        <Select
          name="itemsPerPage"
          className="mx-2 bg-transparent border-b-[1px] cursor-pointer"
          value={itemsPerPage}
          onChange={(e) => {
            handleItemsPerPageChange(parseInt(e.target.value));
          }}
        >
          {itemsPerPageOptions.map((a) => (
            <option value={a} key={a}>
              {a}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}
