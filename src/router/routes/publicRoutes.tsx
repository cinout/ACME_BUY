import { RouteObject } from "react-router-dom"; // for typing
import {
  UserLogin,
  UserSignup,
  HomePage,
  UnauthorizedPage,
  ProductPage,
  CollectionPage,
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
  // TODO: we also need a page when the route user entered is not available
];
