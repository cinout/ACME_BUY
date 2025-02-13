import { RouteObject } from "react-router-dom"; // for typing
import {
  SellerLogin,
  SellerSignup,
  AdminLogin,
  HomePage,
  UnauthorizedPage,
  GenrePage,
  ContactPage,
} from "./routesLazyExports.ts";
import ShopFrontWrapper from "@/views/main/ShopFrontWrapper.tsx";

const publicRoutesInWrapper: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/genres/:genre?",
    element: <GenrePage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
];

export const publicRoutes: RouteObject[] = [
  /**
   * Home Page
   */
  {
    path: "/",
    element: <ShopFrontWrapper />,
    children: publicRoutesInWrapper,
  },

  // TODO: add customer login/signup later
  /**
   * Sign Up & Log in
   */
  // Seller
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
  // TODO: where should admin sign up?

  /**
   * Other Pages
   */
  // Unauthorized Page
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
  // TODO: we also need a page when the route user entered is not available
];
