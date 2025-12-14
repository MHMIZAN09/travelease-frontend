import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import AboutSection from '../components/AboutSection';
import { Hero } from '../components/Hero';
import { SectionTitle } from '../components/SectionTitle';
import { Newsletter } from './Newsletter';
import { Testimonials } from './Testimonials';
import TopDestinations from './TopDestinations';
import PackagesByDestination from './PackagesByDestination';

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <Hero />

      <div data-aos="fade-up">
        <TopDestinations />
      </div>

      <PackagesByDestination />

      {/* About Section */}
      <div data-aos="fade-up" data-aos-delay="100">
        <AboutSection title="About Us" />
      </div>

      {/* Newsletter Section */}
      <div data-aos="fade-up" data-aos-delay="300">
        <Newsletter />
      </div>
    </div>
  );
}
