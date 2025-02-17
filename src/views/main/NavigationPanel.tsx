import logo from "@/assets/images/company_logo.png";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GQL_GENRES_GET_ALL } from "@/graphql/genreGql";
import { GenreEntity } from "@/utils/entities";
import NavBarItem from "../shared_components/NavBarItem";
import { useHookGetUserInfo } from "@/customHooks/useHookGetUserInfo";
import { useAppSelector } from "@/redux/hooks";
import {
  GradingEnum,
  MediaFormatEnum,
  ReleaseRegionEnum,
  ReleaseYearRangeEnum,
  RoleEnum,
} from "@/utils/enums";
import { iconSearchMagnifier } from "@/utils/icons";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  isScrollUp: boolean;
}

const cssHeaderRowBg =
  "absolute top-0 left-0 h-full w-full -z-10 transition-all duration-500 backdrop-blur-md";

// TODO:[3] make it reponsive to screen size
// TODO:[2] show current steps (Home > Genre > Rock)
export default function NavigationPanel({ isScrollUp }: Props) {
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

  return (
    <div className="font-arsenal-spaced-1 z-50 w-full fixed">
      {/* First Row: Logo, Search, Login */}
      <div
        className={`relative grid grid-cols-[2fr_2fr_1fr] lg:grid-cols-3 py-6 px-8`}
      >
        {/* <div
          className={`bg-white/80 ${
            isScrollUp ? "opacity-0" : "opacity-100"
          } ${cssHeaderRowBg}`}
        />

        <div
          className={`bg-gradient-to-b from-aqua-forest-50/80 to-aqua-forest-200/80 shadow-2xl ${
            isScrollUp ? "opacity-100" : "opacity-0"
          } ${cssHeaderRowBg}`}
        /> */}

        <div
          className={`${cssHeaderRowBg} ${
            isScrollUp
              ? "bg-aqua-forest-200/80 shadow-2xl"
              : // ? "bg-gradient-to-b from-aqua-forest-50/80 to-aqua-forest-200/80 shadow-2xl"
                "bg-white/80"
          }`}
        />

        <Link to="/" className="justify-self-start self-center">
          <img src={logo} alt="Company Logo" className="h-10" />
        </Link>

        {/* TODO:[2] implement search function */}
        <div className="gap-x-4 justify-self-center self-center flex items-center">
          <input
            placeholder="dig some tunes..."
            name="search"
            type="text"
            className={
              "h-8 w-44 md:w-60 lg:w-80 bg-aqua-forest-50 border-aqua-forest-600 border-2 box-content rounded-md px-4 text-aqua-forest-700 outline-none placeholder:font-light placeholder:italic"
            }
          />
          <button className="cursor-pointer text-2xl text-aqua-forest-700 hover:scale-110 transition">
            {iconSearchMagnifier()}
          </button>
        </div>

        <div className="justify-self-end self-center">
          {userInfo ? (
            <Link
              to={
                role === RoleEnum.User ? "/user/dashboard" : "/admin/dashboard"
              }
            >
              <img
                src={userInfo?.imageUrl}
                alt="user image"
                className="h-[2.5rem] w-[2.5rem border-2 border-aqua-forest-600/60 rounded-full hover:border-aqua-forest-600 hover:brightness-110 transition duration-200"
              />
            </Link>
          ) : (
            // TODO:[3] implement Log in
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>

      {/* Second Row  */}
      {/* TODO:[3] implement each page */}
      {/* TODO:[1] hide when scroll up, show again when scroll down */}

      <AnimatePresence>
        {!isScrollUp && (
          <motion.div
            className="bg-aqua-forest-200 h-7 flex items-center"
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
            <NavBarItem
              title="Genre"
              dropdownOptions={sortedGenres.map((a) => ({
                id: a.id,
                name: a.name,
              }))}
            />

            <NavBarItem
              title="Format"
              dropdownOptions={Object.values(MediaFormatEnum).map((a) => ({
                id: a,
                name: a,
              }))}
            />

            <NavBarItem
              title="Year"
              dropdownOptions={Object.values(ReleaseYearRangeEnum).map((a) => ({
                id: a,
                name: a,
              }))}
            />

            <NavBarItem
              title="Grading"
              dropdownOptions={Object.values(GradingEnum).map((a) => ({
                id: a,
                name: a,
              }))}
            />

            <NavBarItem
              title="Region"
              dropdownOptions={Object.values(ReleaseRegionEnum).map((a) => ({
                id: a,
                name: a,
              }))}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
