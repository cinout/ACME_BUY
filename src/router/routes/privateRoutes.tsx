import { privateAdminRoutes } from "./privateAdminRoutes.tsx";
import { privateUserRoutes } from "./privateUserRoutes.tsx";
import { RouteObject } from "react-router-dom";
import ProtectPrivateRoute from "./ProtectPrivateRoute.tsx";
import { Main, OrderPage, OrderSuccessPage } from "./routesLazyExports.ts";

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

export const getPrivateUserRoutes: RouteObject = {
  path: "/user",
  element: <Main />, // The dashboard overall layout
  children: privateUserRoutes.map((route) => ({
    ...route,
    element: (
      <ProtectPrivateRoute route={route}>{route.element}</ProtectPrivateRoute>
    ),
  })),
};

export const getOrderRoute = {
  path: "/order/:orderId",
  element: <OrderPage />,
};
export const getOrderSuccessRoute = {
  path: "/orderSuccess/:orderId",
  element: <OrderSuccessPage />,
};
