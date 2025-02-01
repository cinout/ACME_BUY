import { useAppSelector } from "@/redux/hooks";
import { RoleEnum } from "@/utils/enums";
import { Navigate } from "react-router-dom";

export default function Home() {
  const { role } = useAppSelector((state) => state.auth);

  switch (role) {
    case RoleEnum.Seller: {
      return <Navigate to="seller/dashboard" replace />;
    }
    case RoleEnum.Admin: {
      return <Navigate to="admin/dashboard" replace />;
    }
    default: {
      return <Navigate to="seller/login" replace />; // TODO: is this correct?
    }
  }
}
