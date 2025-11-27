import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from './provider/AuthProvider';
import { FiLogOut } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error('Logout Failed. Please try again.');
      console.error('Logout Error:', error);
    }
  };

  // Helper for NavLink active class
  const getLinkClass = ({ isActive }) =>
    isActive
      ? 'text-emerald-600 font-semibold'
      : 'hover:text-emerald-500 transition-colors duration-200';

  // Public links
  const publicLinks = (
    <>
      <li>
        <NavLink to="/" className={getLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/destination" className={getLinkClass}>
          Destinations
        </NavLink>
      </li>
      <li>
        <NavLink to="/package" className={getLinkClass}>
          Packages
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={getLinkClass}>
          About
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" className={getLinkClass}>
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink to="/addDestination" className={getLinkClass}>
          Add Destination
        </NavLink>
      </li>
    </>
  );

  // Logged-in user links
  const userLinks = (
    <>
      <li>
        <NavLink to="/dashboard" className={getLinkClass}>
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/bookings" className={getLinkClass}>
          My Bookings
        </NavLink>
      </li>
      <li>
        <NavLink to="/profile" className={getLinkClass}>
          Profile
        </NavLink>
      </li>
    </>
  );

  // Admin links
  const adminLinks = (
    <>
      <li>
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive
              ? 'text-red-600 font-semibold'
              : 'hover:text-red-500 transition-colors duration-200'
          }
        >
          Admin Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? 'text-red-600 font-semibold'
              : 'hover:text-red-500 transition-colors duration-200'
          }
        >
          Manage Users
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin/packages"
          className={({ isActive }) =>
            isActive
              ? 'text-red-600 font-semibold'
              : 'hover:text-red-500 transition-colors duration-200'
          }
        >
          Manage Packages
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4 sticky top-0 z-50">
      {/* Navbar Start */}
      <div className="navbar-start">
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
            {publicLinks}
            {user && (user?.role === 'admin' ? adminLinks : userLinks)}
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

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">{publicLinks}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img
                src={
                  user.photoURL ||
                  'https://img.daisyui.com/images/profile/demo/gordon@192.webp'
                }
                alt={user.displayName || 'User'}
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
              <li>{user && userLinks}</li>
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
