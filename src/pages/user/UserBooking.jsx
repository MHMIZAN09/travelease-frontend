import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../components/provider/AuthProvider';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';

export default function UserBooking() {
  const { user } = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!user) {
      toast.info('You must login to view your bookings');
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `https://travelease-backend.vercel.app/api/bookings/user/${
            user._id || user.uid
          }`
        );
        setBookings(res.data.data || []);
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  // Pagination logic
  const totalPages = Math.ceil(bookings.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBookings = bookings.slice(startIndex, endIndex);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
            <FaClock /> Pending
          </span>
        );
      case 'confirmed':
        return (
          <span className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
            <FaCheckCircle /> Confirmed
          </span>
        );
      case 'canceled':
        return (
          <span className="flex items-center gap-1 bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
            <FaTimesCircle /> Canceled
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
            Unknown
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500 text-lg">
        Loading your bookings...
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-gray-500">
        <h2 className="text-xl font-semibold">No bookings found</h2>
        <p className="mt-2">Start exploring our travel packages ✈️</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 ">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">
        My Bookings
      </h1>

      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-linear-to-r from-blue-200 to-blue-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase">
                Package
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase">
                Guests
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase">
                Total Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase">
                Notes
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {currentBookings.map((b) => (
              <tr key={b._id} className="hover:bg-blue-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-800">
                  {b.package?.title}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {b.guests?.adults} Adults / {b.guests?.children} Children
                </td>
                <td className="px-6 py-4 font-semibold text-gray-800">
                  BDT {b.totalAmount}
                </td>
                <td className="px-6 py-4">{getStatusBadge(b.bookingStatus)}</td>
                <td className="px-6 py-4 text-gray-600">{b.notes || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
        <p className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(endIndex, bookings.length)} of{' '}
          {bookings.length} bookings
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg border disabled:opacity-40 hover:bg-gray-100"
          >
            <FaChevronLeft />
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'border hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg border disabled:opacity-40 hover:bg-gray-100"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
