import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useRef, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import LoadingPage from "./LoadingPage";
import { useHookGetUserInfo } from "@/customHooks/useHookGetUserInfo";
import { RoleEnum } from "@/graphql/userGql";

function Content() {
  const [showSidebar, setShowSidebar] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative w-full bg-sky-100 min-h-screen overflow-y-auto">
      <Sidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        menuButtonRef={menuButtonRef}
      />
      <Header
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        menuButtonRef={menuButtonRef}
      />

      {/* Loading different sections' panels */}
      <div className="absolute top-header-height md:top-[calc(theme('spacing.header-height')+1rem+1.25rem)] left-0 md:left-4 xl:left-[calc(theme('spacing.dashbord-width')+1rem)] right-0 md:right-4 bottom-0 md:bottom-4 overflow-y-auto bg-sky-800 rounded-none md:rounded-lg p-2 md:p-4 font-lato">
        <Outlet />
      </div>
    </div>
  );
}

export default function Main() {
  const { role, updateUserRoleDoneOnFirstRender } = useAppSelector(
    (state) => state.auth
  );
  const userInfo = useHookGetUserInfo();

  const { pathname } = useLocation();

  // redirect to dashboard
  if (["/admin", "/admin/"].includes(pathname)) {
    return <Navigate replace to="/admin/dashboard" />;
  }
  if (["/user", "/user/"].includes(pathname)) {
    return <Navigate replace to="/user/dashboard" />;
  }

  // TODO: double-check this logicc (correct so far)
  const conditionForShowingContent =
    updateUserRoleDoneOnFirstRender &&
    (role && role === RoleEnum.User ? userInfo?.status : true);

  return conditionForShowingContent ? <Content /> : <LoadingPage />;
}
