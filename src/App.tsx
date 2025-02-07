import { useEffect, useState } from "react";
import Router from "@/router/Router.tsx";
import { publicRoutes } from "./router/routes/publicRoutes.tsx";
import {
  getPrivateAdminRoutes,
  getPrivateSellerRoutes,
} from "./router/routes/index.tsx";
import { useAppDispatch, useAppSelector } from "./redux/hooks.ts";
import { getUser, updateUserRole } from "./redux/reducers/authReducer.ts";
import { RouteObject } from "react-router-dom";
import LoadingPage from "./views/LoadingPage.tsx";

export default function App() {
  // const [routes, setRoutes] = useState<RouteObject[]>([]);
  const { role } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  // TODO: what to do for customer routes?

  useEffect(() => {
    // update role locally
    dispatch(updateUserRole());

    // fetch detailed user info from server
    void dispatch(getUser());

    // ------------------
    // TODO: check if this is called only on initial loading

    // const accessToken = localStorage.getItem("accessToken");
    // if (accessToken) {
    // .unwrap()
    // .then(() => {
    //   // load private routes (which requires to know your role)
    //   setRoutes([
    //     ...publicRoutes,
    //     getPrivateAdminRoutes,
    //     getPrivateSellerRoutes,
    //   ]);
    // })
    // .catch((e) => {
    //   // TODO: what if there is error getting user info? (probably redirect to a page asking to login as either seller/customer/admib)
    // });
    // }
    // TODO: user is currently locked in loading page if no access token is available
  }, [dispatch]);

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
