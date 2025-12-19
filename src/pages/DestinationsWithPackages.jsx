import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DestinationCard from '../components/DestinationCard';
import PackageCard from '../components/PackageCard';
import { toast } from 'react-toastify';
import { SectionTitle } from '../components/SectionTitle';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function DestinationsWithPackages() {
  const [destinations, setDestinations] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [durationRange, setDurationRange] = useState([0, 10]);
  const [sortOption, setSortOption] = useState('featured');

  const tourTypes = [
    'Adventure',
    'Nature',
    'Cultural',
    'Beach',
    'Food',
    'City',
    'Cruise',
  ];

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [destRes, pkgRes] = await Promise.all([
          axios.get('http://localhost:5000/api/destinations'),
          axios.get('http://localhost:5000/api/packages'),
        ]);
        setDestinations(destRes.data.data || []);
        setPackages(pkgRes.data.data || []);
      } catch (error) {
        toast.error('Failed to fetch data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-xl text-orange-500"></span>
      </div>
    );
  }

  // Filter packages based on selected destination
  const filteredPackages = packages
    .filter((pkg) => {
      if (
        selectedDestination &&
        pkg.destination.name !== selectedDestination.name
      )
        return false;

      // Type filter
      if (
        selectedTypes.length > 0 &&
        !selectedTypes.includes(pkg.destination.category)
      )
        return false;

      // Price filter
      if (pkg.price < priceRange[0] || pkg.price > priceRange[1]) return false;

      // Duration filter
      if (
        pkg.duration.days < durationRange[0] ||
        pkg.duration.days > durationRange[1]
      )
        return false;

      // Search filter
      if (
        searchText &&
        !pkg.title.toLowerCase().includes(searchText.toLowerCase()) &&
        !pkg.destination.name.toLowerCase().includes(searchText.toLowerCase())
      )
        return false;

      return true;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'duration-asc':
          return a.duration.days - b.duration.days;
        case 'duration-desc':
          return b.duration.days - a.duration.days;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 max-w-7xl mx-auto">
      <SectionTitle
        title="Explore Bangladesh"
        description="Click a destination to view all packages"
      />

      {/* Show Destinations if no destination selected */}
      {!selectedDestination && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {destinations.map((destination, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedDestination(destination)}
              className="cursor-pointer"
            >
              <DestinationCard
                destination={destination}
                packageCount={
                  packages.filter(
                    (pkg) => pkg.destination.name === destination.name
                  ).length
                }
              />
            </div>
          ))}
        </div>
      )}

      {/* Show Packages if a destination is selected */}
      {selectedDestination && (
        <div>
          <button
            onClick={() => setSelectedDestination(null)}
            className="mb-4 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
          >
            ← Back to Destinations
          </button>

          <h2 className="text-2xl font-bold mb-4">
            Packages in {selectedDestination.name}
          </h2>

          <div className="flex flex-col lg:flex-row gap-8 mb-6">
            {/* Sidebar Filters */}
            <aside className="lg:w-64 bg-white rounded-lg shadow p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Search</h3>
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search packages"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Tour Type</h3>
                <div className="space-y-2">
                  {tourTypes.map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() =>
                          setSelectedTypes((prev) =>
                            prev.includes(type)
                              ? prev.filter((t) => t !== type)
                              : [...prev, type]
                          )
                        }
                        className="checkbox checkbox-sm border-gray-400"
                      />
                      <span className="text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3">
                  Price Range
                </h3>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                  className="range range-sm"
                />
                <div className="text-gray-700 mt-1">
                  {priceRange[0]} - {priceRange[1]}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3">
                  Duration (Days)
                </h3>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={durationRange[1]}
                  onChange={(e) =>
                    setDurationRange([0, Number(e.target.value)])
                  }
                  className="range range-sm"
                />
                <div className="text-gray-700 mt-1">
                  1 - {durationRange[1]} days
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">
                  {filteredPackages.length} results
                </p>
                <select
                  className="select select-bordered border-gray-300"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="duration-asc">Duration: Short to Long</option>
                  <option value="duration-desc">Duration: Long to Short</option>
                </select>
              </div>

              <div className="space-y-6">
                {filteredPackages.length > 0 ? (
                  filteredPackages.map((pkg, idx) => (
                    <div
                      key={pkg._id}
                      data-aos="fade-up"
                      data-aos-delay={idx * 100}
                    >
                      <PackageCard pkg={pkg} />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No packages found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
