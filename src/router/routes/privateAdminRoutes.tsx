import { RouteObject } from "react-router-dom";
import {
  AdminSectionDashboard,
  AdminSectionOrders,
  AdminSectionGenres,
  AdminSectionUsers,
  AdminSectionWithdrawRequests,
  AdminSectionChat,
  AdminSectionProfile,
} from "./routesLazyExports";
import { RoleEnum } from "@/graphql/userGql";

export type PrivateAdminRouteType = RouteObject & {
  accessRoles: RoleEnum[];
};
/**
 * ADMIN
 */
export const privateAdminRoutes: PrivateAdminRouteType[] = [
  {
    path: "/admin/dashboard",
    element: <AdminSectionDashboard />,
    accessRoles: [RoleEnum.Admin],
  },
  {
    path: "/admin/orders/:orderId?",
    element: <AdminSectionOrders />,
    accessRoles: [RoleEnum.Admin],
  },
  {
    path: "/admin/genres/:genreId?",
    element: <AdminSectionGenres />,
    accessRoles: [RoleEnum.Admin],
  },
  {
    path: "/admin/users/:userId?",
    element: <AdminSectionUsers />,
    accessRoles: [RoleEnum.Admin],
  },
  {
    path: "/admin/withdraw-requests",
    element: <AdminSectionWithdrawRequests />,
    accessRoles: [RoleEnum.Admin],
  },
  // {
  //   path: "/admin/user-requests",
  //   element: <AdminSectionUserRequests />,
  //   accessRoles: [RoleEnum.Admin],
  // },
  {
    path: "/admin/chat/:userId?",
    element: <AdminSectionChat />,
    accessRoles: [RoleEnum.Admin],
  },
  {
    path: "/admin/profile",
    element: <AdminSectionProfile />,
    accessRoles: [RoleEnum.Admin],
  },
];
