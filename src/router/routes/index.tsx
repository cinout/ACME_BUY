import { privateRoutes } from "./privateRoutes";
import { RouteObject } from "react-router-dom";
import ProtectRoute from "./ProtectRoute";
import { Main } from "./routesLazyExports.ts";

export const getPrivateRoutes: RouteObject = {
  path: "/",
  element: <Main />, // The dashboard overall layout
  children: privateRoutes.map((route) => ({
    ...route,
    element: <ProtectRoute route={route}>{route.element}</ProtectRoute>,
  })),
};
