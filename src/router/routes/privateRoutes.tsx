import { RouteObject } from "react-router-dom";
import {
  AdminSectionDashboard,
  Home,
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
} from "./routesLazyExports";

// TODO: how to make each route only accessable to valid user?
export const privateRoutes: RouteObject[] = [
  /**
   * COMMON for ADMIN and SELLER
   */
  {
    path: "/", //TODO: what is this route for?
    element: <Home />,
  },
  /**
   * ADMIN
   */
  {
    path: "/admin/dashboard",
    element: <AdminSectionDashboard />,
  },
  {
    path: "/admin/orders/:orderId?",
    element: <AdminSectionOrders />,
  },
  {
    path: "/admin/categories/:categoryId?",
    element: <AdminSectionCategories />,
  },
  {
    path: "/admin/sellers/:sellerId?",
    element: <AdminSectionSellers />,
  },
  {
    path: "/admin/withdraw-requests",
    element: <AdminSectionWithdrawRequests />,
  },
  {
    path: "/admin/seller-requests",
    element: <AdminSectionSellerRequests />,
  },
  {
    path: "/admin/chat/:sellerId?",
    element: <AdminSectionChat />,
  },

  /**
   * SELLER
   */
  {
    path: "/seller/dashboard",
    element: <SellerSectionDashboard />,
  },
  {
    path: "/seller/products/:productId?",
    element: <SellerSectionProducts />,
  },
  {
    path: "/seller/orders/:orderId?",
    element: <SellerSectionOrders />,
  },
  {
    path: "/seller/payments/:paymentId?",
    element: <SellerSectionPayments />,
  },
  {
    path: "/seller/chat-customer/:customerId?",
    element: <SellerSectionChatCustomer />,
  },
  {
    path: "/seller/support",
    element: <SellerSectionSupport />,
  },
];
