import { useEffect, useState } from "react";
import Router from "@/router/Router.tsx";
import { publicRoutes } from "./router/routes/publicRoutes.tsx";
import { getPrivateRoutes } from "./router/routes/index.tsx";
import { useAppDispatch } from "./redux/hooks.ts";
import { get_user, updateUserRole } from "./redux/reducers/authReducer.ts";
import { RouteObject } from "react-router-dom";
import LoadingPage from "./views/LoadingPage.tsx";

export default function App() {
  // const [allRoutes, setAllRoutes] = useState(publicRoutes);
  const [routes, setRoutes] = useState<RouteObject[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // TODO: check if this is called only on initial loading
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // update role locally
      dispatch(updateUserRole());

      // fetch detailed user info from server
      dispatch(get_user())
        .unwrap()
        .then(() => {
          // load private routes (which requires to know your role)
          setRoutes([...publicRoutes, getPrivateRoutes]);
        })
        .catch((e) => {
          // TODO: what is there is error getting user info?
        });
    }
  }, [dispatch]);

  return routes.length > 0 ? (
    <Router allRoutes={routes} /> // TODO: should I use RouterProvider, createBrowserRouter instead?
  ) : (
    <LoadingPage /> // TODO: should I show loading page for 2 seconds? and fade into the other component?
  );
}
