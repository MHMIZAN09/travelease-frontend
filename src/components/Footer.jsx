import {
  Facebook,
  Youtube,
  Twitter,
  Instagram,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-linear-to-b from-slate-900 via-slate-950 to-black text-gray-400">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-2xl font-bold mb-4 tracking-wide">
              TravelEase
            </h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Explore the beauty and culture of Bangladesh with comfort and
              confidence. TravelEase is your trusted companion for unforgettable
              journeys.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-emerald-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-sky-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-pink-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-red-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4 border-b border-emerald-500 inline-block pb-1">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {['About Us', 'Destinations', 'Packages', 'Blog', 'Contact'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-emerald-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4 border-b border-emerald-500 inline-block pb-1">
              Support
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                'Help Center',
                'Privacy Policy',
                'Terms of Service',
                'Cancellation Policy',
                'FAQs',
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4 border-b border-emerald-500 inline-block pb-1">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-emerald-400 mt-0.5" />
                <span>House 45, Road 12, Banani, Dhaka 1213, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-emerald-400" />
                <span>+880 1759-256744</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-emerald-400" />
                <span>info@travelease.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()}{' '}
            <span className="text-emerald-400 font-semibold">TravelEase</span>.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
