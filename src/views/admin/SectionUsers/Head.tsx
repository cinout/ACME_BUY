import { UserStatusEnum } from "@/utils/enums";
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
  userStatusFilter: "All" | UserStatusEnum;
  setUserStatusFilter: Dispatch<SetStateAction<"All" | UserStatusEnum>>;
  numPendingUsers: number;
}

export default function Head({
  searchValue,
  setSearchValue,
  itemsPerPage,
  handleItemsPerPageChange,
  itemsPerPageOptions,
  userStatusFilter,
  setUserStatusFilter,
  numPendingUsers,
}: HeadProps) {
  return (
    <div className="flex justify-between items-end flex-wrap ">
      {/* TODO: implement search function */}
      <HeadSearch
        placeholder="search users ..."
        additionalStyle=""
        value={searchValue}
        onChangeValue={setSearchValue}
      />

      <label className="text-white font-light">
        Status
        <select
          name="userStatusFilter"
          className="ml-2 bg-transparent border-b-[1px] cursor-pointer"
          value={userStatusFilter}
          onChange={(e) => {
            setUserStatusFilter(e.target.value as "All" | UserStatusEnum);
          }}
        >
          {["All", ...Object.values(UserStatusEnum)].map((a) => (
            <option value={a} key={a}>
              {a}
            </option>
          ))}
        </select>
        {numPendingUsers > 0 && (
          <div
            className="bg-pending-400 text-pending-950 h-6 w-6 rounded-full text-sm font-bold inline-flex justify-center items-center ml-2 cursor-pointer"
            data-tooltip-id={`tooltip-pending-users`}
            onClick={() => setUserStatusFilter(UserStatusEnum.Pending)}
          >
            {numPendingUsers > 99 ? "99+" : numPendingUsers}
          </div>
        )}
      </label>

      <HeadShowCount
        itemsPerPage={itemsPerPage}
        itemsPerPageOptions={itemsPerPageOptions}
        handleItemsPerPageChange={handleItemsPerPageChange}
      />

      <CustomTooltip
        id={`tooltip-pending-users`}
        content={`${numPendingUsers} pending users`}
      />
    </div>
  );
}
