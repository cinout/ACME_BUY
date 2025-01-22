// TODO: consider moving this to utils
import { Role } from "@/utils/enums";
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
  path: string;
}

// TODO: how to use the role attribute?
export const navOptions: NavOptionsProps[] = [
  {
    id: 1, //TODO: do we need id?
    name: "Dashboard",
    icon: <AiOutlineDashboard />,
    role: [Role.Admin],
    path: "/admin/dashboard",
  },

  {
    id: 2,
    name: "Categories",
    icon: <BiCategory />,
    role: [Role.Admin],
    path: "/admin/dashboard/categories",
  },
  {
    id: 3,
    name: "Sellers",
    icon: <FaPeopleGroup />,
    role: [Role.Admin],
    path: "/admin/dashboard/sellers",
  },
  {
    id: 4,
    name: "Orders",
    icon: <CiDeliveryTruck />,
    role: [Role.Admin],
    path: "/admin/dashboard/orders",
  },
  {
    id: 5,
    name: "Withdraw Requests",
    icon: <MdOutlinePayment />,
    role: [Role.Admin],
    path: "/admin/dashboard/payment-requests",
  },
  {
    id: 6,
    name: "Seller Requests",
    icon: <FaPerson />,
    role: [Role.Admin],
    path: "/admin/dashboard/seller-requests",
  },
  {
    id: 7,
    name: "Live Chat",
    icon: <IoChatboxEllipsesOutline />,
    role: [Role.Admin],
    path: "/admin/dashboard/chat",
  },
];
