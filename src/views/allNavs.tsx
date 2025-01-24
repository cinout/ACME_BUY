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
import { MdOutlineSupportAgent } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi";

export interface NavOptionsProps {
  name: string;
  icon: JSX.Element;
  role: string[];
  goto: string;
}

// TODO: how to use the role attribute?
// TODO: Do we need id fields?
export const navOptions: NavOptionsProps[] = [
  /**
   * ADMIN
   */
  {
    name: "Dashboard",
    icon: <AiOutlineDashboard />,
    role: [RoleEnum.Admin],
    goto: "/admin/dashboard",
  },

  {
    name: "Categories",
    icon: <BiCategory />,
    role: [RoleEnum.Admin],
    goto: "/admin/categories",
  },
  {
    name: "Sellers",
    icon: <FaPeopleGroup />,
    role: [RoleEnum.Admin],
    goto: "/admin/sellers",
  },
  {
    name: "Orders",
    icon: <CiDeliveryTruck />,
    role: [RoleEnum.Admin],
    goto: "/admin/orders",
  },
  {
    name: "Withdraw Requests",
    icon: <MdOutlinePayment />,
    role: [RoleEnum.Admin],
    goto: "/admin/withdraw-requests",
  },
  {
    name: "Seller Requests",
    icon: <FaPerson />,
    role: [RoleEnum.Admin],
    goto: "/admin/seller-requests",
  },
  {
    name: "Live Chat",
    icon: <IoChatboxEllipsesOutline />,
    role: [RoleEnum.Admin],
    goto: "/admin/chat",
  },

  /**
   * SELLER
   */
  {
    name: "Dashboard",
    icon: <AiOutlineDashboard />,
    role: [RoleEnum.Seller],
    goto: "/seller/dashboard",
  },
  {
    name: "Products",
    icon: <HiOutlineShoppingBag />,
    role: [RoleEnum.Seller],
    goto: "/seller/products",
  },
  {
    name: "Orders",
    icon: <CiDeliveryTruck />,
    role: [RoleEnum.Seller],
    goto: "/seller/orders",
  },
  {
    name: "Payments",
    icon: <MdOutlinePayment />,
    role: [RoleEnum.Seller],
    goto: "/seller/payments",
  },
  {
    name: "Chat Customer",
    icon: <IoChatboxEllipsesOutline />,
    role: [RoleEnum.Seller],
    goto: "/seller/chat-customer",
  },
  {
    name: "Support",
    icon: <MdOutlineSupportAgent />,
    role: [RoleEnum.Seller],
    goto: "/seller/support",
  },
];
