import AboutUs from '../assets/about.png';
import { useTranslation } from 'react-i18next';


const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-24 bg-gray-50 overflow-hidden rounded-3xl">
      {/* Decorative circles */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-emerald-100/20 rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-teal-100/20 rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Illustration */}
        <div className="flex justify-center relative">
          <img
            src={AboutUs}
            alt={t('aboutIllustrationAlt')}
            className="w-full max-w-md rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col justify-center gap-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-700">
            {t('aboutSectionTitle')}
          </h1>

          <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-500 leading-tight">
            {t('aboutSectionSubtitle')}
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            {t('aboutSectionText')}
          </p>

          <div className="flex gap-4 flex-wrap mt-4">
            <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300">
              {t('aboutSectionButton')}
            </button>
            <button className="border border-emerald-500 text-emerald-500 px-6 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-colors duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
