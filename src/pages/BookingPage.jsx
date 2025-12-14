import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../components/provider/AuthProvider';

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    adults: 1,
    children: 0,
    notes: '',
  });

  const [totalPrice, setTotalPrice] = useState(0);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      toast.info('You must login to book a package');
      setTimeout(() => navigate('/login'), 500);
    }
  }, [user, navigate]);

  // Fetch package details
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axios.get(
          `https://travelease-backend.vercel.app/api/packages/${id}`
        );
        setPkg(res.data.data);

        if (user) {
          setFormData((prev) => ({
            ...prev,
            fullName: user.name || '',
            email: user.email || '',
          }));
        }
      } catch (err) {
        toast.error('Failed to fetch package');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [id, user]);

  // Update total price whenever pkg or travelers change
  useEffect(() => {
    if (!pkg) return;
    const adultsPrice = pkg.price * formData.adults;
    const childrenPrice = pkg.price * 0.5 * formData.children; // 50% for children
    setTotalPrice(adultsPrice + childrenPrice);
  }, [pkg, formData.adults, formData.children]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseInt(value) || value }));
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!pkg) return toast.error('Package not found');

    try {
      const payload = {
        userId: user.uid,
        packageId: id,
        guests: { adults: formData.adults, children: formData.children },
        totalPrice,
        notes: formData.notes,
        fullName: formData.fullName,
        email: formData.email,
      };

      const res = await axios.post(
        'https://travelease-backend.vercel.app/api/bookings',
        payload
      );

      toast.success('Booking created! Redirecting to payment...');
      setTimeout(() => navigate(`/booking-success/${res.data.data._id}`), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
      console.error('Booking Error:', err);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );

  if (!pkg)
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500">
        Package not found.
      </div>
    );

  return (
    <div className="min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6">Booking: {pkg.title}</h2>
        <form onSubmit={handleBooking} className="space-y-4">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border p-2 rounded"
          />
          <div className="flex gap-4">
            <input
              type="number"
              name="adults"
              value={formData.adults}
              min={1}
              onChange={handleChange}
              placeholder="Adults"
              className="w-1/2 border p-2 rounded"
              required
            />
            <input
              type="number"
              name="children"
              value={formData.children}
              min={0}
              onChange={handleChange}
              placeholder="Children"
              className="w-1/2 border p-2 rounded"
            />
          </div>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notes"
            className="w-full border p-2 rounded"
          />
          <p className="text-lg font-semibold">Total Price: BDT {totalPrice}</p>
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold"
          >
            Confirm Booking & Pay
          </button>
        </form>
      </div>
    </div>
  );
}
