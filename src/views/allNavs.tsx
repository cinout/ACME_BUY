import { RoleEnum, SellerStatusEnum } from "@/utils/enums";
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
import { CgProfile } from "react-icons/cg";

export interface NavOptionsProps {
  name: string;
  icon: JSX.Element;
  accessRoles: string[];
  accessSellerStatus?: SellerStatusEnum[];
  goto: string;
}

export const navOptions: NavOptionsProps[] = [
  /**
   * ADMIN
   */
  {
    name: "Dashboard (TODO:)",
    icon: <AiOutlineDashboard />,
    accessRoles: [RoleEnum.Admin],
    goto: "/admin/dashboard",
  },

  {
    name: "Categories",
    icon: <BiCategory />,
    accessRoles: [RoleEnum.Admin],
    goto: "/admin/categories",
  },
  {
    name: "Sellers (TODO:)",
    icon: <FaPeopleGroup />,
    accessRoles: [RoleEnum.Admin],
    goto: "/admin/sellers",
  },
  {
    name: "Orders (TODO:)",
    icon: <CiDeliveryTruck />,
    accessRoles: [RoleEnum.Admin],
    goto: "/admin/orders",
  },
  {
    name: "Withdraw Requests (TODO:)",
    icon: <MdOutlinePayment />,
    accessRoles: [RoleEnum.Admin],
    goto: "/admin/withdraw-requests",
  },
  {
    name: "Seller Requests (TODO:)",
    icon: <FaPerson />,
    accessRoles: [RoleEnum.Admin],
    goto: "/admin/seller-requests",
  },
  {
    name: "Live Chat (TODO:)",
    icon: <IoChatboxEllipsesOutline />,
    accessRoles: [RoleEnum.Admin],
    goto: "/admin/chat",
  },
  {
    name: "Profile (TODO:)",
    icon: <CgProfile />,
    accessRoles: [RoleEnum.Admin],
    goto: "/admin/profile",
  },

  /**
   * SELLER
   */
  {
    name: "Dashboard",
    icon: <AiOutlineDashboard />,
    accessRoles: [RoleEnum.Seller],
    goto: "/seller/dashboard",
    accessSellerStatus: [SellerStatusEnum.Active],
  },
  {
    name: "Products",
    icon: <HiOutlineShoppingBag />,
    accessRoles: [RoleEnum.Seller],
    goto: "/seller/products",
    accessSellerStatus: [SellerStatusEnum.Active],
  },
  {
    name: "Orders",
    icon: <CiDeliveryTruck />,
    accessRoles: [RoleEnum.Seller],
    goto: "/seller/orders",
    accessSellerStatus: [SellerStatusEnum.Active],
  },
  {
    name: "Payments",
    icon: <MdOutlinePayment />,
    accessRoles: [RoleEnum.Seller],
    goto: "/seller/payments",
    accessSellerStatus: [SellerStatusEnum.Active],
  },
  {
    name: "Chat Customer",
    icon: <IoChatboxEllipsesOutline />,
    accessRoles: [RoleEnum.Seller],
    goto: "/seller/chat-customer",
    accessSellerStatus: [SellerStatusEnum.Active],
  },
  {
    name: "Support",
    icon: <MdOutlineSupportAgent />,
    accessRoles: [RoleEnum.Seller],
    goto: "/seller/support",
    accessSellerStatus: [
      SellerStatusEnum.Active,
      SellerStatusEnum.Deactivated,
      SellerStatusEnum.Pending,
    ],
  },
  {
    name: "Profile",
    icon: <CgProfile />,
    accessRoles: [RoleEnum.Seller],
    goto: "/seller/profile",
    accessSellerStatus: [
      SellerStatusEnum.Active,
      SellerStatusEnum.Deactivated,
      SellerStatusEnum.Pending,
    ],
  },
];
