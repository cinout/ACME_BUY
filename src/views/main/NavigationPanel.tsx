import logo from "@/assets/images/company_logo.png";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { useQuery } from "@apollo/client";
import { GQL_GENRES_GET_ALL } from "@/graphql/genreGql";
import { GenreEntity } from "@/utils/entities";
import NavBarItem from "../shared_components/NavBarItem";
import {
  media_formats,
  quality_condition,
  release_region,
  release_year_range,
} from "@/utils/selectorOptions";
import { useHookGetUserInfo } from "@/customHooks/useHookGetUserInfo";
import { useAppSelector } from "@/redux/hooks";
import { RoleEnum } from "@/utils/enums";

// TODO:[3] make it reponsive to screen size
export default function NavigationPanel() {
  /**
   * Hooks (User Info)
   */
  const userInfo = useHookGetUserInfo();
  const { role } = useAppSelector((state) => state.auth);

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
    <div className="font-arsenal-spaced-1">
      {/* First Row: Logo, Search, Login */}
      <div className="grid grid-cols-[2fr_2fr_1fr] lg:grid-cols-3 py-6 px-8">
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
            <IoIosSearch />
          </button>
        </div>

        <div className="justify-self-end self-center">
          {userInfo ? (
            <Link
              to={
                role === RoleEnum.Seller
                  ? "/seller/dashboard"
                  : role === RoleEnum.Admin
                  ? "/admin/dashboard"
                  : "/customer/dashboard"
              }
            >
              <img
                src={userInfo?.imageUrl} // TODO: set default image in customer, seller, admin in backend when they signed up
                alt="user image"
                className="h-[2.5rem] w-[2.5rem border-2 border-aqua-forest-600/60 rounded-full hover:border-aqua-forest-600 hover:brightness-110 transition duration-200"
              />
            </Link>
          ) : (
            // TODO:[3] implement Log in
            <Link to="login/seller">Login</Link>
          )}
        </div>
      </div>

      {/* Genres  */}
      {/* TODO:[3] implement each page */}
      <div className="bg-aqua-forest-200 h-7 flex items-center">
        <NavBarItem
          title="Genre"
          dropdownOptions={sortedGenres.map((a) => ({
            id: a.id,
            name: a.name,
          }))}
        />

        <NavBarItem
          title="Format"
          dropdownOptions={media_formats.map((a) => ({
            id: a,
            name: a,
          }))}
        />

        <NavBarItem
          title="Year"
          dropdownOptions={release_year_range.map((a) => ({
            id: a,
            name: a,
          }))}
        />

        <NavBarItem
          title="Grading"
          dropdownOptions={quality_condition.map((a) => ({
            id: a,
            name: a,
          }))}
        />

        <NavBarItem
          title="Region"
          dropdownOptions={release_region.map((a) => ({
            id: a,
            name: a,
          }))}
        />
      </div>
    </div>
  );
}
