import { lazy } from "react";

export const UserLogin = lazy(() => import("@/views/auth/UserLogin"));
export const UserRegister = lazy(() => import("@/views/auth/UserRegister"));
export const AdminLogin = lazy(() => import("@/views/auth/AdminLogin"));
export const Home = lazy(() => import("@/views/Home"));
export const AdminDashboard = lazy(
  () => import("@/views/admin/Dashboard/AdminDashboard")
);
export const Orders = lazy(() => import("@/views/admin/Order/Orders"));
