import { RoleEnum, SellerStatusEnum } from "@/utils/enums";
import { JSX } from "react";

import {
  iconCategory,
  iconChat,
  iconDashboard,
  iconDelivery,
  iconPayment,
  iconProducts,
  iconProfile,
  iconSellers,
  iconSupportTeam,
} from "@/utils/icons";

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
    icon: iconDashboard(),
    accessRoles: [RoleEnum.Admin],
    goto: "/admin/dashboard",
  },

  {
    name: "Genres",
    icon: iconCategory(),
    accessRoles: [RoleEnum.Admin],
    goto: "/admin/genres",
  },
  {
    name: "Sellers",
    icon: iconSellers(),
    accessRoles: [RoleEnum.Admin],
    goto: "/admin/sellers",
  },
  {
    name: "Orders (TODO:)",
    icon: iconDelivery(),
    accessRoles: [RoleEnum.Admin],
    goto: "/admin/orders",
  },
  {
    name: "Withdraw Requests (TODO:[1])",
    icon: iconPayment(),
    accessRoles: [RoleEnum.Admin],
    goto: "/admin/withdraw-requests",
  },
  // {
  //   name: "Seller Requests (TODO:)",
  //   icon: <FaPerson />,
  //   accessRoles: [RoleEnum.Admin],
  //   goto: "/admin/seller-requests",
  // },
  {
    name: "Live Chat (TODO:)",
    icon: iconChat(),
    accessRoles: [RoleEnum.Admin],
    goto: "/admin/chat",
  },
  {
    name: "Profile (TODO:)",
    icon: iconProfile(),
    accessRoles: [RoleEnum.Admin],
    goto: "/admin/profile",
  },

  /**
   * SELLER
   */
  {
    name: "Dashboard",
    icon: iconDashboard(),
    accessRoles: [RoleEnum.Seller],
    goto: "/seller/dashboard",
    accessSellerStatus: [SellerStatusEnum.Active],
  },
  {
    name: "Products",
    icon: iconProducts(),
    accessRoles: [RoleEnum.Seller],
    goto: "/seller/products",
    accessSellerStatus: [SellerStatusEnum.Active],
  },
  {
    name: "Orders",
    icon: iconDelivery(),
    accessRoles: [RoleEnum.Seller],
    goto: "/seller/orders",
    accessSellerStatus: [SellerStatusEnum.Active],
  },
  {
    name: "Payments",
    icon: iconPayment(),
    accessRoles: [RoleEnum.Seller],
    goto: "/seller/payments",
    accessSellerStatus: [SellerStatusEnum.Active],
  },
  {
    name: "Chat Customer",
    icon: iconChat(),
    accessRoles: [RoleEnum.Seller],
    goto: "/seller/chat-customer",
    accessSellerStatus: [SellerStatusEnum.Active],
  },
  {
    name: "Support",
    icon: iconSupportTeam(),
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
    icon: iconProfile(),
    accessRoles: [RoleEnum.Seller],
    goto: "/seller/profile",
    accessSellerStatus: [
      SellerStatusEnum.Active,
      SellerStatusEnum.Deactivated,
      SellerStatusEnum.Pending,
    ],
  },
];
