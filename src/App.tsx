import { useEffect } from "react";
import Router from "@/router/Router.tsx";
import { publicRoutes } from "./router/routes/publicRoutes.tsx";
import {
  getPrivateAdminRoutes,
  getPrivateSellerRoutes,
} from "./router/routes/privateRoutes.tsx";
import { useAppDispatch } from "./redux/hooks.ts";
import { getUser, updateUserRole } from "./redux/reducers/authReducer.ts";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // update role locally
    dispatch(updateUserRole());

    // fetch detailed user info from server
    void dispatch(getUser());
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

  // return routes.length > 0 ? (
  //   <Router allRoutes={routes} /> // TODO: should I use RouterProvider, createBrowserRouter instead?
  // ) : (
  //   <LoadingPage /> // TODO: should I show loading page for 2 seconds? and fade into the other component?
  // );
}
