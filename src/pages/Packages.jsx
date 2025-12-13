import { useEffect, useState } from 'react';
import axios from 'axios';
import PackageCard from '../components/PackageCard';
import { toast } from 'react-toastify';
import { SectionTitle } from '../components/SectionTitle';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true });
  }, []);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/packages');
        setPackages(res.data.data || []);
        console.log(res.data.data);
      } catch (error) {
        toast.error('Failed to fetch packages. Please try again later.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  // Unique categories based on populated destination
  const categories = [
    ...new Set(
      packages.map((pkg) => pkg.destination?.category).filter(Boolean)
    ),
  ];

  const displayedPackages = packages.filter((pkg) => {
    const matchesSearch = pkg.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory
      ? pkg.category === filterCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-xl text-emerald-500"></span>
      </div>
    );

  if (!packages.length)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="No packages"
          className="w-40 h-40 mb-4 opacity-60"
        />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          No Packages Found
        </h2>
        <p className="text-gray-500 max-w-sm">
          We couldn't find any travel packages at the moment.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <SectionTitle
        badgeText="Best Deals"
        title="Top Travel Packages"
        description="Find the perfect tour package for your next adventure across Bangladesh"
      />

      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 lg:justify-center lg:gap-8">
        <input
          type="text"
          placeholder="Search packages..."
          className="input input-bordered w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="select select-bordered w-full md:w-1/4"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">Filter by Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-8 text-gray-600">
        Showing {displayedPackages.length} of {packages.length} packages
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedPackages.length ? (
          displayedPackages.map((pkg) => (
            <PackageCard key={pkg._id} pkg={pkg} />
          ))
        ) : (
          <div className="col-span-full flex flex-col justify-center items-center text-center p-8 bg-white rounded-lg shadow">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              alt="No results"
              className="w-32 h-32 mb-4 opacity-50"
            />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No packages match your search/filter
            </h3>
            <button
              className="px-5 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition mt-4"
              onClick={() => {
                setSearchTerm('');
                setFilterCategory('');
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
