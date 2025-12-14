import { useState, useEffect } from 'react';

const images = [
  'https://images.unsplash.com/photo-1658139657766-3ba1adc5a010?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1637419705926-9e790aeecf1c?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
    // You can redirect or filter results based on the search query
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden rounded-lg">
      {/* Carousel Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={images[currentIndex]}
          alt="Hero Background"
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold">
            Explore Beautiful Bangladesh
          </h1>
          <p className="text-xl text-[#F1F1F1] md:text-2xl max-w-2xl mx-auto">
            From the world's longest sea beach to the Sundarbans - Discover the
            natural wonders of Bangladesh
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="mt-6 flex justify-center gap-2"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destinations..."
              className="p-3 w-80 md:w-96 rounded-l-full focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white bg-black/30 placeholder-white"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-r-full hover:bg-emerald-600 transition"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
