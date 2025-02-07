import { privateAdminRoutes } from "./privateAdminRoutes.tsx";
import { privateSellerRoutes } from "./privateSellerRoutes.tsx";
import { RouteObject } from "react-router-dom";
import ProtectRoute from "./ProtectRoute";
import { Main } from "./routesLazyExports.ts";

export const getPrivateAdminRoutes: RouteObject = {
  path: "/admin",
  element: <Main />, // The dashboard overall layout
  children: privateAdminRoutes.map((route) => ({
    ...route,
    element: <ProtectRoute route={route}>{route.element}</ProtectRoute>,
  })),
};

export const getPrivateSellerRoutes: RouteObject = {
  path: "/seller",
  element: <Main />, // The dashboard overall layout
  children: privateSellerRoutes.map((route) => ({
    ...route,
    element: <ProtectRoute route={route}>{route.element}</ProtectRoute>,
  })),
};

// TODO: what to do for customers?
