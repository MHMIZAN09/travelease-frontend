import { useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ContactMap from './ContactMap';
import { SectionTitle } from '../components/SectionTitle';

export default function Contact() {
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
      title: 'Phone',
      info: ['+880 1711-123456', '+880 1812-654321'],
      note: '9 AM - 9 PM (Daily)',
      bg: 'bg-emerald-100',
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-teal-600" />,
      title: 'WhatsApp',
      info: ['+880 1711-123456'],
      note: 'Available 24/7',
      bg: 'bg-teal-100',
    },
    {
      icon: <Mail className="h-6 w-6 text-purple-600" />,
      title: 'Email',
      info: ['info@travelease.com', 'booking@travelease.com'],
      note: 'Response within 24 hours',
      bg: 'bg-purple-100',
    },
    {
      icon: <MapPin className="h-6 w-6 text-green-600" />,
      title: 'Head Office',
      info: ['House 45, Road 12, Banani, Dhaka 1213, Bangladesh'],
      bg: 'bg-green-100',
    },
    {
      icon: <Clock className="h-6 w-6 text-orange-600" />,
      title: 'Office Hours',
      info: ['Saturday–Thursday: 9:00 AM – 6:00 PM', 'Friday: Closed'],
      bg: 'bg-orange-100',
    },
  ];

  const BranchOffices = [
    {
      city: "Cox's Bazar Office",
      address: "Hotel Motel Zone, Cox's Bazar 4700",
      phone: '+880 1911-234567',
    },
    {
      city: 'Sylhet Office',
      address: 'Zindabazar, Sylhet 3100',
      phone: '+880 1611-345678',
    },
    {
      city: 'Chittagong Office',
      address: 'Agrabad, Chittagong 4100',
      phone: '+880 1511-456789',
    },
  ];

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div data-aos="fade-down">
        <SectionTitle
          title="Contact Us"
          description="We're Here to Help: Get in Touch with TraveLease"
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
                Send Us a Message
              </h2>

              <form className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="First Name *"
                    className="input input-bordered w-full rounded-xl"
                  />
                  <input
                    type="text"
                    placeholder="Last Name *"
                    className="input input-bordered w-full rounded-xl"
                  />
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="email"
                    placeholder="Email Address *"
                    className="input input-bordered w-full rounded-xl"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    className="input input-bordered w-full rounded-xl"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Interested Destination (Optional)"
                  className="input input-bordered w-full rounded-xl"
                />

                {/* Date + Travelers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="date"
                    className="input input-bordered w-full rounded-xl"
                  />
                  <input
                    type="number"
                    min="1"
                    placeholder="Number of Travelers"
                    className="input input-bordered w-full rounded-xl"
                  />
                </div>

                <textarea
                  rows={5}
                  placeholder="Tell us about your trip or special requirements..."
                  className="textarea textarea-bordered w-full rounded-xl"
                />

                <button className="w-full py-3 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:opacity-90 transition flex items-center justify-center gap-2">
                  <Send className="h-5 w-5" /> Send Inquiry
                </button>

                <p className="text-sm text-gray-500 text-center">
                  We respond within 24 hours (usually faster!)
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
            Our Branch Offices
          </h2>
          <p
            className="text-gray-600 mb-10"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Visit any of our regional offices across Bangladesh
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
      <section className="py-16 " data-aos="fade-up">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-3">
            Our Locations on Map
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Find our head and branch offices easily
          </p>

          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 h-96 relative">
            <ContactMap />
            <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-4 py-2 rounded-lg shadow-md backdrop-blur-sm">
              <MapPin className="inline h-5 w-5 text-emerald-600 mr-2" /> Dhaka
              Head Office
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
