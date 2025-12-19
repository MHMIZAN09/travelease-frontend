/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ContactMap from './ContactMap';
import { SectionTitle } from '../components/SectionTitle';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Contact() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    destination: '',
    travelDate: '',
    travelers: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.email || !formData.message) {
      toast.error(t('contactRequired', 'Please fill required fields'));
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `https://travelease-backend.vercel.app/api/contacts`,
        formData
      );
      toast.success(t('contactSuccess', 'Message sent successfully'));

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        destination: '',
        travelDate: '',
        travelers: '',
        message: '',
      });
    } catch (error) {
      toast.error(t('contactError', 'Failed to send message'));
    } finally {
      setLoading(false);
    }
  };

  const ContactList = [
    {
      icon: <Phone className="h-6 w-6 text-emerald-600" />,
      title: t('contactPhone'),
      info: ['+880 1711-123456', '+880 1812-654321'],
      bg: 'bg-emerald-100',
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-teal-600" />,
      title: t('contactWhatsApp'),
      info: ['+880 1711-123456'],
      bg: 'bg-teal-100',
    },
    {
      icon: <Mail className="h-6 w-6 text-purple-600" />,
      title: t('contactEmail'),
      info: ['info@travelease.com', 'booking@travelease.com'],
      bg: 'bg-purple-100',
    },
    {
      icon: <MapPin className="h-6 w-6 text-green-600" />,
      title: t('contactHeadOffice'),
      info: ['Banani, Dhaka, Bangladesh'],
      bg: 'bg-green-100',
    },
    {
      icon: <Clock className="h-6 w-6 text-orange-600" />,
      title: t('contactOfficeHours'),
      info: [t('contactOfficeSatThu'), t('contactOfficeFri')],
      bg: 'bg-orange-100',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <SectionTitle
        title={t('contactHeroTitle')}
        description={t('contactHeroSubtitle')}
      />

      {/* Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Info */}
          <div className="space-y-6">
            {ContactList.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md p-6 border"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="flex gap-4">
                  <div
                    className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    {item.info.map((line, idx) => (
                      <p key={idx} className="text-gray-600">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2" data-aos="fade-left">
            <div className="bg-white rounded-2xl shadow-xl p-10 border">
              <h2 className="text-2xl font-semibold mb-6">
                {t('contactFormTitle')}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder={t('contactFormFirstName')}
                    className="input input-bordered w-full rounded-xl"
                    required
                  />
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder={t('contactFormLastName')}
                    className="input input-bordered w-full rounded-xl"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('contactFormEmail')}
                    className="input input-bordered w-full rounded-xl"
                    required
                  />
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('contactFormPhone')}
                    className="input input-bordered w-full rounded-xl"
                    required
                  />
                </div>

                <input
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder={t('contactFormDestination')}
                  className="input input-bordered w-full rounded-xl"
                  required
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="date"
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={handleChange}
                    className="input input-bordered w-full rounded-xl"
                    required
                  />
                  <input
                    type="number"
                    min="1"
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleChange}
                    placeholder={t('contactFormTravelers')}
                    className="input input-bordered w-full rounded-xl"
                    required
                  />
                </div>

                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contactFormMessage')}
                  className="textarea textarea-bordered w-full rounded-xl"
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold flex justify-center gap-2 disabled:opacity-60"
                >
                  <Send className="h-5 w-5" />
                  {loading
                    ? t('sending', 'Sending...')
                    : t('contactFormButton')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <ContactMap />
        </div>
      </section>
    </div>
  );
}
