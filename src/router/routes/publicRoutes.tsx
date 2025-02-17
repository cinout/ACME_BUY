import { RouteObject } from "react-router-dom"; // for typing
import {
  UserLogin,
  UserSignup,
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
  /**
   * NavBar
   */
  {
    path: "/genre/:genre?",
    element: <GenrePage />,
  },
  // {
  //   path: "/format/:format?",
  //   element: <FormatPage />,
  // },

  /**
   * Footer
   */
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
