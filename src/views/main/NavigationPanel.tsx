import logo from "@/assets/images/company_logo.png";
import { Link, NavLink } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { useQuery } from "@apollo/client";
import { GQL_CATEGORIES_GET_ALL } from "@/graphql/categoryGql";
import { CategoryEntity } from "@/utils/entities";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// TODO:[3] make it reponsive to screen size
export default function NavigationPanel() {
  /**
   * State
   */
  const [showDropDown, setShowDropdown] = useState(false);

  /**
   * Ref
   */
  const categoryMenuRef = useRef<HTMLAnchorElement>(null);
  const categoryMenuDropdownRef = useRef<HTMLDivElement>(null);

  /**
   * GQL
   */
  const gqlCategoriesGetAll = useQuery(GQL_CATEGORIES_GET_ALL);
  const allCategories = gqlCategoriesGetAll.data
    ?.getAllCategories as CategoryEntity[];

  /**
   * Effect
   */
  useEffect(() => {
    function handleMouseAndDropdown(event: MouseEvent) {
      if (categoryMenuDropdownRef.current && categoryMenuRef.current) {
        // Get the element under the cursor
        const cursorPosition = document.elementFromPoint(
          event.clientX,
          event.clientY
        );

        setShowDropdown(
          categoryMenuDropdownRef.current?.contains(cursorPosition) ||
            categoryMenuRef.current?.contains(cursorPosition)
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
    <div>
      {/* First Row: Logo, Search, Login */}
      <div className="grid grid-cols-3 py-2 px-8 bg-aqua-forest-100 ">
        <Link to="/" className="justify-self-start self-center">
          <img src={logo} alt="Company Logo" className="h-10" />
        </Link>

        {/* TODO:[2] implement search function */}
        <div className="gap-x-4 justify-self-center self-center flex items-center">
          <input
            placeholder="find product..."
            name="search"
            type="text"
            className={
              "h-8 w-80 bg-aqua-forest-50 border-white border-2 box-content rounded-md px-4 text-aqua-forest-700 outline-none placeholder:font-light placeholder:italic"
            }
          />
          <button className="cursor-pointer text-2xl text-aqua-forest-700 hover:scale-110 transition">
            <IoIosSearch />
          </button>
        </div>

        {/* TODO:[3] implement login*/}
        <div className="justify-self-end self-center">Login</div>
      </div>

      {/* Categories  */}
      {/* TODO:[3] implement each category page */}
      {/* TODO:[3] only demonstrate a few popular options in navbar */}
      <div className="bg-aqua-forest-200 h-7 flex items-center relative">
        <AnimatePresence>
          {showDropDown && (
            <motion.div
              className="peer/dropdown absolute left-0 top-7 w-64 bg-aqua-forest-700 text-aqua-forest-100 shadow-lg"
              onMouseOver={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
              initial={{ opacity: 0, width: "12rem" }} // Start hidden & slightly above
              animate={{ opacity: 1, width: "16rem" }} // Fade in & slide down
              exit={{ opacity: 0, width: "12rem" }} // Fade out & slide up
              transition={{
                duration: 0.2,
              }}
              style={{
                transitionTimingFunction: "linear", // Exactly match framer motion
              }}
              ref={categoryMenuDropdownRef}
            >
              <div className="flex flex-col items-center">
                {allCategories?.map((category) => (
                  <NavLink
                    to={`/categories/${category.name.toLowerCase()}`}
                    key={category.id}
                    className={({ isActive }) =>
                      `w-full flex justify-center items-center hover:bg-aqua-forest-500 ${
                        isActive && "bg-aqua-forest-500 font-semibold h-"
                      }`
                    }
                    end
                  >
                    {category.name}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `hover:bg-aqua-forest-700 hover:text-aqua-forest-100 peer-hover/dropdown:bg-aqua-forest-700 peer-hover/dropdown:text-aqua-forest-100 transition-all duration-200 ease-linear h-full w-64 inline-flex justify-center items-center border-r border-aqua-forest-700 box-border ${
              isActive
                ? "text-aqua-forest-700 font-semibold"
                : "text-aqua-forest-600"
            }}`
          }
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setTimeout(() => setShowDropdown(false), 200)} // Small delay to allow hovering to dropdown
          end
          ref={categoryMenuRef}
        >
          All Categories
        </NavLink>

        {allCategories?.map((category) => (
          <NavLink
            to={`/categories/${category.name.toLowerCase()}`}
            key={category.id}
            className={({ isActive }) =>
              `hover:bg-aqua-forest-700 hover:text-aqua-forest-100 transition h-full w-28 inline-flex justify-center items-center border-aqua-forest-600 ${
                isActive
                  ? "text-aqua-forest-700 font-semibold"
                  : "text-aqua-forest-600"
              }`
            }
            end
          >
            {category.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
