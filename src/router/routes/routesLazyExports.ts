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
export const ProductPage = lazy(() => import("@/views/main/ProductPage"));
export const CollectionPage = lazy(() => import("@/views/main/CollectionPage"));
export const ShopPage = lazy(() => import("@/views/main/ShopPage"));
export const CartPage = lazy(() => import("@/views/main/CartPage"));

/**
 * Login & Signup
 */
export const UserLogin = lazy(() => import("@/views/auth/UserLogin"));
export const UserSignup = lazy(() => import("@/views/auth/UserSignup"));

/**
 * Error Pages
 */
export const UnauthorizedPage = lazy(
  () => import("@/views/auth/UnauthorizedPage")
);

/**
 * Private Pages
 */
export const Main = lazy(() => import("@/views/Main")); // The user/admin dashboard overall layout

/**
 * ADMIN Dashboard
 */
export const AdminSectionDashboard = lazy(
  () => import("@/views/admin/SectionDashboard")
);
export const AdminSectionOrders = lazy(
  () => import("@/views/admin/SectionOrders")
);
export const AdminSectionGenres = lazy(
  () => import("@/views/admin/SectionGenres")
);
export const AdminSectionUsers = lazy(
  () => import("@/views/admin/SectionUsers")
);
export const AdminSectionWithdrawRequests = lazy(
  () => import("@/views/admin/SectionWithdrawRequests")
);
// export const AdminSectionUserRequests = lazy(
//   () => import("@/views/admin/SectionUserRequests")
// );
export const AdminSectionChat = lazy(() => import("@/views/admin/SectionChat"));
export const AdminSectionProfile = lazy(
  () => import("@/views/admin/SectionProfile")
);

/**
 * USER Dashboard
 */
export const UserSectionDashboard = lazy(
  () => import("@/views/user/SectionDashboard")
);
export const UserSectionProducts = lazy(
  () => import("@/views/user/SectionProducts")
);
export const UserSectionOrders = lazy(
  () => import("@/views/user/SectionOrders")
);
export const UserSectionWishList = lazy(
  () => import("@/views/user/SectionWishList")
);
export const UserSectionPayments = lazy(
  () => import("@/views/user/SectionPayments")
);
export const UserSectionChatCustomer = lazy(
  () => import("@/views/user/SectionChatCustomer")
);
export const UserSectionSupport = lazy(
  () => import("@/views/user/SectionSupport")
);
export const UserSectionProfile = lazy(
  () => import("@/views/user/SectionProfile")
);
export const UserDeactivated = lazy(
  () => import("@/views/user/UserDeactivated")
);
export const UserPending = lazy(() => import("@/views/user/UserPending"));
export const OrderPage = lazy(() => import("@/views/main/OrderPage"));
export const OrderSuccessPage = lazy(
  () => import("@/views/main/OrderSuccessPage")
);
