import { AnimatePresence, motion } from "motion/react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

interface NavBarItemProps {
  dropdownOptions: {
    id: string;
    name: string;
    // urlFragment: string;
    url: string;
  }[];
  title: string;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

function ContentLargeScreen({ dropdownOptions, title }: NavBarItemProps) {
  /**
   * State
   */
  const [showDropDown, setShowDropdown] = useState(false);

  /**
   * Ref
   */
  const menuRef = useRef<HTMLDivElement>(null);
  const menuDropdownRef = useRef<HTMLDivElement>(null);

  /**
   * Routing
   */
  const searchParams = new URLSearchParams(location.search);

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
    <>
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
                  to={option.url}
                  key={option.id}
                  className={() =>
                    `w-full flex justify-center items-center hover:bg-aqua-forest-500 h-6 overflow-x-hidden whitespace-nowrap ${
                      searchParams.get(title.toLowerCase()) === option.name &&
                      "bg-aqua-forest-500 font-bold"
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

      <div
        className={`hover:bg-aqua-forest-700 hover:text-aqua-forest-100 transition-all duration-200 ease-linear h-full w-full inline-flex justify-center items-center peer-hover:bg-aqua-forest-700 peer-hover:text-aqua-forest-100 text-aqua-forest-600 cursor-pointer`}
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
        ref={menuRef}
      >
        {title}
      </div>
    </>
  );
}

function ContentSmallSreen({
  dropdownOptions,
  title,
  setIsOpen,
}: NavBarItemProps) {
  /**
   * Routing
   */
  const searchParams = new URLSearchParams(location.search);

  return (
    <div>
      <div
        className={`bg-aqua-forest-700 text-aqua-forest-100 w-full flex justify-center items-center`}
      >
        {title}
      </div>

      <div className={`w-full text-aqua-forest-700 flex gap-2 flex-wrap`}>
        {dropdownOptions?.map((option) => (
          <NavLink
            to={option.url}
            key={option.id}
            className={() =>
              `p-[0.1rem] ${
                searchParams.get(title.toLowerCase()) === option.name
                  ? "bg-aqua-forest-500 text-aqua-forest-50 font-bold"
                  : "text-aqua-forest-700"
              }`
            }
            end
            onClick={() => {
              if (setIsOpen) {
                setIsOpen(false);
              }
            }}
          >
            {option.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default function NavBarItem({
  dropdownOptions,
  title,
  setIsOpen,
}: NavBarItemProps) {
  // console.log("dropdownOptions", dropdownOptions);
  return (
    <>
      {/* >= md screen */}
      <div className="hidden md:block relative h-full w-44 md:w-52">
        <ContentLargeScreen dropdownOptions={dropdownOptions} title={title} />
      </div>

      {/* <md screen */}
      <div className="block md:hidden relative w-full">
        <ContentSmallSreen
          dropdownOptions={dropdownOptions}
          title={title}
          setIsOpen={setIsOpen}
        />
      </div>
    </>
  );
}
