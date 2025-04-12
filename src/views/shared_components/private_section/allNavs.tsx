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
  iconLoveEmpty,
  iconMoney,
} from "@/utils/icons";
import { RoleEnum, UserStatusEnum } from "@/graphql/userGql";

export interface NavOptionsProps {
  name: string;
  icon: JSX.Element;
  accessRoles: string[];
  accessUserStatus?: UserStatusEnum[];
  asRole?: "general" | "as customer" | "as seller";
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
  // {
  //   name: "Withdraw Requests",
  //   icon: iconPayment(),
  //   accessRoles: [RoleEnum.Admin],
  //   goto: "/admin/withdraw-requests",
  // },
  // {
  //   name: "User Requests",
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
  {
    name: "Chat",
    icon: iconChat(),
    accessRoles: [RoleEnum.User],
    goto: "/user/chat",
    accessUserStatus: [UserStatusEnum.Active],
    asRole: "general",
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
    asRole: "general",
  },

  // As a customer
  {
    name: "Orders",
    icon: iconDelivery(),
    accessRoles: [RoleEnum.User],
    goto: "/user/orders",
    accessUserStatus: [UserStatusEnum.Active],
    asRole: "as customer",
  },

  {
    name: "Wish List",
    icon: iconLoveEmpty(),
    accessRoles: [RoleEnum.User],
    goto: "/user/wishlist",
    accessUserStatus: [UserStatusEnum.Active],
    asRole: "as customer",
  },

  // As a seller
  {
    name: "Products",
    icon: iconProducts(),
    accessRoles: [RoleEnum.User],
    goto: "/user/products",
    accessUserStatus: [UserStatusEnum.Active],
    asRole: "as seller",
  },
  {
    name: "Incoming Orders",
    icon: iconMoney(),
    accessRoles: [RoleEnum.User],
    goto: "/user/incoming-orders",
    accessUserStatus: [UserStatusEnum.Active],
    asRole: "as seller",
  },

  // {
  //   name: "Payments",
  //   icon: iconPayment(),
  //   accessRoles: [RoleEnum.User],
  //   goto: "/user/payments",
  //   accessUserStatus: [UserStatusEnum.Active],
  //   asRole: "as seller",
  // },
];
