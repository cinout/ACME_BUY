import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useRef, useState } from "react";

// TODO: whose layout is this for? For Dashboard?
export default function Main() {
  const [showDashboard, setShowDashboard] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative w-full bg-sky-100 min-h-screen overflow-y-auto ">
      <Sidebar
        showDashboard={showDashboard}
        setShowDashboard={setShowDashboard}
        menuButtonRef={menuButtonRef}
      />
      <Header
        showDashboard={showDashboard}
        setShowDashboard={setShowDashboard}
        menuButtonRef={menuButtonRef}
      />
      <div className="absolute top-[calc(theme('spacing.header-height')+1rem+1.25rem)] left-4 lg:left-[calc(theme('spacing.dashbord-width')+1rem)] right-4 bottom-4 overflow-y-auto bg-sky-800 rounded-lg p-4">
        <Outlet />
      </div>
    </div>
  );
}
