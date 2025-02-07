import { RouteObject } from "react-router-dom"; // for typing
import {
  SellerLogin,
  SellerSignup,
  AdminLogin,
  Home,
  UnauthorizedPage,
} from "./routesLazyExports.ts";

export const publicRoutes: RouteObject[] = [
  // Home page
  {
    path: "/", // be redirected from here based on user role
    element: <Home />,
  },

  // TODO: add customer login/signup later

  // Seller (User)
  {
    path: "/login/seller",
    element: <SellerLogin />,
  },
  {
    path: "/signup/seller",
    element: <SellerSignup />,
  },

  // Admin
  {
    path: "/login/admin",
    element: <AdminLogin />,
  },

  // Unauthorized Page
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
  // TODO: we also need a page when the route user entered is not available
];
