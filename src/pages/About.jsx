import AboutSection from '../components/AboutSection';
import { SectionTitle } from '../components/SectionTitle';
import FQA from '../assets/FQA.png';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true });
  }, []);

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <div data-aos="fade-down">
        <SectionTitle
          title={t('aboutTitle')}
          description={t('aboutSubtitle')}
        />
      </div>

      {/* ABOUT SECTION */}
      <div data-aos="fade-up">
        <AboutSection />
      </div>

      {/* TESTIMONIAL */}
      <section
        data-aos="zoom-in"
        className="py-24 px-6 my-16 rounded-3xl bg-linear-to-r from-emerald-500 to-teal-600 text-white shadow-xl"
      >
        <h2 className="text-4xl font-bold mb-6">{t('testimonialTitle')}</h2>

        <p className="max-w-2xl mx-auto text-lg mb-10 opacity-90">
          {t('testimonialText')}
        </p>

        <div className="flex justify-center">
          <div className="bg-white text-gray-700 px-8 py-4 rounded-full shadow-xl flex items-center gap-4">
            <img
              src="https://i.pravatar.cc/80"
              className="w-12 h-12 rounded-full shadow"
              alt="Customer"
            />
            <div>
              <h4 className="font-semibold">Ahsan Rahim</h4>
              <p className="text-sm text-gray-500">{t('traveller')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section data-aos="fade-up" className="py-20" id="faq">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-emerald-600 mb-4">
            {t('faqTitle')}
          </h2>

          <p className="text-gray-600 max-w-xl mx-auto mb-12">
            {t('faqSubtitle')}
          </p>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* LEFT FAQ */}
            <div className="space-y-4">
              {t('faqs', { returnObjects: true }).map((faq, index) => (
                <div
                  key={index}
                  className="collapse collapse-plus bg-emerald-50 border border-emerald-100 rounded-xl shadow-sm"
                >
                  <input type="radio" name="faq" />
                  <div className="collapse-title text-lg font-semibold text-emerald-700">
                    {faq.q}
                  </div>
                  <div className="collapse-content text-gray-600">{faq.a}</div>
                </div>
              ))}
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-center items-center">
              <img
                src={FQA}
                alt="FAQ Illustration"
                className="w-80 md:w-full drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
