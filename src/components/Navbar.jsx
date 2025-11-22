import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from './provider/AuthProvider'; // adjust path
import { FiLogOut } from 'react-icons/fi';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

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
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
            {user && (
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-500"
                >
                  <FiLogOut /> Logout
                </button>
              </li>
            )}
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

      {/* Right Side: User Avatar / Login */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="flex items-center gap-2 cursor-pointer"
            >
              {/* Use default avatar if photoURL is null */}
              <img
                src={user.photoURL || '/default-avatar.png'}
                alt={user.displayName || 'User Avatar'}
                className="w-10 h-10 rounded-full object-cover"
              />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-44 mt-2"
            >
              <li className="px-2 py-1 font-semibold text-gray-700">
                {user.displayName || 'User'}
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-500"
                >
                  <FiLogOut /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <NavLink
            to="/login"
            className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-none px-5 rounded-full transition-all duration-300"
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}
