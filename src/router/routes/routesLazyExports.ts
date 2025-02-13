import { lazy } from "react";

/**
 * TODO: do I need to wrap all lazy-load components with Suspense?
------------------------------
import { lazy, Suspense } from "react";
const Main = lazy(() => import("@/views/Main"));

const LazyMain = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Main />
  </Suspense>
);
------------------------------
*/

/**
 * Shop Front
 */
export const HomePage = lazy(() => import("@/views/main/HomePage"));
export const CategoryPage = lazy(() => import("@/views/main/CategoryPage"));
export const ContactPage = lazy(() => import("@/views/main/ContactPage"));

/**
 * Login & Signup
 */
export const SellerLogin = lazy(() => import("@/views/auth/SellerLogin"));
export const SellerSignup = lazy(() => import("@/views/auth/SellerSignup"));
export const AdminLogin = lazy(() => import("@/views/auth/AdminLogin"));

/**
 * Error Pages
 */
export const UnauthorizedPage = lazy(
  () => import("@/views/auth/UnauthorizedPage")
);

/**
 * Private Pages
 */
export const Main = lazy(() => import("@/views/Main")); // The seller/admin dashboard overall layout

/**
 * ADMIN Dashboard
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
// export const AdminSectionSellerRequests = lazy(
//   () => import("@/views/admin/SectionSellerRequests")
// );
export const AdminSectionChat = lazy(() => import("@/views/admin/SectionChat"));
export const AdminSectionProfile = lazy(
  () => import("@/views/admin/SectionProfile")
);

/**
 * SELLER Dashboard
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
export const SellerSectionProfile = lazy(
  () => import("@/views/seller/SectionProfile")
);
export const SellerDeactivated = lazy(
  () => import("@/views/seller/SellerDeactivated")
);
export const SellerPending = lazy(() => import("@/views/seller/SellerPending"));
