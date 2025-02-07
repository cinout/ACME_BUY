import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUser, updateUserRole } from "@/redux/reducers/authReducer";
import LoadingPage from "./LoadingPage";

function Content() {
  const [showSidebar, setShowSidebar] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative w-full bg-sky-100 min-h-screen overflow-y-auto ">
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
      <div className="absolute top-[calc(theme('spacing.header-height')+1rem+1.25rem)] left-4 xl:left-[calc(theme('spacing.dashbord-width')+1rem)] right-4 bottom-4 overflow-y-auto bg-sky-800 rounded-lg p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default function Main() {
  const { userHydrationDoneOnFirstRender } = useAppSelector(
    (state) => state.auth
  );

  const { pathname } = useLocation();

  if (["/admin", "/admin/"].includes(pathname)) {
    return <Navigate replace to="/admin/dashboard" />;
  }
  if (["/seller", "/seller/"].includes(pathname)) {
    return <Navigate replace to="/seller/dashboard" />;
  }
  // TODO: for customer?

  // TODO: why does this conditional rendering saves the ProtectRoute?
  return userHydrationDoneOnFirstRender ? <Content /> : <LoadingPage />;
}
