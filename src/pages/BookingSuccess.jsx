import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function BookingSuccess() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(
          `https://travelease-backend.vercel.app/api/bookings/${id}`
        );
        setBooking(res.data.data);
      } catch (err) {
        toast.error('Failed to fetch booking');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  if (!booking)
    return (
      <div className="min-h-screen flex justify-center items-center">
        Booking not found
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-4">Booking Successful!</h2>
      <p>Package: {booking.package.title}</p>
      <p>Total Price: ${booking.totalPrice}</p>
      <p>Booking Status: {booking.bookingStatus}</p>
      <p>Payment Status: {booking.paymentStatus}</p>
    </div>
  );
}
