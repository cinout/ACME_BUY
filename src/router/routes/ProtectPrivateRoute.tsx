import { useAppSelector } from "@/redux/hooks";
import { SellerEntity } from "@/utils/entities";
import { RoleEnum, SellerStatusEnum } from "@/utils/enums";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { PrivateAdminRouteType } from "./privateAdminRoutes";
import { PrivateSellerRouteType } from "./privateSellerRoutes";

interface ProtectPrivateRouteProps {
  children: ReactNode;
  route: PrivateAdminRouteType | PrivateSellerRouteType;
}

// TODO: why is this component loaded three times?
export default function ProtectPrivateRoute({
  children,
  route,
}: ProtectPrivateRouteProps) {
  const { role, userInfo } = useAppSelector((state) => state.auth);

  if (role) {
    // role is available

    if (route.accessRoles.includes(role)) {
      // user role matches the route's accessRoles

      if (role === RoleEnum.Seller) {
        // for sellers

        if (userInfo) {
          // user info is successfully hydrated
          const sellerStatus = (userInfo as SellerEntity).status;

          if (
            (route as PrivateSellerRouteType).accessSellerStatus?.includes(
              sellerStatus
            )
          ) {
            // this route is accessible based on the seller's status
            return children;
          } else {
            // this route is INaccessible based on the seller's status

            if (sellerStatus === SellerStatusEnum.Pending) {
              // pending sellers
              return <Navigate to="/seller/account-pending" replace />;
            } else if (sellerStatus === SellerStatusEnum.Deactivated) {
              // deactivated sellers
              return <Navigate to="/seller/account-deactivated" replace />;
            } else {
              // active sellers
              return <Navigate to="/seller/dashboard" replace />;
            }
          }
        } else {
          // no userInfo
          return <Navigate to="/login/seller" replace />;
        }
      } else {
        // for Admin

        if (userInfo) {
          return children;
        } else {
          return <Navigate to="/login/admin" replace />;
        }
      }

      // TODO: what about for Customer Role?
    } else {
      // user role does not match route's accessRoles
      return <Navigate to="/unauthorized" replace />;
    }
  } else {
    // user role is not specified

    if (route.path?.startsWith("/admin")) {
      return <Navigate to="/login/admin" replace />;
    } else if (route.path?.startsWith("/seller")) {
      return <Navigate to="/login/seller" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
    // TODO: implement customer as well
  }
}
