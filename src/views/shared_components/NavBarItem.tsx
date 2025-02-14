import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

interface NavBarItemProps {
  dropdownOptions: { id: string; name: string }[];
  title: string;
}
export default function NavBarItem({
  dropdownOptions,
  title,
}: NavBarItemProps) {
  /**
   * State
   */
  const [showDropDown, setShowDropdown] = useState(false);

  /**
   * Ref
   */
  const menuRef = useRef<HTMLAnchorElement>(null);
  const menuDropdownRef = useRef<HTMLDivElement>(null);

  /**
   * Effect
   */
  useEffect(() => {
    function handleMouseAndDropdown(event: MouseEvent) {
      if (menuDropdownRef.current && menuRef.current) {
        // Get the element under the cursor
        const cursorPosition = document.elementFromPoint(
          event.clientX,
          event.clientY
        );

        setShowDropdown(
          menuDropdownRef.current?.contains(cursorPosition) ||
            menuRef.current?.contains(cursorPosition)
        );
      }
    }

    // Add event listener
    document.addEventListener("mousemove", handleMouseAndDropdown);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousemove", handleMouseAndDropdown);
    };
  }, []);

  return (
    <div className="relative h-full w-44 md:w-52">
      <AnimatePresence>
        {showDropDown && (
          <motion.div
            className={`peer absolute left-0 top-7 w-full bg-aqua-forest-700 text-aqua-forest-100 shadow-lg`}
            onMouseOver={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            initial={{ opacity: 0, width: "40%" }} // Start hidden & slightly above
            animate={{ opacity: 1, width: "100%" }} // Fade in & slide down
            exit={{ opacity: 0, width: "40%" }} // Fade out & slide up
            transition={{
              duration: 0.2,
            }}
            style={{
              transitionTimingFunction: "linear", // Exactly match framer motion
            }}
            ref={menuDropdownRef}
          >
            <div className="flex flex-col items-center">
              {dropdownOptions?.map((option) => (
                <NavLink
                  to={`/${title.toLowerCase()}/${option.name.toLowerCase()}`}
                  key={option.id}
                  className={({ isActive }) =>
                    `w-full flex justify-center items-center hover:bg-aqua-forest-500 h-6 overflow-x-hidden whitespace-nowrap ${
                      isActive && "bg-aqua-forest-500 font-bold"
                    }`
                  }
                  end
                >
                  {option.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <NavLink
        to={`/${title.toLowerCase()}`}
        className={({ isActive }) =>
          `hover:bg-aqua-forest-700 hover:text-aqua-forest-100 transition-all duration-200 ease-linear h-full w-full inline-flex justify-center items-center peer-hover:bg-aqua-forest-700 peer-hover:text-aqua-forest-100 ${
            isActive ? "text-aqua-forest-700 font-bold" : "text-aqua-forest-600"
          }}`
        }
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
        end
        ref={menuRef}
      >
        {title}
      </NavLink>
    </div>
  );
}
