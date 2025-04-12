import { styleFilterLabel, styleFilterSelect } from "@/utils/styles";
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
    <div className={`${styleFilterLabel} ${additionalStyle}`}>
      <span>Show</span>
      <Select
        name="itemsPerPage"
        className={styleFilterSelect}
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
