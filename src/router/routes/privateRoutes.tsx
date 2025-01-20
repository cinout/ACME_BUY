import { RouteObject } from "react-router-dom";
import { AdminDashboard, Home, Orders } from "./routesLazyExports";

// TODO: whena are these used?
export const privateRoutes: RouteObject[] = [
  {
    path: "/", //TODO: why just / ?
    element: <Home />,
    // access: ["admin", "seller"], //TODO: add later
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
    // access: ["admin"], TODO: add later
  },
  {
    path: "/admin/dashboard/orders",
    element: <Orders />,
    // access: ["admin"], TODO: add later
  },
];
