import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const images = [
  'https://images.unsplash.com/photo-1658139657766-3ba1adc5a010?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1637419705926-9e790aeecf1c?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
];

export function Hero() {
  const { t } = useTranslation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') return;
  };

  return (
    <section className="relative h-[700px] md:h-[600px] lg:h-[650px] flex items-center justify-center overflow-hidden rounded-xl">
      {/* Carousel Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={images[currentIndex]}
          alt={t('heroAlt')}
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight drop-shadow-lg">
            {t('heroTitle')}
          </h1>
          <p className="text-lg md:text-2xl text-gray-100 max-w-2xl mx-auto drop-shadow">
            {t('heroSubtitle')}
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="mt-6 flex justify-center items-center shadow-lg rounded-full overflow-hidden w-full max-w-xl mx-auto"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="flex-1 px-5 py-3 text-white bg-black/40 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition"
            >
              {t('searchButton')}
            </button>
          </form>

          {/* Optional: small carousel indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`w-3 h-3 rounded-full transition ${
                  currentIndex === idx ? 'bg-emerald-500' : 'bg-gray-300'
                }`}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
