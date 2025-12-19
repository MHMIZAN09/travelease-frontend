import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const API_URL = 'https://travelease-backend.vercel.app/';

export default function TopDestinations() {
  const { t } = useTranslation();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [destRes, pkgRes] = await Promise.all([
          axios.get(`${API_URL}/api/destinations`),
          axios.get(`${API_URL}/api/packages`),
        ]);

        const destinationList = destRes.data.data || [];
        const packageList = pkgRes.data.data || [];

        const destinationWithCount = destinationList.map((dest) => {
          const count = packageList.filter(
            (pkg) => pkg.destination?._id === dest._id
          ).length;

          return {
            ...dest,
            packageCount: count,
            averageRating: Number(dest.averageRating ?? 0),
          };
        });

        const sortedDestinations = destinationWithCount
          .sort((a, b) => b.packageCount - a.packageCount)
          .slice(0, 6);

        setDestinations(sortedDestinations);
      } catch (error) {
        console.error('Error fetching top destinations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-lg font-medium text-gray-700">
        {t('loadingTopDestinations', 'Loading top destinations...')}
      </p>
    );
  }

  if (!destinations.length) return null;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            {t('topDestinations', 'Top Destinations')}
          </h2>
          <Link
            to="/destination"
            className="text-teal-600 font-semibold hover:underline"
          >
            {t('seeAll', 'See All')}
          </Link>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {destinations.map((dest) => (
            <SwiperSlide key={dest._id}>
              <div className="rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300 bg-white">
                {/* Image */}
                <div className="relative">
                  <img
                    src={
                      Array.isArray(dest.images) ? dest.images[0] : dest.images
                    }
                    alt={dest.name}
                    className="w-full h-56 object-cover"
                  />

                  {/* Package Count */}
                  <div className="absolute top-3 left-3 bg-emerald-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow transition-transform duration-300 hover:scale-105">
                    {dest.packageCount} {t('packages', 'Packages')}
                  </div>

                  {/* Average Rating */}
                  <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full shadow flex items-center gap-1 text-sm font-semibold">
                    <Star className="w-4 h-4 text-yellow-400" />
                    {dest.averageRating.toFixed(1)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-xl font-bold text-gray-800">
                    {dest.name}
                  </h3>
                  <p className="text-sm text-gray-500">{dest.division}</p>
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {dest.description}
                  </p>
                  <p className="text-sm font-semibold text-emerald-600">
                    {dest.packageCount}{' '}
                    {t('packagesAvailable', 'Packages Available')}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
