import { RouteObject } from "react-router-dom";
import {
  SectionDashboard,
  Home,
  SectionOrders,
  SectionCategories,
  SectionSellers,
  SectionWithdrawRequests,
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
    path: "/admin/orders",
    element: <SectionOrders />,
    // access: ["admin"], TODO: add later
  },
  {
    path: "/admin/categories",
    element: <SectionCategories />,
    // access: ["admin"], TODO: add later
  },
  {
    path: "/admin/sellers/:sellerId?",
    element: <SectionSellers />,
    // access: ["admin"], TODO: add later
  },
  {
    path: "/admin/withdraw-requests",
    element: <SectionWithdrawRequests />,
    // access: ["admin"], TODO: add later
  },
  {
    path: "/admin/seller-requests",
    element: <SectionSellerRequests />,
    // access: ["admin"], TODO: add later
  },
  {
    path: "/admin/chat",
    element: <SectionChat />,
    // access: ["admin"], TODO: add later
  },
];
