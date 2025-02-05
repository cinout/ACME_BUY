import { useAppSelector } from "@/redux/hooks";
import { SellerEntity } from "@/utils/entities";
import { RoleEnum, SellerStatusEnum } from "@/utils/enums";
import { ReactNode } from "react";
import { Navigate, RouteObject } from "react-router-dom";

interface ProtectRouteProps {
  children: ReactNode;
  route: RouteObject & {
    accessRoles: RoleEnum[];
    accessSellerStatus?: SellerStatusEnum[];
  };
}

export default function ProtectRoute({ children, route }: ProtectRouteProps) {
  const { role, userInfo } = useAppSelector((state) => state.auth);

  if (role) {
    // role is available

    if (route.accessRoles.includes(role)) {
      // user role matches the route's accessRoles

      if (role === RoleEnum.Seller) {
        // for sellers
        const sellerStatus = (userInfo as SellerEntity).status;

        if (route.accessSellerStatus?.includes(sellerStatus)) {
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
        // for Admin
        return children;
      }

      // TODO: what about for Customer Role?
    } else {
      // user role does not match route's accessRoles
      return <Navigate to="/unauthorized" replace />;
    }
  } else {
    // user role is not specified
    return <Navigate to="/seller/login" replace />; // TODO:  we need a page to let user choose to log in as a seller or as an admin
  }
}
