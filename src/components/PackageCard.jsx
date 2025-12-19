import { useNavigate } from 'react-router-dom';
import { Star, Clock, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PackageCard({ pkg }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const title = pkg.title || t('untitledTour');
  const destinationName = pkg.destination?.name || t('bangladesh');
  const shortDesc = pkg.description?.slice(0, 150);
  const durationText =
    pkg.duration?.days && pkg.duration?.nights
      ? t('duration', { days: pkg.duration.days, nights: pkg.duration.nights })
      : t('customDuration');
  const groupSizeText = pkg.groupSize
    ? t('groupSize', { size: pkg.groupSize })
    : null;
  const transportationText = pkg.transportation || null;
  const rating = pkg.rating > 0 ? pkg.rating.toFixed(1) : null;
  const reviewCount = pkg.reviews?.length || 0;

  // Price & discount calculation
  const originalPrice = pkg.price || 0;
  const discountedPrice = pkg.discount ? originalPrice - pkg.discount : null;

  return (
    <div className="relative flex flex-col md:flex-row bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full">
      {/* Image Section */}
      <div className="relative w-full md:w-1/3 h-64 md:h-auto overflow-hidden rounded-2xl m-5 md:mr-0">
        <img
          src={pkg.images?.[0]}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        {/* Discount Badge */}
        {discountedPrice && (
          <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-lg font-bold shadow-lg">
            {t('save', { amount: pkg.discount })}
          </div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-8 flex flex-col justify-between">
        <div>
          {/* Destination */}
          <p className="text-sm text-gray-500 font-medium mb-2">
            {destinationName} • {t('bangladesh')}
          </p>

          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-800 mb-4 line-clamp-2">
            {title}
          </h3>

          {/* Short Description */}
          <p className="text-gray-600 text-base mb-6 line-clamp-3">
            {shortDesc}
          </p>

          {/* Icons Row: Duration, Group Size, Transport */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-700 mb-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-emerald-600" />
              <span>{durationText}</span>
            </div>
            {groupSizeText && (
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-emerald-600" />
                <span>{groupSizeText}</span>
              </div>
            )}
            {transportationText && (
              <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                {transportationText}
              </span>
            )}
          </div>

          {/* Rating */}
          {rating && (
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center bg-orange-100 px-3 py-1 rounded-full">
                <Star className="h-5 w-5 fill-orange-500 text-orange-500" />
                <span className="ml-1 font-bold text-orange-600">{rating}</span>
              </div>
              <span className="text-gray-600 text-sm">
                ({t('reviews', { count: reviewCount })})
              </span>
            </div>
          )}

          {/* Badges */}
          <div className="flex items-center gap-4 text-sm">
            <span className="text-green-700 font-semibold">
              {t('bestPriceGuarantee')}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-green-700 font-semibold">
              {t('freeCancellation')}
            </span>
          </div>
        </div>

        {/* Bottom: Price + Button */}
        <div className="mt-8 flex items-end justify-between">
          <div>
            <p className="text-sm text-gray-500">{t('startingFrom')}</p>
            <p className="text-4xl font-bold text-emerald-600 flex items-center gap-3">
              {discountedPrice ? (
                <>
                  <span>৳{discountedPrice}</span>
                  <span className="text-gray-400 text-xl line-through">
                    ৳{originalPrice}
                  </span>
                </>
              ) : (
                <span>৳{originalPrice}</span>
              )}
            </p>
          </div>

          <button
            onClick={() => navigate(`/packages/${pkg._id}`)}
            className="btn btn-outline btn-emerald hover:bg-emerald-600 hover:text-white cursor-pointer border-emerald-500 border-2 text-emerald-600 font-semibold px-6 py-3 rounded-lg transition-all duration-300"
          >
            {t('viewDetails')}
          </button>
        </div>
      </div>
    </div>
  );
}
