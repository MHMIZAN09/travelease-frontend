import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PackagesByDestination() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/packages');
        if (res.data.success) {
          // Sort by rating and take top 6 packages
          const topPackages = res.data.data
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 6);
          setPackages(topPackages);
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-lg font-medium text-gray-700">
        Loading packages...
      </p>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and See All on same line */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-emerald-600">Top Packages</h2>
          <Link
            to="/packages"
            className="text-teal-600 font-semibold hover:underline transition-colors duration-200"
          >
            See All Packages
          </Link>
        </div>

        {/* Packages grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={pkg._id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="relative bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={pkg.images?.[0] || '/placeholder.jpg'}
                  alt={pkg.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow ring-1 ring-teal-200 flex items-center gap-1 font-semibold text-sm">
                  <Star className="w-4 h-4 text-yellow-400" />
                  {pkg.rating.toFixed(1)}
                </div>
              </div>

              {/* Card content */}
              <div className="p-5 space-y-2">
                <h3 className="text-xl font-bold text-emerald-600 hover:text-teal-600 transition-colors duration-300">
                  {pkg.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {pkg.destination?.category || 'Unknown'}
                </p>
                <p className="text-gray-700 text-sm line-clamp-3">
                  {pkg.description}
                </p>

                <div className="mt-3 flex flex-col gap-1 text-gray-600 text-sm">
                  <span>
                    <strong>Duration:</strong> {pkg.duration?.days} Days /{' '}
                    {pkg.duration?.nights} Nights
                  </span>
                  <span>
                    <strong>Price:</strong> ${pkg.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
