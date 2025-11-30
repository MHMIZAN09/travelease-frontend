import React from 'react';
import {
  FaUsers,
  FaSuitcaseRolling,
  FaMapMarkedAlt,
  FaHotel,
} from 'react-icons/fa';
import { FiLogOut, FiSettings } from 'react-icons/fi';

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 text-2xl font-bold text-emerald-600">
          TravelEase Admin
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <a
            href="/admin/dashboard"
            className="flex items-center p-2 rounded hover:bg-emerald-100"
          >
            <FaUsers className="mr-2" /> Users
          </a>
          <a
            href="/admin/packages"
            className="flex items-center p-2 rounded hover:bg-emerald-100"
          >
            <FaSuitcaseRolling className="mr-2" /> Packages
          </a>
          <a
            href="/admin/destinations"
            className="flex items-center p-2 rounded hover:bg-emerald-100"
          >
            <FaMapMarkedAlt className="mr-2" /> Destinations
          </a>
          <a
            href="/admin/bookings"
            className="flex items-center p-2 rounded hover:bg-emerald-100"
          >
            <FaHotel className="mr-2" /> Bookings
          </a>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center w-full text-red-600 hover:text-red-800">
            <FiLogOut className="mr-2" /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button className="btn btn-outline btn-sm flex items-center gap-2">
            <FiSettings /> Settings
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-sm text-gray-500">Total Users</h2>
            <p className="text-2xl font-bold">1,234</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-sm text-gray-500">Packages</h2>
            <p className="text-2xl font-bold">56</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-sm text-gray-500">Destinations</h2>
            <p className="text-2xl font-bold">34</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-sm text-gray-500">Bookings</h2>
            <p className="text-2xl font-bold">789</p>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
          <table className="table-auto w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-left">Package</th>
                <th className="px-4 py-2 text-left">Destination</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">John Doe</td>
                <td className="px-4 py-2">Beach Paradise</td>
                <td className="px-4 py-2">Maldives</td>
                <td className="px-4 py-2">2025-12-01</td>
                <td className="px-4 py-2">
                  <span className="text-green-600 font-semibold">
                    Confirmed
                  </span>
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Jane Smith</td>
                <td className="px-4 py-2">Mountain Adventure</td>
                <td className="px-4 py-2">Nepal</td>
                <td className="px-4 py-2">2025-11-28</td>
                <td className="px-4 py-2">
                  <span className="text-yellow-600 font-semibold">Pending</span>
                </td>
              </tr>
              {/* Add more rows dynamically */}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
