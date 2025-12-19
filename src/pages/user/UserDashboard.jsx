import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../components/provider/AuthProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUser, FaSuitcaseRolling, FaCreditCard, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `https://travelease-backend.vercel.app/api/bookings/user/${user.uid}`
        );
        setBookings(res.data.data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  // Calculate stats
  const totalBookings = bookings.length;
  const upcomingTrips = bookings.filter(
    (b) => b.bookingStatus === 'confirmed'
  ).length;
  const pendingPayments = bookings.filter(
    (b) => b.paymentStatus === 'pending'
  ).length;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
            Pending
          </span>
        );
      case 'confirmed':
        return (
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
            Confirmed
          </span>
        );
      case 'canceled':
        return (
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">
            Canceled
          </span>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500 text-lg font-medium">
        Loading your dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg px-6 py-8 hidden md:block">
        <h2 className="text-2xl font-bold mb-8 text-blue-600">TravelEase</h2>
        <nav className="flex flex-col gap-4">
          <Link
            to="/dashboard/profile"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <FaUser /> Profile
          </Link>
          <Link
            to="/dashboard/bookings"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <FaSuitcaseRolling /> My Bookings
          </Link>
          <Link
            to="/dashboard/payments"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <FaCreditCard /> Payments
          </Link>
          <Link
            to="/dashboard/settings"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <FaCog /> Settings
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start">
            <span className="text-gray-500 text-sm">Total Bookings</span>
            <span className="text-2xl font-bold text-gray-800">
              {totalBookings}
            </span>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start">
            <span className="text-gray-500 text-sm">Upcoming Trips</span>
            <span className="text-2xl font-bold text-gray-800">
              {upcomingTrips}
            </span>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start">
            <span className="text-gray-500 text-sm">Pending Payments</span>
            <span className="text-2xl font-bold text-gray-800">
              {pendingPayments}
            </span>
          </div>
        </div>

        {/* Recent Bookings Table */}
        <div className="bg-white shadow-lg rounded-2xl overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-linear-to-r from-blue-200 to-blue-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Package
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Guests
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Total Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((b) => (
                <tr
                  key={b._id}
                  className="hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    {b._id}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                    {b.package.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {b.guests.adults}A / {b.guests.children}C
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 font-semibold">
                    BDT {b.totalPrice}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(b.bookingStatus)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
