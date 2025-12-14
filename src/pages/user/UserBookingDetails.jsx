import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../components/provider/AuthProvider';
import { FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function UserBookingDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchBooking = async () => {
      try {
        const res = await axios.get(
          `https://travelease-backend.vercel.app/api/bookings/${id}`,
          {
            headers: {
              Authorization: `Bearer ${await user.getIdToken()}`,
            },
          }
        );
        setBooking(res.data.data);
      } catch (err) {
        toast.error('Failed to load booking details', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id, user]);

  const getStatus = (status) => {
    if (status === 'confirmed')
      return (
        <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full flex items-center gap-2">
          <FaCheckCircle /> Confirmed
        </span>
      );

    if (status === 'pending')
      return (
        <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full flex items-center gap-2">
          <FaClock /> Pending
        </span>
      );

    return (
      <span className="bg-red-100 text-red-700 px-4 py-1 rounded-full flex items-center gap-2">
        <FaTimesCircle /> Cancelled
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500">
        Loading booking details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Booking Details
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Package Info */}
          <div>
            <img
              src={booking.package.image}
              alt=""
              className="rounded-xl mb-4"
            />
            <h2 className="text-xl font-semibold">{booking.package.title}</h2>
            <p className="text-gray-600 mt-1">
              Destination: {booking.package.destination}
            </p>
          </div>

          {/* Booking Info */}
          <div className="space-y-4">
            <div>{getStatus(booking.bookingStatus)}</div>

            <p>
              <strong>Booking ID:</strong> {booking._id}
            </p>

            <p>
              <strong>Guests:</strong> {booking.guests.adults} Adults,{' '}
              {booking.guests.children} Children
            </p>

            <p>
              <strong>Total Price:</strong>{' '}
              <span className="text-lg font-bold text-blue-600">
                BDT {booking.totalPrice}
              </span>
            </p>

            <p>
              <strong>Payment:</strong> {booking.paymentStatus}
            </p>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              {booking.paymentStatus === 'pending' && (
                <Link
                  to={`/pay/${booking._id}`}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Pay Now
                </Link>
              )}

              <Link
                to={`/invoice/${booking._id}`}
                className="border px-6 py-2 rounded-lg hover:bg-gray-100"
              >
                Download Invoice
              </Link>

              {booking.bookingStatus !== 'cancelled' && (
                <button
                  onClick={() => toast.info('Cancel API next')}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
