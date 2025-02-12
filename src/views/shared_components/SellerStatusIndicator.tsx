import { SellerStatusEnum } from "@/utils/enums";

interface SellerStatusIndicatorProps {
  status: SellerStatusEnum;
  additionalStyle?: string;
}
export default function SellerStatusIndicator({
  status,
  additionalStyle,
}: SellerStatusIndicatorProps) {
  const bg_color =
    status === SellerStatusEnum.Active
      ? "bg-active-400"
      : status === SellerStatusEnum.Pending
      ? "bg-pending-400"
      : status === SellerStatusEnum.Deactivated
      ? "bg-deactivated-400"
      : "";

  return (
    <div
      className={`inline-block w-4 h-4 ${bg_color} rounded-full shadow-2xl ${additionalStyle}`}
    />
  );
}
