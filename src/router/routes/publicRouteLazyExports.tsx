import { lazy } from "react";

export const UserLogin = lazy(() => import("@/views/auth/UserLogin"));
export const UserRegister = lazy(() => import("@/views/auth/UserRegister"));
export const AdminLogin = lazy(() => import("@/views/auth/AdminLogin"));
