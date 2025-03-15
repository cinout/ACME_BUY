import { RouteObject } from "react-router-dom";
import {
  UserSectionDashboard,
  UserSectionChat,
  UserSectionOrders,
  UserSectionPayments,
  UserSectionProducts,
  UserSectionSupport,
  UserDeactivated,
  UserPending,
  UserSectionWishList,
  UserSectionProfile,
} from "./routesLazyExports";
import { RoleEnum, UserStatusEnum } from "@/graphql/userGql";

export type PrivateUserRouteType = RouteObject & {
  accessRoles: RoleEnum[];
  accessUserStatus: UserStatusEnum[];
};

/**
 * USER
 */
export const privateUserRoutes: PrivateUserRouteType[] = [
  {
    path: "/user/dashboard",
    element: <UserSectionDashboard />,
    accessRoles: [RoleEnum.User],
    accessUserStatus: [UserStatusEnum.Active],
  },
  {
    path: "/user/products/:productId?",
    element: <UserSectionProducts />,
    accessRoles: [RoleEnum.User],
    accessUserStatus: [UserStatusEnum.Active],
  },
  {
    path: "/user/orders/:orderId?",
    element: <UserSectionOrders />,
    accessRoles: [RoleEnum.User],
    accessUserStatus: [UserStatusEnum.Active],
  },
  {
    path: "/user/wishlist",
    element: <UserSectionWishList />,
    accessRoles: [RoleEnum.User],
    accessUserStatus: [UserStatusEnum.Active],
  },
  {
    path: "/user/payments/:paymentId?",
    element: <UserSectionPayments />,
    accessRoles: [RoleEnum.User],
    accessUserStatus: [UserStatusEnum.Active],
  },
  {
    path: "/user/chat/:chatId?",
    element: <UserSectionChat />,
    accessRoles: [RoleEnum.User],
    accessUserStatus: [UserStatusEnum.Active],
  },
  {
    path: "/user/support",
    element: <UserSectionSupport />,
    accessRoles: [RoleEnum.User],
    accessUserStatus: [
      UserStatusEnum.Active,
      UserStatusEnum.Deactivated,
      UserStatusEnum.Pending,
    ],
  },
  {
    path: "/user/account-pending",
    element: <UserPending />,
    accessRoles: [RoleEnum.User],
    accessUserStatus: [UserStatusEnum.Pending],
  },
  {
    path: "/user/account-deactivated",
    element: <UserDeactivated />,
    accessRoles: [RoleEnum.User],
    accessUserStatus: [UserStatusEnum.Deactivated],
  },
  {
    path: "/user/profile",
    element: <UserSectionProfile />,
    accessRoles: [RoleEnum.User],
    accessUserStatus: [
      UserStatusEnum.Active,
      UserStatusEnum.Deactivated,
      UserStatusEnum.Pending,
    ],
  },
];
