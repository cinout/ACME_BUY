// TODO: consider moving this to utils
import { Role } from "@/utils/enums";
import { JSX } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { CiDeliveryTruck } from "react-icons/ci";
import { BiCategory } from "react-icons/bi";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlinePayment, MdBlock } from "react-icons/md";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";

export interface NavOptionsProps {
  id: number;
  name: string;
  icon: JSX.Element;
  role: string[];
  path: string;
}

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
    name: "Orders",
    icon: <CiDeliveryTruck />,
    role: [Role.Admin],
    path: "/admin/dashboard/orders",
  },
  {
    id: 3,
    name: "Category",
    icon: <BiCategory />,
    role: [Role.Admin],
    path: "/admin/dashboard/category",
  },
  {
    id: 4,
    name: "Sellers",
    icon: <FaPeopleGroup />,
    role: [Role.Admin],
    path: "/admin/dashboard/sellers",
  },
  {
    id: 5,
    name: "Payment Requests",
    icon: <MdOutlinePayment />,
    role: [Role.Admin],
    path: "/admin/dashboard/payment",
  },
  {
    id: 6,
    name: "Deactivate Sellers",
    icon: <MdBlock />,
    role: [Role.Admin],
    path: "/admin/dashboard/deactivate",
  },
  {
    id: 7,
    name: "Live Chat",
    icon: <IoChatboxEllipsesOutline />,
    role: [Role.Admin],
    path: "/admin/dashboard/chat",
  },
];
