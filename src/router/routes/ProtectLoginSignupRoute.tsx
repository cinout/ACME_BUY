import { useAppSelector } from "@/redux/hooks";
import { RoleEnum } from "@/utils/enums";
import LoadingPage from "@/views/LoadingPage";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectLoginSignupRouteProps {
  children: ReactNode;
  routeRole: RoleEnum;
}

// TODO: why is it loaded three times?
export default function ProtectLoginSignupRoute({
  children,
  routeRole,
}: ProtectLoginSignupRouteProps) {
  const { role, userRoleUpdatedOnFirstRender } = useAppSelector(
    (state) => state.auth
  );

  return userRoleUpdatedOnFirstRender ? (
    routeRole === role ? (
      <Navigate to={`/${role.toLowerCase()}/profile`} replace />
    ) : (
      children
    )
  ) : (
    <LoadingPage />
  );
}
