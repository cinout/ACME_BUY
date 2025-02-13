import { Outlet } from "react-router-dom";
import NavigationPanel from "./NavigationPanel";
import Footer from "./Footer";

export default function ShopFrontWrapper() {
  return (
    <div className="flex flex-col min-h-full">
      <NavigationPanel />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
