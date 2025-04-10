import LoadingPage from "@/views/LoadingPage";
import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { RouteObject } from "react-router-dom"; // for typing

interface RouterProps {
  allRoutes: RouteObject[];
}

export default function Router({ allRoutes }: RouterProps) {
  const routes = useRoutes([...allRoutes]);
  return <Suspense fallback={<LoadingPage />}> {routes}</Suspense>;
}
