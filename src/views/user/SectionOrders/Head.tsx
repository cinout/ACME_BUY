import { OrderStatusEnum } from "@/graphql/orderGql";
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
  orderStatusFilter: OrderStatusEnum | "All";
  setOrderStatusFilter: Dispatch<SetStateAction<OrderStatusEnum | "All">>;
  itemsPerPage: number;
  handleItemsPerPageChange: (value: number) => void;
  itemsPerPageOptions: number[];
  numPendingOrders: number;
}

export default function Head({
  searchValue,
  setSearchValue,
  orderStatusFilter,
  setOrderStatusFilter,
  itemsPerPage,
  handleItemsPerPageChange,
  itemsPerPageOptions,
  numPendingOrders,
}: HeadProps) {
  return (
    <div className="flex justify-between flex-wrap items-end gap-3">
      {/* TODO:[3] implement search function */}

      <HeadSearch
        placeholder="search orders ..."
        additionalStyle=""
        value={searchValue}
        onChangeValue={setSearchValue}
      />

      <label className={styleFilterLabel}>
        Status
        <select
          name="userStatusFilter"
          className={styleFilterSelect}
          value={orderStatusFilter}
          onChange={(e) => {
            setOrderStatusFilter(e.target.value as "All" | OrderStatusEnum);
          }}
        >
          {["All", ...Object.values(OrderStatusEnum)].map((a) => (
            <option value={a} key={a}>
              {a}
            </option>
          ))}
        </select>
        {numPendingOrders > 0 && (
          <div
            className={styleNotificationCircle}
            data-tooltip-id={`tooltip-pending-orders`}
            onClick={() => setOrderStatusFilter(OrderStatusEnum.Pending)}
          >
            {numPendingOrders > 99 ? "99+" : numPendingOrders}
          </div>
        )}
      </label>

      <HeadShowCount
        itemsPerPage={itemsPerPage}
        itemsPerPageOptions={itemsPerPageOptions}
        handleItemsPerPageChange={handleItemsPerPageChange}
      />

      <CustomTooltip
        id={`tooltip-pending-orders`}
        content={`${numPendingOrders} pending orders`}
      />
    </div>
  );
}
