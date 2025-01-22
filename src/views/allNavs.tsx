// TODO: consider moving this to utils
import { RoleEnum } from "@/utils/enums";
import { JSX } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { CiDeliveryTruck } from "react-icons/ci";
import { BiCategory } from "react-icons/bi";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaPerson } from "react-icons/fa6";

export interface NavOptionsProps {
  id: number;
  name: string;
  icon: JSX.Element;
  role: string[];
  goto: string;
}

// TODO: how to use the role attribute?
// TODO: Do we need id fields?
export const navOptions: NavOptionsProps[] = [
  {
    id: 1,
    name: "Dashboard",
    icon: <AiOutlineDashboard />,
    role: [RoleEnum.Admin],
    goto: "/admin/dashboard",
  },

  {
    id: 2,
    name: "Categories",
    icon: <BiCategory />,
    role: [RoleEnum.Admin],
    goto: "/admin/categories",
  },
  {
    id: 3,
    name: "Sellers",
    icon: <FaPeopleGroup />,
    role: [RoleEnum.Admin],
    goto: "/admin/sellers",
  },
  {
    id: 4,
    name: "Orders",
    icon: <CiDeliveryTruck />,
    role: [RoleEnum.Admin],
    goto: "/admin/orders",
  },
  {
    id: 5,
    name: "Withdraw Requests",
    icon: <MdOutlinePayment />,
    role: [RoleEnum.Admin],
    goto: "/admin/withdraw-requests",
  },
  {
    id: 6,
    name: "Seller Requests",
    icon: <FaPerson />,
    role: [RoleEnum.Admin],
    goto: "/admin/seller-requests",
  },
  {
    id: 7,
    name: "Live Chat",
    icon: <IoChatboxEllipsesOutline />,
    role: [RoleEnum.Admin],
    goto: "/admin/chat",
  },
];
