import { Outlet, useLocation } from "react-router-dom";
import NavigationPanel from "./NavigationPanel";
import Footer from "./Footer";
import { useEffect, useRef, useState } from "react";

export default function ShopFrontWrapper() {
  /**
   * Ref
   */
  const scrollRef = useRef<HTMLDivElement>(null);

  /**
   * State
   */
  const [isScrollUp, setIsScrollUp] = useState(false);

  /**
   * Routing
   */
  const location = useLocation(); // Get current URL location

  /**
   * Effect
   */
  // detects scrolling up or down
  useEffect(() => {
    let lastScroll = 0;

    const onScroll = () => {
      const thisScroll = scrollRef.current!.scrollTop;
      setIsScrollUp(thisScroll > lastScroll);
      lastScroll = thisScroll;
    };

    if (scrollRef.current) {
      lastScroll = scrollRef.current.scrollTop;
      window.addEventListener("scroll", onScroll, { capture: true });
    }

    return () =>
      window.removeEventListener("scroll", onScroll, { capture: true });
  }, []);

  // Scroll to top whenever the URL changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.pathname]); // Runs every time the route changes

  return (
    <div className="flex flex-col h-full overflow-scroll" ref={scrollRef}>
      <NavigationPanel isScrollUp={isScrollUp} />
      <div className="flex-1 p-2 sm:p-4 lg:p-8 mt-32">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
