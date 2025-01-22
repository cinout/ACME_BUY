import { SellerStatusEnum } from "@/utils/enums";

interface SellorStatusIndicatorProps {
  status: SellerStatusEnum;
  additionalStyle?: string;
}
export default function SellorStatusIndicator({
  status,
  additionalStyle,
}: SellorStatusIndicatorProps) {
  const bg_color =
    status === SellerStatusEnum.Active
      ? "bg-active-400"
      : status === SellerStatusEnum.Pending
      ? "bg-pending-400"
      : status === SellerStatusEnum.Deactivated
      ? "bg-deactivated-400"
      : "";

  return (
    <span
      className={`w-4 h-4 ${bg_color} rounded-full shadow-2xl ${additionalStyle}`}
    />
  );
}
