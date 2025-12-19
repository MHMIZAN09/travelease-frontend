import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';

const API_URL =
  import.meta.env.VITE_API_URL || 'https://travelease-backend.vercel.app';

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id');
  const navigate = useNavigate();

  const hasConfirmed = useRef(false); // 🔥 prevent duplicate call

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!sessionId || hasConfirmed.current) return;

    hasConfirmed.current = true;

    const confirmPayment = async () => {
      try {
        const res = await axios.post(
          `${API_URL}/api/bookings/confirm-payment`,
          { session_id: sessionId }
        );

        setBooking(res.data.booking);
      } catch (err) {
        console.error(err);

        if (err.response?.status === 409) {
          // already confirmed case
          setBooking(err.response.data.booking);
        } else {
          setError(
            err.response?.data?.message ||
              'Payment confirmation failed. Please contact support.'
          );
        }
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, [sessionId]);

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-emerald-600" />
      </div>
    );
  }

  // ❌ Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-xl text-center max-w-md">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Payment Issue</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary w-full"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // ✅ Success UI
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>

        <p className="text-gray-500 mb-6">
          Your booking has been confirmed
          {booking?.reference && ` (#${booking.reference})`}
        </p>

        {booking && (
          <div className="bg-green-50 p-4 rounded-lg mb-6 text-left">
            <p>
              <span className="font-semibold">Package:</span>{' '}
              {booking.packageName}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{' '}
              {new Date(booking.travelDate).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Guests:</span>{' '}
              {booking.guests?.adults + booking.guests?.children}
            </p>
            <p>
              <span className="font-semibold">Total:</span> ৳
              {booking.totalAmount}
            </p>
          </div>
        )}

        <button
          onClick={() => navigate('/')}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold"
        >
          Go to Home
        </button>

        <button
          onClick={() => navigate('/dashboard/my-bookings')}
          className="w-full mt-3 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 py-3 rounded-lg font-semibold"
        >
          View My Bookings
        </button>
      </div>
    </div>
  );
}
