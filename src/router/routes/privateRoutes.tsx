import { RouteObject } from "react-router-dom";
import {
  SectionDashboard,
  Home,
  SectionOrders,
  SectionCategories,
  SectionSellers,
  SectionPaymentRequests,
  SectionSellerRequests,
  SectionChat,
} from "./routesLazyExports";

// TODO: whena are these used?
export const privateRoutes: RouteObject[] = [
  {
    path: "/", //TODO: why just / ?
    element: <Home />,
    // access: ["admin", "seller"], //TODO: add later
  },
  {
    path: "/admin/dashboard",
    element: <SectionDashboard />,
    // access: ["admin"], TODO: add later
  },
  {
    path: "/admin/dashboard/orders",
    element: <SectionOrders />,
    // access: ["admin"], TODO: add later
  },
  {
    path: "/admin/dashboard/categories",
    element: <SectionCategories />,
    // access: ["admin"], TODO: add later
  },
  {
    path: "/admin/dashboard/sellers/:sellerId?",
    element: <SectionSellers />,
    // access: ["admin"], TODO: add later
  },
  {
    path: "/admin/dashboard/payment-requests",
    element: <SectionPaymentRequests />,
    // access: ["admin"], TODO: add later
  },
  {
    path: "/admin/dashboard/seller-requests",
    element: <SectionSellerRequests />,
    // access: ["admin"], TODO: add later
  },
  {
    path: "/admin/dashboard/chat",
    element: <SectionChat />,
    // access: ["admin"], TODO: add later
  },
];
