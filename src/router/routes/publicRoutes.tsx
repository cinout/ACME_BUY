import { RouteObject } from "react-router-dom"; // for typing
import {
  SellerLogin,
  SellerSignup,
  AdminLogin,
  Home,
  UnauthorizedPage,
} from "./routesLazyExports.ts";

export const publicRoutes: RouteObject[] = [
  {
    path: "/", // be redirected from here based on user role
    element: <Home />,
  },

  // Seller (User)
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

  // Unauthorized Page
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
  // TODO: we also need a page when the route user entered is not available
];
