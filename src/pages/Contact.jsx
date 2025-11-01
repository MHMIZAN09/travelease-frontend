import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import ContactMap from './ContactMap';

export default function Contact() {
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
      info: ['Saturday - Thursday: 9:00 AM - 6:00 PM', 'Friday: Closed'],
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-emerald-600 to-teal-600 text-white py-20 shadow-inner rounded-lg">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg max-w-2xl mx-auto text-emerald-100">
            Planning your dream trip across Bangladesh? Our team is here to help
            you every step of the way.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Side – Contact Information */}
            <div className="space-y-6">
              {ContactList.map((item, i) => (
                <div
                  key={i}
                  className="card bg-white shadow hover:shadow-lg transition p-6"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 ${item.bg} rounded-full flex items-center justify-center shrink-0`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {item.title}
                      </h3>
                      {item.info.map((line, idx) => (
                        <p key={idx} className="text-gray-600">
                          {line}
                        </p>
                      ))}
                      {item.note && (
                        <p className="text-sm text-gray-500 mt-2">
                          {item.note}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side – Contact Form */}
            <div className="lg:col-span-2">
              <div className="card shadow-lg p-8">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                  Send Us a Message
                </h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">First Name *</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Your first name"
                        className="input input-bordered w-full"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Last Name *</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Your last name"
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Email *</span>
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className="input input-bordered w-full"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Phone *</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+880 1711-123456"
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Interested Destination</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Cox's Bazar, Sundarbans, Sylhet..."
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">
                          Preferred Travel Date
                        </span>
                      </label>
                      <input
                        type="date"
                        className="input input-bordered w-full"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Number of Travelers</span>
                      </label>
                      <input
                        type="number"
                        min="1"
                        placeholder="2"
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Message / Special Requirements *
                      </span>
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Describe your trip plans, preferences, or special needs..."
                      className="textarea textarea-bordered w-full"
                    />
                  </div>

                  <button className="btn w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:opacity-90 text-white">
                    <Send className="mr-2 h-4 w-4 inline text-white" /> Send
                    Inquiry
                  </button>

                  <p className="text-sm text-gray-500 text-center mt-2">
                    We’ll get back to you within 24 hours (usually faster!)
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branch Offices */}
      <section className="py-16 bg-white rounded-lg">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3 text-gray-800">
            Our Branch Offices
          </h2>
          <p className="text-gray-600 mb-12">
            Visit us at one of our offices across Bangladesh
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BranchOffices.map((b, i) => (
              <div
                key={i}
                className="card shadow hover:shadow-md transition p-6"
              >
                <h3 className="text-lg font-semibold mb-3 text-emerald-700">
                  {b.city}
                </h3>
                <p className="flex items-start justify-center gap-2 text-sm text-gray-600 mb-1">
                  <MapPin className="h-4 w-4 text-emerald-600 shrink-0 mt-1" />
                  {b.address}
                </p>
                <p className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4 text-emerald-600" />
                  {b.phone}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Our Locations
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            Explore our head office and branch locations across Bangladesh
          </p>

          <div className="relative rounded-xl shadow-lg overflow-hidden h-96">
            {/* Map Component */}
            <ContactMap />
            <div className="absolute top-4 left-4 bg-white bg-opacity-80 px-4 py-2 rounded-md shadow-md">
              <MapPin className="inline h-5 w-5 text-emerald-600 mr-2" />
              Dhaka Head Office
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
