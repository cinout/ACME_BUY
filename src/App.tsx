import { useEffect } from "react";
import Router from "@/router/Router.tsx";
import { publicRoutes } from "./router/routes/publicRoutes.tsx";
import {
  getOrderRoute,
  getOrderSuccessRoute,
  getPrivateAdminRoutes,
  getPrivateUserRoutes,
} from "./router/routes/privateRoutes.tsx";
import { useAppDispatch } from "./redux/hooks.ts";
import { updateUserRole } from "./redux/reducers/authReducer.ts";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateUserRole()); // update role locally
  }, [dispatch]);

  return (
    <Router
      allRoutes={[
        ...publicRoutes,
        getPrivateAdminRoutes,
        getPrivateUserRoutes,
        getOrderRoute,
        getOrderSuccessRoute,
      ]}
    />
  );
}
