import { RoleEnum, UserStatusEnum } from "@/utils/enums";
import { JSX } from "react";

import {
  iconCategory,
  iconChat,
  iconDashboard,
  iconDelivery,
  iconPayment,
  iconProducts,
  iconProfile,
  iconUsers,
  iconSupportTeam,
} from "@/utils/icons";

export interface NavOptionsProps {
  name: string;
  icon: JSX.Element;
  accessRoles: string[];
  accessUserStatus?: UserStatusEnum[];
  asRole?: "general" | "customer" | "seller";
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
    name: "Users",
    icon: iconUsers(),
    accessRoles: [RoleEnum.Admin],
    goto: "/admin/users",
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
  //   name: "User Requests (TODO:)",
  //   icon: <FaPerson />,
  //   accessRoles: [RoleEnum.Admin],
  //   goto: "/admin/user-requests",
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
   * USER
   */
  // General
  {
    name: "Dashboard",
    icon: iconDashboard(),
    accessRoles: [RoleEnum.User],
    goto: "/user/dashboard",
    accessUserStatus: [UserStatusEnum.Active],
    asRole: "general",
  },
  {
    name: "Profile",
    icon: iconProfile(),
    accessRoles: [RoleEnum.User],
    goto: "/user/profile",
    accessUserStatus: [
      UserStatusEnum.Active,
      UserStatusEnum.Deactivated,
      UserStatusEnum.Pending,
    ],
    asRole: "general",
  },
  // As a seller
  {
    name: "Products",
    icon: iconProducts(),
    accessRoles: [RoleEnum.User],
    goto: "/user/products",
    accessUserStatus: [UserStatusEnum.Active],
    asRole: "seller",
  },

  {
    name: "Payments",
    icon: iconPayment(),
    accessRoles: [RoleEnum.User],
    goto: "/user/payments",
    accessUserStatus: [UserStatusEnum.Active],
    asRole: "seller",
  },
  {
    name: "Chat Customer",
    icon: iconChat(),
    accessRoles: [RoleEnum.User],
    goto: "/user/chat-customer",
    accessUserStatus: [UserStatusEnum.Active],
    asRole: "seller",
  },
  // TODO:[3] incoming orders

  // As a customer
  {
    name: "Orders",
    icon: iconDelivery(),
    accessRoles: [RoleEnum.User],
    goto: "/user/orders",
    accessUserStatus: [UserStatusEnum.Active],
    asRole: "customer",
  },
  {
    name: "Support",
    icon: iconSupportTeam(),
    accessRoles: [RoleEnum.User],
    goto: "/user/support",
    accessUserStatus: [
      UserStatusEnum.Active,
      UserStatusEnum.Deactivated,
      UserStatusEnum.Pending,
    ],
    asRole: "customer",
  },
  // TODO:[3] wishlist
];
