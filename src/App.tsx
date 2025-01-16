import { useState } from "react";
import Router from "@/router/Router.tsx";
import { publicRoutes } from "./router/routes/publicRoutes.tsx";

export default function App() {
  const [allRoutes, setAllRoutes] = useState(publicRoutes);
  return <Router allRoutes={allRoutes} />;
}
