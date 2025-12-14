import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Star, Users, Clock, MapPin } from 'lucide-react';
import { toast } from 'react-toastify';

export default function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axios.get(
          `https://travelease-backend.vercel.app/api/packages/${id}`
        );
        setPkg(res.data.data);
      } catch (err) {
        toast.error('Failed to fetch package details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [id]);

  // Auto-change main image every 4 seconds
  useEffect(() => {
    if (pkg?.images?.length > 1) {
      const interval = setInterval(() => {
        setMainImageIndex((prev) => (prev + 1) % pkg.images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [pkg]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading...
      </div>
    );

  if (!pkg)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Package not found.
      </div>
    );

  const durationText =
    pkg.duration?.days && pkg.duration?.nights
      ? `${pkg.duration.days}D / ${pkg.duration.nights}N`
      : 'N/A';

  const handleBooking = () => {
    navigate(`/booking/${pkg._id}`);
  };

  return (
    <div className="min-h-screen py-12 px-4 md:px-10 bg-gray-100">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Main Image Carousel */}
        <div className="relative h-[500px] w-full">
          {pkg.images?.[mainImageIndex] && (
            <img
              src={pkg.images[mainImageIndex]}
              alt="Main"
              className="w-full h-full object-cover rounded-b-xl transition-transform duration-700 ease-in-out"
            />
          )}
          <div className="absolute bottom-6 left-6 bg-emerald-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg flex items-center gap-1">
            <MapPin className="h-5 w-5" /> {pkg.destination?.name || 'Unknown'}
          </div>

          {/* Thumbnails */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 overflow-x-auto">
            {pkg.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-transform duration-300 hover:scale-110 ${
                  idx === mainImageIndex
                    ? 'border-emerald-600 shadow-lg'
                    : 'border-gray-200'
                }`}
                onClick={() => setMainImageIndex(idx)}
              />
            ))}
          </div>
        </div>

        {/* Package Header */}
        <div className="p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h1 className="text-4xl font-bold text-gray-800">{pkg.title}</h1>
            <div className="flex flex-wrap items-center gap-5 mt-3 md:mt-0 text-gray-600">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-yellow-400" /> {pkg.rating ?? 0}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-5 w-5 text-emerald-500" /> {pkg.groupSize}{' '}
                pax
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-5 w-5 text-emerald-500" /> {durationText}
              </div>
            </div>
          </div>

          {/* Booking */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 p-6 bg-emerald-50 rounded-2xl shadow-inner">
            <div className="text-4xl font-extrabold text-emerald-600">
              ৳{pkg.price}
            </div>
            <button
              onClick={handleBooking}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg transition-transform duration-300 hover:scale-105"
            >
              Book Now
            </button>
          </div>

          {/* Tabs for Description, Itinerary, Included, Excluded */}
          <div className="mt-8">
            <div className="flex border-b border-gray-200">
              {['description', 'itinerary', 'included', 'excluded'].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 px-6 font-semibold text-gray-700 transition-colors ${
                      activeTab === tab
                        ? 'border-b-4 border-emerald-600 text-emerald-600'
                        : 'hover:text-emerald-600'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                )
              )}
            </div>

            <div className="mt-6 text-gray-700 space-y-6">
              {/* Description */}
              {activeTab === 'description' && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Package Overview
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {pkg.description}
                  </p>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-emerald-50 p-4 rounded-xl shadow hover:shadow-lg transition">
                      <h3 className="font-semibold text-emerald-600 mb-1">
                        Destination
                      </h3>
                      <p className="text-gray-700">{pkg.destination?.name}</p>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-xl shadow hover:shadow-lg transition">
                      <h3 className="font-semibold text-emerald-600 mb-1">
                        Duration
                      </h3>
                      <p className="text-gray-700">{durationText}</p>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-xl shadow hover:shadow-lg transition">
                      <h3 className="font-semibold text-emerald-600 mb-1">
                        Group Size
                      </h3>
                      <p className="text-gray-700">{pkg.groupSize} pax</p>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-xl shadow hover:shadow-lg transition">
                      <h3 className="font-semibold text-emerald-600 mb-1">
                        Rating
                      </h3>
                      <p className="text-gray-700 flex items-center gap-1">
                        <Star className="text-yellow-400 w-5 h-5" />{' '}
                        {pkg.rating ?? 0}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Itinerary */}
              {activeTab === 'itinerary' && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Itinerary
                  </h2>
                  <div className="space-y-3">
                    {pkg.itinerary?.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
                      >
                        <h3 className="font-semibold text-emerald-600">
                          {item.title}
                        </h3>
                        <p className="text-gray-700 mt-1">{item.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Included */}
              {activeTab === 'included' && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    What's Included
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pkg.included?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
                      >
                        <svg
                          className="w-6 h-6 text-emerald-600 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <p className="text-gray-700 font-medium">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Excluded */}
              {activeTab === 'excluded' && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    What's Not Included
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pkg.excluded?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
                      >
                        <svg
                          className="w-6 h-6 text-red-500 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        <p className="text-gray-700 font-medium">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
