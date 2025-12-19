import { Outlet, NavLink } from 'react-router-dom';
import { FaUser, FaSuitcaseRolling, FaCreditCard } from 'react-icons/fa';

export default function UserDashboardLayout() {
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
        <h2 className="text-2xl font-bold text-blue-600 mb-8">TravelEase</h2>

        <nav className="space-y-4">
          <NavLink to="." end className={linkClass}>
            <FaUser /> Dashboard
          </NavLink>
          <NavLink to="profile" className={linkClass}>
            <FaUser /> Profile
          </NavLink>

          <NavLink to="my-bookings" className={linkClass}>
            <FaSuitcaseRolling /> My Bookings
          </NavLink>

          <NavLink to="payments" className={linkClass}>
            <FaCreditCard /> Payments
          </NavLink>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
}
