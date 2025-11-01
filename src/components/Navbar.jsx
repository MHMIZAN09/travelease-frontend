import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'text-emerald-600 font-semibold'
              : 'hover:text-emerald-500 transition-colors duration-200'
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/destination"
          className={({ isActive }) =>
            isActive
              ? 'text-emerald-600 font-semibold'
              : 'hover:text-emerald-500 transition-colors duration-200'
          }
        >
          Destinations
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/package"
          className={({ isActive }) =>
            isActive
              ? 'text-emerald-600 font-semibold'
              : 'hover:text-emerald-500 transition-colors duration-200'
          }
        >
          Packages
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? 'text-emerald-600 font-semibold'
              : 'hover:text-emerald-500 transition-colors duration-200'
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? 'text-emerald-600 font-semibold'
              : 'hover:text-emerald-500 transition-colors duration-200'
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4 sticky top-0 z-50">
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow-lg bg-base-100 rounded-box w-52 animate-fadeIn"
          >
            {links}
          </ul>
        </div>
        <NavLink
          to="/"
          className="btn btn-ghost normal-case text-2xl font-bold text-emerald-600"
        >
          TravelEase
        </NavLink>
      </div>

      {/* Center Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">{links}</ul>
      </div>

      {/* Login Button */}
      <div className="navbar-end">
        <NavLink
          to="/login"
          className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-none px-5 rounded-full transition-all duration-300"
        >
          Login
        </NavLink>
      </div>
    </div>
  );
}
