import logo from "@/assets/images/company_logo.png";
import { Link, NavLink } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

export default function NavigationPanel() {
  // TODO:[3] make it reponsive to screen size
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
              "h-8 w-80 bg-aqua-forest-50 border-white border-2 box-content rounded-md px-4 text-aqua-forest-600 outline-none placeholder:font-light placeholder:italic"
            }
          />
          <button className="cursor-pointer text-2xl text-aqua-forest-600 hover:scale-110 transition">
            <IoIosSearch />
          </button>
        </div>

        {/* TODO:[3] implement login*/}
        <div className="justify-self-end self-center">Login</div>
      </div>

      {/* Categories  */}
      {/* TODO:[3] hydrate categoriess from backend */}
      <div className="flex bg-aqua-forest-200 px-8 py-[0.1rem]">
        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `hover:text-aqua-forest-500 hover:scale-105 transition ${
              isActive
                ? "text-aqua-forest-500 font-semibold"
                : "text-aqua-forest-400"
            }`
          }
          end
        >
          All Categories
        </NavLink>
      </div>
    </div>
  );
}
