import { useEffect } from "react";
import Router from "@/router/Router.tsx";
import { publicRoutes } from "./router/routes/publicRoutes.tsx";
import {
  getPrivateAdminRoutes,
  getPrivateSellerRoutes,
} from "./router/routes/privateRoutes.tsx";
import { useAppDispatch } from "./redux/hooks.ts";
import { updateUserRole } from "./redux/reducers/authReducer.ts";

// TODO: this shows Invalid hook call error when you just signed in as admin and then flip back to previous pages using navigate???
export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateUserRole()); // update role locally
  }, [dispatch]);

  // TODO: what to do for customer routes?
  return (
    <Router
      allRoutes={[
        ...publicRoutes,
        getPrivateAdminRoutes,
        getPrivateSellerRoutes,
      ]}
    />
  );
}
