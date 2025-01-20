import { useState } from "react";
import Router from "@/router/Router.tsx";
import { publicRoutes } from "./router/routes/publicRoutes.tsx";
import { getPrivateRoutes } from "./router/routes/index.tsx";

export default function App() {
  const [allRoutes, setAllRoutes] = useState([
    ...publicRoutes,
    getPrivateRoutes, // TODO: is this correct?
  ]);

  return <Router allRoutes={allRoutes} />; // TODO: should I use RouterProvider, createBrowserRouter instead?
}
