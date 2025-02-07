import { RouteObject } from "react-router-dom"; // for typing
import {
  SellerLogin,
  SellerSignup,
  AdminLogin,
  Home,
  UnauthorizedPage,
} from "./routesLazyExports.ts";
import ProtectLoginSignupRoute from "./ProtectLoginSignupRoute.tsx";
import { RoleEnum } from "@/utils/enums.ts";

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
    element: (
      <ProtectLoginSignupRoute routeRole={RoleEnum.Seller}>
        <SellerLogin />
      </ProtectLoginSignupRoute>
    ),
  },
  {
    path: "/signup/seller",
    element: (
      <ProtectLoginSignupRoute routeRole={RoleEnum.Seller}>
        <SellerSignup />
      </ProtectLoginSignupRoute>
    ),
  },

  // Admin
  {
    path: "/login/admin",
    element: (
      <ProtectLoginSignupRoute routeRole={RoleEnum.Admin}>
        <AdminLogin />
      </ProtectLoginSignupRoute>
    ),
  },

  // Unauthorized Page
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
  // TODO: we also need a page when the route user entered is not available
];
