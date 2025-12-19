import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from './provider/AuthProvider';
import { FiLogOut } from 'react-icons/fi';
import { toast } from 'react-toastify';
import logo from '../assets/logo.png';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    if (logout) {
      logout();
      navigate('/login');
      toast.success(t('logoutSuccess') || 'Logged out successfully!');
    }
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  const getLinkClass = ({ isActive }) =>
    isActive
      ? 'hover:text-[#0FA958] font-semibold underline underline-offset-4 transition-colors duration-200 text-[#0FA958]'
      : 'hover:text-[#0FA958] transition-colors duration-200';

  const publicLinks = (
    <>
      <li>
        <NavLink to="/" className={getLinkClass}>
          {t('home')}
        </NavLink>
      </li>
      <li>
        <NavLink to="/destination" className={getLinkClass}>
          {t('destinations')}
        </NavLink>
      </li>
      <li>
        <NavLink to="/package" className={getLinkClass}>
          {t('packages')}
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={getLinkClass}>
          {t('about')}
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" className={getLinkClass}>
          {t('contact')}
        </NavLink>
      </li>
    </>
  );

  const userLinks = (
    <>
      <li>
        <NavLink to="/dashboard" className={getLinkClass}>
          {t('dashboard')}
        </NavLink>
      </li>
    </>
  );

  const adminLinks = (
    <>
      <li>
        <NavLink to="/admin/dashboard" className={getLinkClass}>
          {t('adminDashboard')}
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto w-full px-4 flex items-center justify-between">
        <div className="navbar-start flex items-center gap-2">
          {/* Mobile Menu */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              ☰
            </label>
            <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-56">
              {publicLinks}
              {user && (user.role === 'admin' ? adminLinks : userLinks)}
              {user && (
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 flex gap-2"
                  >
                    <FiLogOut /> {t('logout')}
                  </button>
                </li>
              )}
            </ul>
          </div>

          <img src={logo} alt="logo" className="w-14 h-14" />
        </div>

        {/* ================= CENTER ================= */}
        <div className="hidden lg:flex navbar-center">
          <ul className="menu menu-horizontal space-x-2">{publicLinks}</ul>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="navbar-end flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex gap-1">
            <button
              onClick={() => changeLanguage('en')}
              className={`px-2 py-1 text-sm rounded ${
                i18n.language === 'en'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-200'
              }`}
            >
              EN
            </button>

            <button
              onClick={() => changeLanguage('bn')}
              className={`px-2 py-1 text-sm rounded ${
                i18n.language === 'bn'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-200'
              }`}
            >
              বাংলা
            </button>
          </div>

          {/* Auth Section */}
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="cursor-pointer">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="user"
                    className="w-10 h-10 rounded-full"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white">
                    {user?.displayName?.[0] || 'U'}
                  </div>
                )}
              </label>

              <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48">
                <li className="font-semibold px-2">{user.displayName}</li>
                {user?.role === 'admin' ? adminLinks : userLinks}
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 flex gap-2"
                  >
                    <FiLogOut /> {t('logout')}
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="btn bg-emerald-600 hover:bg-emerald-700 text-white px-5 rounded-full"
            >
              {t('login')}
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}
