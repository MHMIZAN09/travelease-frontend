import { Link } from 'react-router-dom';
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

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-500 transition-colors"
              >
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
              <li>
                <Link to="/about" className="hover:text-emerald-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/destination" className="hover:text-emerald-400">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/package" className="hover:text-emerald-400">
                  Packages
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-emerald-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4 border-b border-emerald-500 inline-block pb-1">
              Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help" className="hover:text-emerald-400">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-emerald-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-emerald-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/cancellation-policy"
                  className="hover:text-emerald-400"
                >
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-emerald-400">
                  FAQs
                </Link>
              </li>
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
                <a href="tel:+8801759256744" className="hover:text-emerald-400">
                  +880 1759-256744
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-emerald-400" />
                <a
                  href="mailto:info@travelease.com"
                  className="hover:text-emerald-400"
                >
                  info@travelease.com
                </a>
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
