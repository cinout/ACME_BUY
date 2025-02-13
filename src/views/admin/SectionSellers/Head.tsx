import { SellerStatusEnum } from "@/utils/enums";
import CustomTooltip from "@/views/shared_components/CustomTooltip";
import HeadSearch from "@/views/shared_components/HeadSearch";
import HeadShowCount from "@/views/shared_components/HeadShowCount";
import { Dispatch, SetStateAction } from "react";

interface HeadProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  itemsPerPage: number;
  handleItemsPerPageChange: (value: number) => void;
  itemsPerPageOptions: number[];
  sellerStatusFilter: "All" | SellerStatusEnum;
  setSellerStatusFilter: Dispatch<SetStateAction<"All" | SellerStatusEnum>>;
  numPendingSellers: number;
}

export default function Head({
  searchValue,
  setSearchValue,
  itemsPerPage,
  handleItemsPerPageChange,
  itemsPerPageOptions,
  sellerStatusFilter,
  setSellerStatusFilter,
  numPendingSellers,
}: HeadProps) {
  return (
    <div className="flex justify-between items-end flex-wrap ">
      {/* TODO: implement search function */}
      <HeadSearch
        placeholder="search sellers ..."
        additionalStyle=""
        value={searchValue}
        onChangeValue={setSearchValue}
      />

      <label className="text-white font-light">
        Status
        <select
          name="sellerStatusFilter"
          className="ml-2 bg-transparent border-b-[1px] cursor-pointer"
          value={sellerStatusFilter}
          onChange={(e) => {
            setSellerStatusFilter(e.target.value as "All" | SellerStatusEnum);
          }}
        >
          {["All", ...Object.values(SellerStatusEnum)].map((a) => (
            <option value={a} key={a}>
              {a}
            </option>
          ))}
        </select>
        {/* TODO:[3] update this */}
        {numPendingSellers > 0 && (
          <div
            className="bg-pending-400 text-pending-950 h-6 w-6 rounded-full text-sm font-bold inline-flex justify-center items-center ml-2 cursor-pointer"
            data-tooltip-id={`tooltip-pending-sellers`}
            onClick={() => setSellerStatusFilter(SellerStatusEnum.Pending)}
          >
            {numPendingSellers > 99 ? "99+" : numPendingSellers}
          </div>
        )}
      </label>

      <HeadShowCount
        itemsPerPage={itemsPerPage}
        itemsPerPageOptions={itemsPerPageOptions}
        handleItemsPerPageChange={handleItemsPerPageChange}
      />

      <CustomTooltip
        id={`tooltip-pending-sellers`}
        content={`${numPendingSellers} pending sellers`}
      />
    </div>
  );
}
