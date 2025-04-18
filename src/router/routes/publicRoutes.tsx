import { RouteObject } from "react-router-dom"; // for typing
import {
  UserLogin,
  UserSignup,
  HomePage,
  UnauthorizedPage,
  UnfoundPage,
  ProductPage,
  CollectionPage,
  ShopPage,
  CartPage,
} from "./routesLazyExports.ts";
import ShopFrontWrapper from "@/views/main/ShopFrontWrapper.tsx";

const publicRoutesInWrapper: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/product/:productId",
    element: <ProductPage />,
  },
  {
    path: "/collection",
    element: <CollectionPage />,
  },
  {
    path: "/shop/:shopId",
    element: <ShopPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
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

  /**
   * Sign Up & Log in
   */
  {
    path: "/login",
    element: <UserLogin />,
  },
  {
    path: "/signup",
    element: <UserSignup />,
  },

  /**
   * Other Pages
   */
  // Unauthorized Page
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
  {
    path: "*",
    element: <UnfoundPage />,
  },
];
