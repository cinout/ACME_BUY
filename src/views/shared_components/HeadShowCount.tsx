import { Select } from "@headlessui/react";

interface HeadShowCountProps {
  itemsPerPage: number;
  itemsPerPageOptions: number[];
  handleItemsPerPageChange: (value: number) => void;
  additionalStyle?: string;
}

export default function HeadShowCount({
  itemsPerPage,
  itemsPerPageOptions,
  handleItemsPerPageChange,
  additionalStyle,
}: HeadShowCountProps) {
  return (
    <div className={`text-white font-light ${additionalStyle}`}>
      <span>Show</span>
      <Select
        name="itemsPerPage"
        className="ml-2 bg-transparent border-b-[1px] cursor-pointer"
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
  );
}
