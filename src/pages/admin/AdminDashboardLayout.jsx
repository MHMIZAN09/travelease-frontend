import { Outlet, NavLink } from 'react-router-dom';
import {
  FaUsers,
  FaSuitcaseRolling,
  FaCreditCard,
  FaHome,
  FaBoxOpen,
  FaMapMarkedAlt,
  FaUser,
} from 'react-icons/fa';

export default function AdminDashboardLayout() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 p-2 rounded-md ${
      isActive
        ? 'bg-blue-100 text-blue-600 font-semibold'
        : 'text-gray-700 hover:text-blue-600'
    }`;

  return (
    <div className="min-h-screen bg-gray-100 flex rounded-2xl">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 hidden md:block rounded-l-2xl">
        <h2 className="text-2xl font-bold text-blue-600 mb-8">
          TravelEase Admin
        </h2>

        <nav className="space-y-4">
          <NavLink to="/admin/dashboard" className={linkClass}>
            <FaHome /> Dashboard
          </NavLink>
          <NavLink to="admin/profile" className={linkClass}>
            <FaUser /> Profile
          </NavLink>

          <NavLink to="/admin/manageUsers" className={linkClass}>
            <FaUsers /> Users
          </NavLink>

          <NavLink to="/admin/managePackages" className={linkClass}>
            <FaBoxOpen /> Packages
          </NavLink>

          <NavLink to="/admin/createPackage" className={linkClass}>
            <FaBoxOpen /> Create Package
          </NavLink>

          <NavLink to="/admin/manageDestinations" className={linkClass}>
            <FaMapMarkedAlt /> Destinations
          </NavLink>

          <NavLink to="/admin/createDestination" className={linkClass}>
            <FaMapMarkedAlt /> Create Destination
          </NavLink>

          <NavLink to="/admin/bookings" className={linkClass}>
            <FaSuitcaseRolling /> Bookings
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
}
