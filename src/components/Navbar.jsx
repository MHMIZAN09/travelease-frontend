import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from './provider/AuthProvider';
import { FiLogOut } from 'react-icons/fi';
import { toast } from 'react-toastify';
import logo from '../assets/logo.png';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  console.log(user?.photoURL);
  const navigate = useNavigate();
  console.log(user);
  const handleLogout = () => {
    if (logout) {
      logout();
      navigate('/login');
      toast.success('Logged out successfully!');
    } else {
      toast.error('Logout function not available.');
    }
  };

  const getLinkClass = ({ isActive }) =>
    isActive
      ? 'hover:text-[#0FA958] font-semibold underline underline-offset-4 transition-colors duration-200 text-[#0FA958]'
      : 'hover:text-[#0FA958] transition-colors duration-200';

  // Public Links
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
    </>
  );

  // User Links
  const userLinks = (
    <>
      <li>
        <NavLink to="/dashboard" className={getLinkClass}>
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/my-bookings" className={getLinkClass}>
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

  // Admin Links
  const adminLinks = (
    <>
      <li>
        <NavLink to="/admin/dashboard" className={getLinkClass}>
          Admin Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin/manageUsers" className={getLinkClass}>
          Manage Users
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin/managePackages" className={getLinkClass}>
          Manage Packages
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin/manageDestinations" className={getLinkClass}>
          Manage Destinations
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin/createPackage" className={getLinkClass}>
          Create Package
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin/createDestinations" className={getLinkClass}>
          Create Destination
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto w-full px-4 flex items-center justify-between">
        {/* Navbar Start */}
        <div className="navbar-start flex items-center gap-2">
          {/* Mobile Menu */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
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
            <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              {publicLinks}
              {user && (user.role === 'admin' ? adminLinks : userLinks)}
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

          <img src={logo} alt="logo" className="w-14 h-14" />
        </div>

        {/* Navbar Center - Desktop */}
        <div className="hidden lg:flex navbar-center">
          <ul className="menu menu-horizontal px-1 space-x-2">{publicLinks}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="cursor-pointer flex items-center gap-2"
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-10 h-10 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center">
                    <span className="text-white font-bold">
                      {user?.displayName?.[0] || 'U'}
                    </span>
                  </div>
                )}
              </label>

              <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-44 mt-2">
                <li className="px-2 py-1 font-semibold text-gray-700">
                  {user.displayName || 'User'}
                </li>
                {user?.role === 'admin' ? adminLinks : userLinks}
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
              className="btn bg-emerald-600 hover:bg-emerald-700 text-white px-5 rounded-full"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}
