import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        'https://travelease-backend.vercel.app/api/bookings'
      );
      setBookings(res.data.data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch bookings.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Update booking status
  const updateStatus = async (bookingId, newStatus) => {
    try {
      await axios.put(
        `https://travelease-backend.vercel.app/api/bookings/${bookingId}`,
        {
          status: newStatus,
        }
      );
      toast.success('Status updated!');
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: newStatus } : b))
      );
    } catch (err) {
      console.error(err);
      toast.error('Failed to update status.');
    }
  };

  // Filtered and paginated bookings
  const filteredBookings = bookings.filter(
    (b) =>
      b.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.package?.title.toLowerCase().includes(searchTerm.toLowerCase())
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

      {/* Search */}
      <input
        type="text"
        placeholder="Search by user or package..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 input input-bordered w-full max-w-md border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
      />

      {/* Bookings Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-indigo-100">
            <tr>
              <th className="px-5 py-3 border">Booking ID</th>
              <th className="px-5 py-3 border">User</th>
              <th className="px-5 py-3 border">Package</th>
              <th className="px-5 py-3 border">Date</th>
              <th className="px-5 py-3 border">Status</th>
              <th className="px-5 py-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.length ? (
              currentBookings.map((b) => (
                <tr key={b._id} className="hover:bg-indigo-50 transition">
                  <td className="px-5 py-3 border font-mono text-gray-700">
                    {b._id.slice(-6)}
                  </td>
                  <td className="px-5 py-3 border font-medium">
                    {b.user?.name}
                  </td>
                  <td className="px-5 py-3 border">{b.package?.title}</td>
                  <td className="px-5 py-3 border">
                    {new Date(b.date).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3 border">
                    <span
                      className={`px-3 py-1 rounded-full text-white font-semibold text-sm ${
                        b.status === 'Confirmed'
                          ? 'bg-green-600'
                          : b.status === 'Pending'
                          ? 'bg-yellow-500'
                          : 'bg-red-600'
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 border flex justify-center gap-2">
                    {b.status !== 'Confirmed' && (
                      <button
                        onClick={() => updateStatus(b._id, 'Confirmed')}
                        className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold text-sm"
                      >
                        Confirm
                      </button>
                    )}
                    {b.status !== 'Cancelled' && (
                      <button
                        onClick={() => updateStatus(b._id, 'Cancelled')}
                        className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold text-sm"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center px-4 py-6 text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-lg bg-indigo-200 hover:bg-indigo-300 disabled:opacity-50 transition"
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
              } transition`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-lg bg-indigo-200 hover:bg-indigo-300 disabled:opacity-50 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
