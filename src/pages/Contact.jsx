import { useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ContactMap from './ContactMap';
import { SectionTitle } from '../components/SectionTitle';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const ContactList = [
    {
      icon: <Phone className="h-6 w-6 text-emerald-600" />,
      title: t('contactPhone'),
      info: ['+880 1711-123456', '+880 1812-654321'],
      note: t('contactPhoneNote'),
      bg: 'bg-emerald-100',
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-teal-600" />,
      title: t('contactWhatsApp'),
      info: ['+880 1711-123456'],
      note: t('contactWhatsAppNote'),
      bg: 'bg-teal-100',
    },
    {
      icon: <Mail className="h-6 w-6 text-purple-600" />,
      title: t('contactEmail'),
      info: ['info@travelease.com', 'booking@travelease.com'],
      note: t('contactEmailNote'),
      bg: 'bg-purple-100',
    },
    {
      icon: <MapPin className="h-6 w-6 text-green-600" />,
      title: t('contactHeadOffice'),
      info: ['House 45, Road 12, Banani, Dhaka 1213, Bangladesh'],
      bg: 'bg-green-100',
    },
    {
      icon: <Clock className="h-6 w-6 text-orange-600" />,
      title: t('contactOfficeHours'),
      info: [t('contactOfficeSatThu'), t('contactOfficeFri')],
      bg: 'bg-orange-100',
    },
  ];

  const BranchOffices = [
    {
      city: t('coxOffice'),
      address: t('coxAddress'),
      phone: '+880 1911-234567',
    },
    {
      city: t('sylhetOffice'),
      address: t('sylhetAddress'),
      phone: '+880 1611-345678',
    },
    {
      city: t('chittagongOffice'),
      address: t('chittagongAddress'),
      phone: '+880 1511-456789',
    },
  ];

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div data-aos="fade-down">
        <SectionTitle
          title={t('contactHeroTitle')}
          description={t('contactHeroSubtitle')}
        />
      </div>

      {/* Contact Info + Form */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left - Contact Cards */}
          <div className="space-y-6">
            {ContactList.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 border border-gray-100"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {item.title}
                    </h3>
                    {item.info.map((line, idx) => (
                      <p key={idx} className="text-gray-600">
                        {line}
                      </p>
                    ))}
                    {item.note && (
                      <p className="text-sm text-gray-500 mt-1">{item.note}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Contact Form */}
          <div className="lg:col-span-2" data-aos="fade-left">
            <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                {t('contactFormTitle')}
              </h2>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder={t('contactFormFirstName')}
                    className="input input-bordered w-full rounded-xl"
                  />
                  <input
                    type="text"
                    placeholder={t('contactFormLastName')}
                    className="input input-bordered w-full rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="email"
                    placeholder={t('contactFormEmail')}
                    className="input input-bordered w-full rounded-xl"
                  />
                  <input
                    type="tel"
                    placeholder={t('contactFormPhone')}
                    className="input input-bordered w-full rounded-xl"
                  />
                </div>

                <input
                  type="text"
                  placeholder={t('contactFormDestination')}
                  className="input input-bordered w-full rounded-xl"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="date"
                    className="input input-bordered w-full rounded-xl"
                  />
                  <input
                    type="number"
                    min="1"
                    placeholder={t('contactFormTravelers')}
                    className="input input-bordered w-full rounded-xl"
                  />
                </div>

                <textarea
                  rows={5}
                  placeholder={t('contactFormMessage')}
                  className="textarea textarea-bordered w-full rounded-xl"
                />

                <button className="w-full py-3 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:opacity-90 transition flex items-center justify-center gap-2">
                  <Send className="h-5 w-5" /> {t('contactFormButton')}
                </button>

                <p className="text-sm text-gray-500 text-center">
                  {t('contactFormNote')}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Branch Offices */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2
            className="text-3xl font-bold mb-2 text-gray-800"
            data-aos="fade-up"
          >
            {t('contactBranchTitle')}
          </h2>
          <p
            className="text-gray-600 mb-10"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {t('contactBranchSubtitle')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BranchOffices.map((b, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 border border-gray-100"
                data-aos="zoom-in"
                data-aos-delay={i * 100}
              >
                <h3 className="text-xl font-semibold text-emerald-700 mb-2">
                  {b.city}
                </h3>
                <p className="text-gray-600 flex items-center justify-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-emerald-600" /> {b.address}
                </p>
                <p className="text-gray-600 flex items-center justify-center gap-2">
                  <Phone className="h-5 w-5 text-emerald-600" /> {b.phone}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16" data-aos="fade-up">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-3">
            {t('contactMapTitle')}
          </h2>
          <p className="text-gray-600 text-center mb-8">
            {t('contactMapSubtitle')}
          </p>

          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 h-96 relative">
            <ContactMap />
            <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-4 py-2 rounded-lg shadow-md backdrop-blur-sm">
              <MapPin className="inline h-5 w-5 text-emerald-600 mr-2" />{' '}
              {t('contactHeadOfficeLabel')}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
