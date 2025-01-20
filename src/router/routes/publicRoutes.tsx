import { RouteObject } from "react-router-dom"; // for typing
import { UserLogin, UserRegister, AdminLogin } from "./routesLazyExports.ts";

export const publicRoutes: RouteObject[] = [
  // Customer (User)
  {
    path: "/login",
    element: <UserLogin />,
  },
  {
    path: "/register",
    element: <UserRegister />,
  },

  // Admin
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
];
