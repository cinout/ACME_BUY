import { RouteObject } from "react-router-dom"; // for typing
import { SellerLogin, SellerSignup, AdminLogin } from "./routesLazyExports.ts";

export const publicRoutes: RouteObject[] = [
  // Customer (User)
  {
    path: "/seller/login",
    element: <SellerLogin />,
  },
  {
    path: "/seller/signup",
    element: <SellerSignup />,
  },

  // Admin
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
];
