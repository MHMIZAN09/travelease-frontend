import AboutSection from '../components/AboutSection';
import { Hero } from '../components/Hero';
import { SectionTitle } from '../components/SectionTitle';
import { Newsletter } from './Newsletter';

export default function Home() {
  return (
    <div>
      <Hero />
      <SectionTitle
        badgeText="Popular Destinations"
        title="Explore Bangladesh"
        description="Discover the most breathtaking destinations across Bangladesh from beaches to hills"
      />
      <AboutSection title="About Us" />
      <Newsletter />
    </div>
  );
}
