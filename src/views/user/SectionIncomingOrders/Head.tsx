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
  numPaidOrders: number;
}

export default function Head({
  searchValue,
  setSearchValue,
  orderStatusFilter,
  setOrderStatusFilter,
  itemsPerPage,
  handleItemsPerPageChange,
  itemsPerPageOptions,
  numPaidOrders,
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
          {[
            "All",
            ...Object.values(OrderStatusEnum).filter(
              (a) => a !== OrderStatusEnum.Pending
            ),
          ].map((a) => (
            <option value={a} key={a}>
              {a}
            </option>
          ))}
        </select>
        {numPaidOrders > 0 && (
          <div
            className={styleNotificationCircle}
            data-tooltip-id={`tooltip-pending-orders`}
            onClick={() => setOrderStatusFilter(OrderStatusEnum.Paid)}
          >
            {numPaidOrders > 99 ? "99+" : numPaidOrders}
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
        content={`${numPaidOrders} paid orders`}
      />
    </div>
  );
}
