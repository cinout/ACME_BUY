import { Input, Select } from "@headlessui/react";

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
  return (
    <div className="flex justify-between items-end flex-wrap ">
      {/* TODO: implement search function */}
      <Input
        placeholder="search sellers ..."
        name="search"
        type="text"
        className={
          "md:justify-self-start bg-transparent border-b-[1px] border-sky-200 px-2 text-sky-100 w-36 sm:w-64 ml-4 outline-none"
        }
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <div className=" text-white font-light">
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
