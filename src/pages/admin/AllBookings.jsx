import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [updatingId, setUpdatingId] = useState(null);
  const itemsPerPage = 10;

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        'https://travelease-backend.vercel.app/api/bookings'
      );
      setBookings(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch bookings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (bookingId, newStatus) => {
    setUpdatingId(bookingId);
    try {
      await axios.put(
        `https://travelease-backend.vercel.app/api/bookings/${bookingId}`,
        {
          bookingStatus: newStatus,
        }
      );
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, bookingStatus: newStatus } : b
        )
      );
      toast.success('Status updated!');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to update status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredBookings = bookings.filter(
    (b) =>
      b.user?.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.package?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-xl text-indigo-500"></span>
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">All Bookings</h1>

      <input
        type="text"
        placeholder="Search by user/email/package..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 input input-bordered w-full max-w-md border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 rounded-lg"
      />

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-indigo-100 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3">User / Email</th>
              <th className="px-6 py-3">Package</th>
              <th className="px-6 py-3">Booking Status</th>
              <th className="px-6 py-3">Payment Status</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.length ? (
              currentBookings.map((b) => (
                <tr
                  key={b._id}
                  className="hover:bg-indigo-50 transition border-b border-gray-100"
                >
                  <td className="px-6 py-3">
                    {b.user?.displayName || b.user?.email}
                  </td>
                  <td className="px-6 py-3">{b.package?.title || 'N/A'}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs ${
                        b.bookingStatus === 'confirmed'
                          ? 'bg-green-500'
                          : b.bookingStatus === 'pending'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    >
                      {b.bookingStatus}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs ${
                        b.paymentStatus === 'succeeded'
                          ? 'bg-green-500'
                          : 'bg-red-500'
                      }`}
                    >
                      {b.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    ৳{Number(b.totalAmount).toLocaleString()}
                  </td>
                  <td className="px-6 py-3">
                    {new Date(b.travelDate || b.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3 flex gap-2 flex-wrap">
                    {b.bookingStatus !== 'confirmed' && (
                      <button
                        onClick={() => updateStatus(b._id, 'confirmed')}
                        disabled={updatingId === b._id}
                        className={`flex items-center gap-1 px-3 py-1 text-xs rounded-md font-semibold justify-center min-w-[90px] ${
                          updatingId === b._id
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700'
                        } text-white`}
                      >
                        <FaCheck />{' '}
                        {updatingId === b._id ? 'Updating...' : 'Confirm'}
                      </button>
                    )}
                    {b.bookingStatus !== 'cancelled' && (
                      <button
                        onClick={() => updateStatus(b._id, 'cancelled')}
                        disabled={updatingId === b._id}
                        className={`flex items-center gap-1 px-3 py-1 text-xs rounded-md font-semibold justify-center min-w-[90px] ${
                          updatingId === b._id
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-red-600 hover:bg-red-700'
                        } text-white`}
                      >
                        <FaTimes />{' '}
                        {updatingId === b._id ? 'Updating...' : 'Cancel'}
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-6">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4 flex-wrap">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-lg bg-indigo-200 hover:bg-indigo-300"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-lg ${
                currentPage === i + 1
                  ? 'bg-indigo-600 text-white'
                  : 'bg-indigo-100 hover:bg-indigo-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-lg bg-indigo-200 hover:bg-indigo-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
