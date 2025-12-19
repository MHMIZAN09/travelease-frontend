import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../components/provider/AuthProvider';
import {
  Calendar,
  Users,
  Loader2,
  ChevronLeft,
  CheckCircle,
  Shield,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const API_URL =
  import.meta.env.VITE_API_URL || 'https://travelease-backend.vercel.app';

export default function BookingPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    adults: 1,
    children: 0,
    travelDate: '',
    notes: '',
  });

  // Pre-fill from PackageDetails page
  useEffect(() => {
    if (location.state) {
      const { date, adults, children } = location.state;
      setFormData((prev) => ({
        ...prev,
        travelDate: date || '',
        adults: adults || 1,
        children: children || 0,
      }));
    }
  }, [location.state]);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      toast.info(t('pleaseLogin', 'Please log in to continue booking'));
      navigate('/login');
    }

    if (user?.role !== 'customer') {
      toast.info(t('customerOnly', 'Only customers can make bookings'));
      navigate('/');
    }
  }, [user, navigate, t]);

  // Fetch package details
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/packages/${id}`);
        setPkg(res.data.data || res.data);
      } catch (err) {
        toast.error(t('failedLoadPackage', 'Failed to load package details'));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [id, t]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'adults' || name === 'children') {
      setFormData((prev) => ({
        ...prev,
        [name]: Math.max(0, parseInt(value) || 0),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Calculate discounted price
  const discountedPrice =
    pkg && pkg.discount && pkg.discount > 0
      ? pkg.price - pkg.discount
      : pkg?.price || 0;

  const basePrice = discountedPrice;
  const total =
    basePrice * formData.adults + basePrice * 0.5 * formData.children;

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!formData.travelDate) {
      toast.error(t('selectDate', 'Please select a travel date'));
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        userId: user.uid,
        packageId: id,
        guests: { adults: formData.adults, children: formData.children },
        travelDate: formData.travelDate,
        totalAmount: total,
        specialRequests: formData.notes,
      };

      const res = await axios.post(`${API_URL}/api/bookings`, payload);

      if (res.data.checkoutUrl) {
        window.location.href = res.data.checkoutUrl;
      } else {
        toast.success(t('bookingConfirmed', 'Booking confirmed!'));
        navigate('/dashboard/bookings');
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          t('bookingFailed', 'Booking failed. Please try again.')
      );
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Loader2 className="w-12 h-12 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="text-center py-32 text-2xl text-gray-600">
        {t('packageNotFound', 'Package not found')}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 mb-8 transition"
        >
          <ChevronLeft className="w-6 h-6" />
          {t('backToPackage', 'Back to package')}
        </button>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left: Package Summary */}
          <div className="lg:col-span-2 space-y-10">
            {/* Main Image */}
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={pkg.images?.[0] || '/placeholder.jpg'}
                alt={pkg.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Title & Description */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                {pkg.title}
              </h1>

              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                {pkg.description}
              </p>

              {/* Price Highlight */}
              <div className="mt-10 p-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl border border-emerald-100">
                <div className="flex items-end gap-4">
                  <p className="text-4xl font-bold text-emerald-700">
                    ৳{basePrice.toLocaleString()}
                  </p>
                  <p className="text-xl text-gray-600 mb-1">
                    {t('perAdult', 'per adult')}
                  </p>
                </div>
                {pkg.discount && pkg.discount > 0 && (
                  <p className="text-2xl text-gray-500 line-through mt-3">
                    ৳{pkg.price.toLocaleString()}
                  </p>
                )}
                <p className="text-sm text-gray-600 mt-4">
                  {t(
                    'childrenDiscount',
                    'Children (0-12 years): 50% discount applied'
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Booking Form */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {t('completeBooking', 'Complete Your Booking')}
              </h2>

              <form onSubmit={handleBooking} className="space-y-7">
                {/* Travelers */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('adults', 'Adults')}
                    </label>
                    <select
                      name="adults"
                      value={formData.adults}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition"
                      required
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>
                          {n}{' '}
                          {n > 1
                            ? t('adultsPlural', 'Adults')
                            : t('adultSingular', 'Adult')}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('children', 'Children (0-12)')}
                    </label>
                    <select
                      name="children"
                      value={formData.children}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition"
                    >
                      {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n}{' '}
                          {n > 1
                            ? t('childrenPlural', 'Children')
                            : t('childSingular', 'Child')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Travel Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('travelDate', 'Travel Date')}
                  </label>
                  <input
                    type="date"
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition"
                    required
                  />
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('specialRequests', 'Special Requests')}{' '}
                    <span className="font-normal text-gray-500">
                      ({t('optional', 'Optional')})
                    </span>
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="4"
                    placeholder={t(
                      'specialRequestsPlaceholder',
                      'E.g., dietary restrictions, mobility needs...'
                    )}
                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition resize-none"
                  />
                </div>

                {/* Price Breakdown */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-100">
                  <h3 className="font-bold text-lg text-gray-900 mb-4">
                    {t('priceBreakdown', 'Price Breakdown')}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-lg">
                      <span>
                        {t('adults', 'Adults')} × {formData.adults}
                      </span>
                      <span className="font-semibold">
                        ৳{(basePrice * formData.adults).toLocaleString()}
                      </span>
                    </div>
                    {formData.children > 0 && (
                      <div className="flex justify-between text-lg">
                        <span>
                          {t('children', 'Children')} × {formData.children} (
                          {t('halfPrice', '50% off')})
                        </span>
                        <span className="font-semibold">
                          ৳
                          {(
                            basePrice *
                            0.5 *
                            formData.children
                          ).toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="border-t-2 border-emerald-200 pt-4 mt-4">
                      <div className="flex justify-between text-2xl font-bold text-emerald-700">
                        <span>{t('total', 'Total')}</span>
                        <span>৳{total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-col gap-3 text-sm text-gray-600 text-center mt-6">
                  <p className="flex items-center justify-center gap-2">
                    <Shield className="w-5 h-5 text-emerald-600" />
                    {t('securePayment', 'Secure payment powered by Stripe')}
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    {t(
                      'freeCancellation',
                      'Free cancellation up to 24 hours before'
                    )}
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-bold text-xl py-6 rounded-2xl transition shadow-xl hover:shadow-2xl disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-8"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      {t('processing', 'Processing...')}
                    </>
                  ) : (
                    t('proceedPayment', 'Proceed to Secure Payment')
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
