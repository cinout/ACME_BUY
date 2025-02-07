import { RouteObject } from "react-router-dom";
import {
  AdminSectionDashboard,
  AdminSectionOrders,
  AdminSectionCategories,
  AdminSectionSellers,
  AdminSectionWithdrawRequests,
  AdminSectionSellerRequests,
  AdminSectionChat,
} from "./routesLazyExports";
import { RoleEnum } from "@/utils/enums";

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
    path: "/admin/categories/:categoryId?",
    element: <AdminSectionCategories />,
    accessRoles: [RoleEnum.Admin],
  },
  {
    path: "/admin/sellers/:sellerId?",
    element: <AdminSectionSellers />,
    accessRoles: [RoleEnum.Admin],
  },
  {
    path: "/admin/withdraw-requests",
    element: <AdminSectionWithdrawRequests />,
    accessRoles: [RoleEnum.Admin],
  },
  {
    path: "/admin/seller-requests",
    element: <AdminSectionSellerRequests />,
    accessRoles: [RoleEnum.Admin],
  },
  {
    path: "/admin/chat/:sellerId?",
    element: <AdminSectionChat />,
    accessRoles: [RoleEnum.Admin],
  },
];
