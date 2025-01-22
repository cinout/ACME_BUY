import { lazy } from "react";

export const UserLogin = lazy(() => import("@/views/auth/UserLogin"));
export const UserRegister = lazy(() => import("@/views/auth/UserRegister"));
export const AdminLogin = lazy(() => import("@/views/auth/AdminLogin"));
export const Home = lazy(() => import("@/views/Home"));
export const SectionDashboard = lazy(
  () => import("@/views/admin/SectionDashboard")
);
export const SectionOrders = lazy(() => import("@/views/admin/SectionOrders"));
export const SectionCategories = lazy(
  () => import("@/views/admin/SectionCategories")
);
export const SectionSellers = lazy(
  () => import("@/views/admin/SectionSellers")
);
export const SectionPaymentRequests = lazy(
  () => import("@/views/admin/SectionPaymentRequests")
);
export const SectionSellerRequests = lazy(
  () => import("@/views/admin/SectionSellerRequests")
);
export const SectionChat = lazy(() => import("@/views/admin/SectionChat"));
