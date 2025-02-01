import { RouteObject } from "react-router-dom";
import {
  AdminSectionDashboard,
  AdminSectionOrders,
  AdminSectionCategories,
  AdminSectionSellers,
  AdminSectionWithdrawRequests,
  AdminSectionSellerRequests,
  AdminSectionChat,
  SellerSectionDashboard,
  SellerSectionChatCustomer,
  SellerSectionOrders,
  SellerSectionPayments,
  SellerSectionProducts,
  SellerSectionSupport,
  SellerDeactivated,
  SellerPending,
} from "./routesLazyExports";
import { RoleEnum, SellerStatusEnum } from "@/utils/enums";

// TODO: how to make each route only accessable to valid user?

export const privateRoutes: (RouteObject & {
  accessRoles: RoleEnum[];
  accessSellerStatus?: SellerStatusEnum[];
})[] = [
  /**
   * ADMIN
   */
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

  /**
   * SELLER
   */
  {
    path: "/seller/dashboard",
    element: <SellerSectionDashboard />,
    accessRoles: [RoleEnum.Seller],
    accessSellerStatus: [SellerStatusEnum.Active],
  },
  {
    path: "/seller/products/:productId?",
    element: <SellerSectionProducts />,
    accessRoles: [RoleEnum.Seller],
    accessSellerStatus: [SellerStatusEnum.Active],
  },
  {
    path: "/seller/orders/:orderId?",
    element: <SellerSectionOrders />,
    accessRoles: [RoleEnum.Seller],
    accessSellerStatus: [SellerStatusEnum.Active],
  },
  {
    path: "/seller/payments/:paymentId?",
    element: <SellerSectionPayments />,
    accessRoles: [RoleEnum.Seller],
    accessSellerStatus: [SellerStatusEnum.Active],
  },
  {
    path: "/seller/chat-customer/:customerId?",
    element: <SellerSectionChatCustomer />,
    accessRoles: [RoleEnum.Seller],
    accessSellerStatus: [SellerStatusEnum.Active],
  },
  {
    path: "/seller/support",
    element: <SellerSectionSupport />,
    accessRoles: [RoleEnum.Seller],
    accessSellerStatus: [
      SellerStatusEnum.Active,
      SellerStatusEnum.Deactivated,
      SellerStatusEnum.Pending,
    ],
  },
  {
    path: "/seller/account-pending",
    element: <SellerPending />,
    accessRoles: [RoleEnum.Seller],
    accessSellerStatus: [SellerStatusEnum.Pending],
  },
  {
    path: "/seller/account-deactivated",
    element: <SellerDeactivated />,
    accessRoles: [RoleEnum.Seller],
    accessSellerStatus: [SellerStatusEnum.Deactivated],
  },
];
