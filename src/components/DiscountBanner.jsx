import { Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function DiscountBanner() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-10 h-48">
      {/* Decorative circles */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-white/10 rounded-full pointer-events-none"></div>

      {/* Left Content */}
      <div className="flex-1 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="bg-white/20 p-3 rounded-full flex items-center justify-center">
          <Tag className="w-6 h-6" />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-lg md:text-2xl font-bold leading-tight">
            {t('specialOffer', '🎉 Special Offer!')}
          </h2>
          <p className="text-sm md:text-base">
            {t('discountText', 'Get')}{' '}
            <span className="font-extrabold">20% {t('off', 'OFF')}</span>{' '}
            {t('onAllPackages', 'on all tour packages')}
          </p>
        </div>
      </div>

      {/* Right CTA Button */}
      <div>
        <button
          onClick={() => navigate('/package')}
          className="bg-white text-emerald-600 px-6 py-3 rounded-full font-bold text-sm md:text-base hover:bg-gray-100 transition shadow-lg"
        >
          {t('bookNow', 'Book Now')}
        </button>
      </div>
    </div>
  );
}
