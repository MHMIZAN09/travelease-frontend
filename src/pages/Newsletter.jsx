import { Mail } from 'lucide-react';
import newsletterImage from '../assets/news.png';
import { useTranslation } from 'react-i18next';

export function Newsletter() {
  const { t } = useTranslation();

  return (
    <section
      className="relative py-16 md:py-20"
      style={{
        backgroundImage: `url(${newsletterImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-80"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto p-8 md:p-16 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-500 text-center space-y-6">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110">
            <Mail className="w-8 h-8 text-white" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            {t('newsletterTitle')}
          </h2>

          {/* Description */}
          <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
            {t('newsletterDesc')}
          </p>

          {/* Input + Button */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('newsletterPlaceholder')}
              className="flex-1 input input-bordered rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none focus:shadow-md transition"
            />
            <button className="btn bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0 rounded-lg hover:scale-105 hover:shadow-xl transition-transform duration-300">
              {t('newsletterButton')}
            </button>
          </div>

          {/* Footer note */}
          <p className="text-sm text-gray-600">{t('newsletterFooter')}</p>
        </div>
      </div>
    </section>
  );
}
