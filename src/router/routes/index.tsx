import Main from "@/views/admin/Main"; // TODO: lazy load it?
import { privateRoutes } from "./privateRoutes";
import { RouteObject } from "react-router-dom";

// TODO: why do I need this?
export const getPrivateRoutes: RouteObject = {
  path: "/",
  element: <Main />,
  children: privateRoutes,
};
