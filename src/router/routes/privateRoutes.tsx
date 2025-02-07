import { privateAdminRoutes } from "./privateAdminRoutes.tsx";
import { privateSellerRoutes } from "./privateSellerRoutes.tsx";
import { RouteObject } from "react-router-dom";
import ProtectPrivateRoute from "./ProtectPrivateRoute.tsx";
import { Main } from "./routesLazyExports.ts";

export const getPrivateAdminRoutes: RouteObject = {
  path: "/admin",
  element: <Main />, // The dashboard overall layout
  children: privateAdminRoutes.map((route) => ({
    ...route,
    element: (
      <ProtectPrivateRoute route={route}>{route.element}</ProtectPrivateRoute>
    ),
  })),
};

export const getPrivateSellerRoutes: RouteObject = {
  path: "/seller",
  element: <Main />, // The dashboard overall layout
  children: privateSellerRoutes.map((route) => ({
    ...route,
    element: (
      <ProtectPrivateRoute route={route}>{route.element}</ProtectPrivateRoute>
    ),
  })),
};

// TODO: what to do for customers?
