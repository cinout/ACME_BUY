import { UserStatusEnum } from "@/utils/enums";

interface UserStatusIndicatorProps {
  status: UserStatusEnum;
  additionalStyle?: string;
}
export default function UserStatusIndicator({
  status,
  additionalStyle,
}: UserStatusIndicatorProps) {
  const bg_color =
    status === UserStatusEnum.Active
      ? "bg-active-400"
      : status === UserStatusEnum.Pending
      ? "bg-pending-400"
      : status === UserStatusEnum.Deactivated
      ? "bg-deactivated-400"
      : "";

  return (
    <div
      className={`inline-block w-4 h-4 ${bg_color} rounded-full shadow-2xl ${additionalStyle}`}
    />
  );
}
