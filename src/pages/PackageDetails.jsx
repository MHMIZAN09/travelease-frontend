import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Star,
  Users,
  Clock,
  MapPin,
  ChevronLeft,
  Check,
  X,
  MessageCircle,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function PackageDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/packages/${id}`);
        setPkg(res.data.data);
      } catch (err) {
        console.error(err);
        toast.error(t('fetchPackageError'));
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [id, t]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <span className="loading loading-spinner loading-xl text-emerald-600"></span>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 text-xl text-gray-600">
        {t('packageNotFound')}
      </div>
    );
  }

  const durationText =
    pkg.duration?.days && pkg.duration?.nights
      ? t('duration', { days: pkg.duration.days, nights: pkg.duration.nights })
      : t('customDuration');

  const handleBooking = () => {
    navigate(`/booking/${pkg._id}`);
  };

  const discountedPrice = pkg.discount ? pkg.price - pkg.discount : null;
  const displayPrice = discountedPrice || pkg.price;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="container mx-auto px-6 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 mb-6 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
          {t('backToPackages')}
        </button>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 max-w-4xl">
          {pkg.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 mt-6 text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <span className="font-medium">
              {pkg.destination?.name || t('bangladesh')}
            </span>
          </div>

          {pkg.rating > 0 && (
            <>
              <span className="text-gray-400">•</span>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{pkg.rating.toFixed(1)}</span>
                <span className="text-sm">
                  ({t('reviews', { count: pkg.reviews?.length || 0 })})
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Image Gallery */}
      <div className="container mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-3xl overflow-hidden shadow-2xl h-96 lg:h-full">
            <img
              src={pkg.images?.[mainImageIndex] || pkg.images?.[0]}
              alt={pkg.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {pkg.images?.slice(0, 4).map((img, idx) => (
              <div
                key={idx}
                onClick={() => setMainImageIndex(idx)}
                className={`relative rounded-2xl overflow-hidden h-48 cursor-pointer shadow-lg transition-all hover:shadow-xl ${
                  idx === mainImageIndex ? 'ring-4 ring-emerald-500' : ''
                }`}
              >
                <img
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                {idx === 3 && pkg.images.length > 4 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">
                      +{pkg.images.length - 4}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Info Pills */}
        <div className="flex flex-wrap gap-4 mt-10">
          <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-full shadow-md border">
            <Clock className="w-6 h-6 text-emerald-600" />
            <span className="font-medium">{durationText}</span>
          </div>
          <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-full shadow-md border">
            <Users className="w-6 h-6 text-emerald-600" />
            <span className="font-medium">
              {t('groupSize', { size: pkg.groupSize })}
            </span>
          </div>
          <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-full shadow-md border">
            <MessageCircle className="w-6 h-6 text-emerald-600" />
            <span className="font-medium">
              {t('languages', { langs: 'English & Bengali' })}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar Booking Button */}
      <div className="container mx-auto px-6 mt-16 pb-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left: All Tour Details */}
          <div className="lg:col-span-2 space-y-16">
            {/* Tour Overview */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t('tourOverview')}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {pkg.description}
              </p>
            </section>

            {/* What's Included */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {t('whatsIncluded')}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {pkg.included?.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <Check className="w-7 h-7 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              {pkg.excluded?.length > 0 && (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
                    {t('notIncluded')}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {pkg.excluded.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <X className="w-7 h-7 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </section>

            {/* Itinerary */}
            <section>
              <h2 className="text-2xl font-bold mb-8">{t('itinerary')}</h2>
              <div className="space-y-8">
                {pkg.itinerary?.map((day, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                      {idx < pkg.itinerary.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-700 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-12">
                      <h3 className="text-xl font-semibold text-gray-700">
                        {t('dayTitle', { day: day.day, title: day.title })}
                      </h3>
                      <p className="text-gray-300 mt-2">{day.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar: Booking Button + Price */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border">
              <div className="text-center mb-8">
                <p className="text-4xl font-bold text-emerald-600">
                  ৳{displayPrice.toLocaleString()}
                </p>
                {discountedPrice && discountedPrice < pkg.price && (
                  <p className="text-xl text-gray-500 line-through mt-2">
                    ৳{pkg.price.toLocaleString()}
                  </p>
                )}
                <p className="text-lg text-gray-600 mt-3">
                  {t('startingPricePerPerson')}
                </p>
              </div>

              <button
                onClick={handleBooking}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xl py-5 rounded-2xl transition shadow-lg hover:shadow-xl"
              >
                {t('bookNow')}
              </button>

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>✓ {t('freeCancellation')}</p>
                <p>✓ {t('bestPriceGuarantee')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
