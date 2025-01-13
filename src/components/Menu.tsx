import { NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <div>
      <ol>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-cyan-400" : "text-purple-600"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about/20/John"
            className={({ isActive }) =>
              isActive ? "text-cyan-400" : "text-purple-600"
            }
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-cyan-400" : "text-purple-600"
            }
          >
            Contact
          </NavLink>
        </li>
      </ol>
    </div>
  );
}
