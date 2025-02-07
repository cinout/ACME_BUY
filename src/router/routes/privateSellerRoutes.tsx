import { RouteObject } from "react-router-dom";
import {
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
export type PrivateSellerRouteType = RouteObject & {
  accessRoles: RoleEnum[];
  accessSellerStatus: SellerStatusEnum[];
};

/**
 * SELLER
 */
export const privateSellerRoutes: PrivateSellerRouteType[] = [
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
