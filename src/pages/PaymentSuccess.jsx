import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id');
  const [booking, setBooking] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionId) return;

    const confirmPayment = async () => {
      try {
        const res = await axios.post(
          'https://travelease-backend.vercel.app/api/bookings/confirm-payment',
          { session_id: sessionId }
        );
        setBooking(res.data.booking); // if your backend returns booking details
      } catch (error) {
        console.error(error);
      }
    };

    confirmPayment();
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center animate-fadeIn">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6 animate-bounce" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-500 mb-6">
          Your booking has been confirmed{' '}
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
              {new Date(booking.date).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Guests:</span> {booking.guests}
            </p>
          </div>
        )}

        <button
          onClick={() => navigate('/')}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors"
        >
          Go to Home
        </button>
        <button
          onClick={() => navigate('/dashboard/my-bookings')}
          className="w-full mt-3 border border-green-500 text-green-500 hover:bg-green-50 py-3 rounded-lg font-semibold transition-colors"
        >
          View My Bookings
        </button>
      </div>
    </div>
  );
}
