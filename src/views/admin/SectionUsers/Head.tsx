import { UserStatusEnum } from "@/graphql/userGql";
import {
  styleFilterLabel,
  styleFilterSelect,
  styleNotificationCircle,
} from "@/utils/styles";
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
      {/* TODO:[3] implement search function */}
      <HeadSearch
        placeholder="search users ..."
        additionalStyle=""
        value={searchValue}
        onChangeValue={setSearchValue}
      />

      <label className={styleFilterLabel}>
        Status
        <select
          name="userStatusFilter"
          className={styleFilterSelect}
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
            className={styleNotificationCircle}
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
