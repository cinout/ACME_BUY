import logo from "@/assets/images/company_logo.png";
import logoCircleOnly from "@/assets/images/company_logo_circleonly.svg";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GenreEntity, GQL_GENRES_GET_ALL } from "@/graphql/genreGql";
import NavBarItem from "./NavBarItem";
import { useHookGetUserInfo } from "@/customHooks/useHookGetUserInfo";
import { useAppSelector } from "@/redux/hooks";
import { iconSearchMagnifier, iconShoppingCart } from "@/utils/icons";
import { motion, AnimatePresence } from "motion/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useHookQueryParams } from "@/customHooks/useHookQueryParams";
import {
  GradingEnum,
  MediaFormatEnum,
  ReleaseRegionEnum,
  ReleaseYearRangeEnum,
} from "@/graphql/productGql";
import { RoleEnum } from "@/graphql/userGql";

interface Props {
  isScrollUp: boolean;
}

const cssMenu = `block w-8 h-[0.12rem] bg-aqua-forest-600 transition duration-300`;

function SearchBar({
  setIsOpen,
}: {
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  /**
   * Routing
   */
  const navigate = useNavigate();

  /**
   * Hook
   */
  const { currentQuery } = useHookQueryParams();
  const [value, setValue] = useState(currentQuery || "");

  // when query in url is changed (either caused by user input or clicking on navigation bar items), update the search value
  useEffect(() => {
    setValue(currentQuery || "");
  }, [currentQuery]);

  return (
    <>
      <input
        placeholder="dig some tunes..."
        name="search"
        type="text"
        className={
          "h-8 w-48 tn:w-56 sm:w-64 bg-aqua-forest-50 border-aqua-forest-600 border-2 box-content rounded-md px-4 text-aqua-forest-700 outline-none placeholder:font-light placeholder:italic"
        }
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            void navigate(`/collection?query=${encodeURIComponent(value)}`);
            if (setIsOpen) {
              setIsOpen(false);
            }
          }
        }}
      />
      <Link
        className="cursor-pointer text-2xl text-aqua-forest-700  rounded-full p-2 hover:bg-aqua-forest-100 group  transition-all duration-300"
        to={`/collection?query=${encodeURIComponent(value)}`}
        onClick={() => {
          if (setIsOpen) {
            setIsOpen(false);
          }
        }}
      >
        {iconSearchMagnifier("group-hover:scale-110 transition duration-300")}
      </Link>
    </>
  );
}

export default function NavigationPanel({ isScrollUp }: Props) {
  /**
   * State
   */
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Hooks (User Info)
   */
  const { role } = useAppSelector((state) => state.auth);
  const userInfo = useHookGetUserInfo();

  /**
   * GQL
   */
  const gqlGenresGetAll = useQuery(GQL_GENRES_GET_ALL);
  const allGenres = gqlGenresGetAll.data?.getAllGenres as GenreEntity[];
  // Create a shallow copy and sort the copy
  const sortedGenres =
    allGenres && allGenres.length > 0
      ? allGenres.slice().sort((a, b) => a.name.localeCompare(b.name))
      : [];

  /**
   * Computed
   */
  const navbarOptions: {
    title: string;
    options: {
      id: string;
      name: string;
      url: string;
      // urlFragment: string;
    }[];
  }[] = [
    {
      title: "Genre",
      options: sortedGenres.map((a) => ({
        id: a.id,
        name: a.name,
        url: `/collection?genre=${encodeURIComponent(a.name)}`,
        // urlFragment: `genre=${encodeURIComponent(a.name)}`,
      })),
    },
    {
      title: "Format",
      options: Object.values(MediaFormatEnum).map((a) => ({
        id: a,
        name: a,
        url: `/collection?format=${encodeURIComponent(a)}`,
        // urlFragment: `format=${encodeURIComponent(a)}`,
      })),
    },
    {
      title: "Year",
      options: Object.values(ReleaseYearRangeEnum).map((a) => ({
        id: a,
        name: a,
        url: `/collection?year=${encodeURIComponent(a)}`,
        // urlFragment: `year=${encodeURIComponent(a)}`,
      })),
    },
    {
      title: "Grading",
      options: Object.values(GradingEnum).map((a) => ({
        id: a,
        name: a,
        url: `/collection?grading=${encodeURIComponent(a)}`,
        // urlFragment: `grading=${encodeURIComponent(a)}`,
      })),
    },
    {
      title: "Region",
      options: Object.values(ReleaseRegionEnum).map((a) => ({
        id: a,
        name: a,
        url: `/collection?region=${encodeURIComponent(a)}`,
        // urlFragment: `region=${encodeURIComponent(a)}`,
      })),
    },
  ];
  const numItemsInCart = userInfo?.cart?.reduce(
    (accumulator, item) => accumulator + item.quantity,
    0
  );

  return (
    <>
      <div
        className="font-arsenal-spaced-1 z-40 w-full fixed"
        data-testid="navigation-wrapper"
      >
        {/* First Row: Logo, Search, Login */}
        <div
          className={`relative grid grid-cols-[1fr_1fr] md:grid-cols-[2fr_2fr_1fr] lg:grid-cols-3 py-6 px-8 h-navbar-top-height`}
        >
          {/* Background */}
          <div
            className={`absolute top-0 left-0 h-full w-full -z-10 transition-all duration-500 backdrop-blur-md shadow-2xl md:shadow-none ${
              isScrollUp ? "bg-aqua-forest-200/80 md:shadow-2xl" : "bg-white/80"
            }`}
          />

          {/* Left */}
          <Link
            to="/"
            className="hidden tn:block justify-self-start self-center w-56"
          >
            <img src={logo} alt="Company Logo" className="h-10 aspect-auto" />
          </Link>
          <Link
            to="/"
            className="block tn:hidden justify-self-start self-center w-10"
          >
            <img
              src={logoCircleOnly}
              alt="Company Logo"
              className="h-10 aspect-auto"
            />
          </Link>

          {/* Middle: Search bar, only shown on >md screen */}
          <div className="hidden md:flex gap-x-4 justify-self-center items-center">
            <SearchBar />
          </div>

          {/* Right */}
          <div className="justify-self-end self-center flex items-center gap-x-8">
            {userInfo ? (
              <Link
                to={
                  role === RoleEnum.User
                    ? "/user/dashboard"
                    : "/admin/dashboard"
                }
                className="h-[2.5rem] w-[2.5rem]"
              >
                <img
                  src={userInfo?.imageUrl}
                  alt="user image"
                  className="h-full w-full border-2 border-aqua-forest-600/60 rounded-full hover:border-aqua-forest-600 hover:brightness-110 transition duration-200"
                />
              </Link>
            ) : (
              <Link to="/login" className="text-aqua-forest-800">
                Login
              </Link>
            )}

            {userInfo && (
              <Link className="relative flex items-center" to="/cart">
                <div className="text-[2rem]">{iconShoppingCart()}</div>
                {!!numItemsInCart && numItemsInCart > 0 && (
                  <div className="absolute -top-3 left-5 w-6 h-6 rounded-full bg-sky-700/90 text-sky-100 font-bold text-sm flex justify-center items-center">
                    {numItemsInCart > 10 ? "10+" : numItemsInCart}
                  </div>
                )}
              </Link>
            )}

            {/* Menu Icon < md screen */}
            <div className="block md:hidden justify-self-end self-center">
              <button
                className="relative w-8 h-6 flex flex-col items-center justify-between gap-2"
                onClick={() => setIsOpen(!isOpen)}
              >
                {/* Top Line */}
                <span
                  className={`${cssMenu} ${
                    isOpen ? "w-11 rotate-45 translate-y-[0.7rem]" : ""
                  }`}
                ></span>

                {/* Middle Line (disappears when open) */}
                <span
                  className={`${cssMenu} ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>

                {/* Bottom Line */}
                <span
                  className={`${cssMenu} ${
                    isOpen ? "w-11 -rotate-45 -translate-y-[0.7rem]" : ""
                  }`}
                ></span>
              </button>
            </div>
          </div>
        </div>

        {/* Second Row, >md screen  */}
        <AnimatePresence>
          {!isScrollUp && (
            <motion.div
              className="hidden md:flex items-center bg-aqua-forest-200 h-7"
              initial={{ translateY: "-1rem", opacity: 0 }}
              animate={{
                translateY: 0,
                opacity: 1,
                transition: { duration: 0.4, ease: "easeOut" },
              }}
              exit={{
                translateY: "-1rem",
                opacity: 0,
                transition: { duration: 0.4, ease: "easeIn" },
              }}
            >
              {navbarOptions.map((a) => (
                <NavBarItem
                  key={a.title}
                  title={a.title}
                  dropdownOptions={a.options}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* <md screen, dropdown items */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              // TODO:[1] why sticky top-0 left-0 renders the div right below the
              className="sticky md:hidden top-0 left-0 w-full h-[calc(100vh-theme('spacing.navbar-top-height'))] bg-white/80 backdrop-blur-md p-4 sm:p-8 overflow-x-hidden overflow-y-scroll"
              initial={{ translateY: "-2rem", opacity: 0 }}
              animate={{
                translateY: 0,
                opacity: 1,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              exit={{
                translateY: "-2rem",
                opacity: 0,
                transition: { duration: 0.3, ease: "easeIn" },
              }}
            >
              <div className="flex items-center justify-center w-full gap-x-4">
                <SearchBar setIsOpen={setIsOpen} />
              </div>

              <div className="flex flex-col mt-4 gap-y-2">
                {navbarOptions.map((a) => (
                  <NavBarItem
                    key={a.title}
                    title={a.title}
                    dropdownOptions={a.options}
                    setIsOpen={setIsOpen}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
