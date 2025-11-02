import { Hero } from '../components/Hero';
import { SectionTitle } from '../components/SectionTitle';
import Contact from './Contact';
import { Newsletter } from './Newsletter';
import PopularDestinations from './PopularDestinations';

export default function Home() {
  return (
    <div>
      <Hero />
      <SectionTitle
        badgeText="Popular Destinations"
        title="Explore Bangladesh"
        description="Discover the most breathtaking destinations across Bangladesh from beaches to hills"
      />
      <PopularDestinations />
      <Newsletter />
    </div>
  );
}
