import { useAppSelector } from "@/redux/hooks";
import { RoleEnum, UserStatusEnum } from "@/utils/enums";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { PrivateAdminRouteType } from "./privateAdminRoutes";
import { PrivateUserRouteType } from "./privateUserRoutes";
import { useHookGetUserInfo } from "@/customHooks/useHookGetUserInfo";

interface ProtectPrivateRouteProps {
  children: ReactNode;
  route: PrivateAdminRouteType | PrivateUserRouteType;
}

// TODO: why is this component loaded three times?
export default function ProtectPrivateRoute({
  children,
  route,
}: ProtectPrivateRouteProps) {
  const { role } = useAppSelector((state) => state.auth);
  const userInfo = useHookGetUserInfo();

  if (role) {
    // role is available

    if (route.accessRoles.includes(role)) {
      // user role matches the route's accessRoles

      if (role === RoleEnum.User) {
        // for users

        const userStatus = userInfo?.status;

        if (userStatus) {
          // user info is successfully hydrated

          if (
            (route as PrivateUserRouteType).accessUserStatus?.includes(
              userStatus
            )
          ) {
            // this route is accessible based on the user's status
            return children;
          } else {
            // this route is INaccessible based on the user's status

            if (userStatus === UserStatusEnum.Pending) {
              // pending users
              return <Navigate to="/user/account-pending" replace />;
            } else if (userStatus === UserStatusEnum.Deactivated) {
              // deactivated users
              return <Navigate to="/user/account-deactivated" replace />;
            } else {
              // active users
              return <Navigate to="/user/dashboard" replace />;
            }
          }
        } else {
          // use status is unknown
          return <Navigate to="/login" replace />;
        }
      } else if (role === RoleEnum.Admin) {
        // for Admin
        return children;
      }
    } else {
      // user role does not match route's accessRoles
      return <Navigate to="/unauthorized" replace />;
    }
  } else {
    // user role is not specified
    return <Navigate to="/login" replace />;
  }
}
