import { lazy } from "react";

export const UserLogin = lazy(() => import("@/views/auth/UserLogin"));
export const UserRegister = lazy(() => import("@/views/auth/UserRegister"));
export const AdminLogin = lazy(() => import("@/views/auth/AdminLogin"));
export const Home = lazy(() => import("@/views/Home"));

/**
 * ADMIN
 */
export const AdminSectionDashboard = lazy(
  () => import("@/views/admin/SectionDashboard")
);
export const AdminSectionOrders = lazy(
  () => import("@/views/admin/SectionOrders")
);
export const AdminSectionCategories = lazy(
  () => import("@/views/admin/SectionCategories")
);
export const AdminSectionSellers = lazy(
  () => import("@/views/admin/SectionSellers")
);
export const AdminSectionWithdrawRequests = lazy(
  () => import("@/views/admin/SectionWithdrawRequests")
);
export const AdminSectionSellerRequests = lazy(
  () => import("@/views/admin/SectionSellerRequests")
);
export const AdminSectionChat = lazy(() => import("@/views/admin/SectionChat"));

/**
 * SELLER
 */
export const SellerSectionDashboard = lazy(
  () => import("@/views/seller/SectionDashboard")
);
export const SellerSectionProducts = lazy(
  () => import("@/views/seller/SectionProducts")
);
export const SellerSectionOrders = lazy(
  () => import("@/views/seller/SectionOrders")
);
export const SellerSectionPayments = lazy(
  () => import("@/views/seller/SectionPayments")
);
export const SellerSectionChatCustomer = lazy(
  () => import("@/views/seller/SectionChatCustomer")
);
export const SellerSectionSupport = lazy(
  () => import("@/views/seller/SectionSupport")
);
