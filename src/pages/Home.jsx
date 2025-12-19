import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import AboutSection from '../components/AboutSection';
import { Hero } from '../components/Hero';

import { Newsletter } from './Newsletter';

import TopDestinations from './TopDestinations';

import DiscountBanner from '../components/DiscountBanner';

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <Hero />

      {/* Top Destination Section */}
      <div data-aos="fade-up" data-aos-delay="200" className="mt-8">
        <TopDestinations />
      </div>

      <div data-aos="fade-up" data-aos-delay="200" className="mt-16">
        <DiscountBanner />
      </div>
      {/* About Section */}
      <div data-aos="fade-up" data-aos-delay="100" className="mt-16">
        <AboutSection title="About Us" />
      </div>

      {/* Destinations Section */}

      {/* Newsletter Section */}
      <div data-aos="fade-up" data-aos-delay="300">
        <Newsletter />
      </div>
    </div>
  );
}
