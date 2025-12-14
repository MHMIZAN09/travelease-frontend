import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom'; // React Router Link

export default function TopDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await axios.get(
          'https://travelease-backend.vercel.app/api/destinations'
        );
        if (res.data.success) {
          const topDest = res.data.data
            .sort((a, b) => b.averageRating - a.averageRating)
            .slice(0, 6); // Top 6 destinations
          setDestinations(topDest);
        }
      } catch (error) {
        console.error('Error fetching destinations:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-lg font-medium text-gray-700">
        Loading top destinations...
      </p>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and See All on same line */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Top Destinations</h2>
          <Link
            to="/destination"
            className="text-teal-600 font-semibold hover:underline transition-colors duration-200"
          >
            See All
          </Link>
        </div>

        {/* Destinations grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, index) => (
            <div
              key={dest._id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="relative bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Image with overlay */}
              <div className="relative">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow ring-1 ring-teal-200 flex items-center gap-1 font-semibold text-sm">
                  <Star className="w-4 h-4 text-yellow-400" />
                  {dest.averageRating.toFixed(1)}
                </div>
              </div>

              {/* Card content */}
              <div className="p-5 space-y-2">
                <h3 className="text-xl font-bold text-gray-800 hover:text-teal-600 transition-colors duration-300">
                  {dest.name}
                </h3>
                <p className="text-sm text-gray-500">{dest.division}</p>
                <p className="text-gray-700 text-sm line-clamp-3">
                  {dest.description}
                </p>

                <div className="mt-3 flex flex-col gap-1 text-gray-600 text-sm">
                  <span>
                    <strong>Best Time:</strong> {dest.bestTime}
                  </span>
                  <span>
                    <strong>How to Reach:</strong> {dest.howToReach}
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
