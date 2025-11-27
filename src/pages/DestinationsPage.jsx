import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DestinationCard from '../components/DestinationCard';
import { toast } from 'react-toastify';
import { SectionTitle } from '../components/SectionTitle';

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDivision, setFilterDivision] = useState('');

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/v1/destinations'
        );
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.destinations;
        setDestinations(data || []);
        console.log('Fetched destinations:', data);
      } catch (error) {
        toast.error('Failed to fetch destinations. Please try again later.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  // Extract unique divisions dynamically
  const divisions = [...new Set(destinations.map((dest) => dest.division))];

  // Filtered & searched destinations
  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch = dest.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDivision = filterDivision
      ? dest.division === filterDivision
      : true;
    return matchesSearch && matchesDivision;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-xl text-emerald-500"></span>
      </div>
    );
  }

  if (!destinations.length) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="No destinations"
          className="w-40 h-40 mb-4 opacity-60"
        />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          No Destinations Found
        </h2>
        <p className="text-gray-500 max-w-sm">
          We couldn't find any destinations at the moment. Please check back
          later or try refreshing the page.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <SectionTitle
        badgeText="Explore Bangladesh"
        title="Our Destinations"
        description="From the longest sea beach to the Sundarbans mangrove forest – discover Bangladesh's natural treasures"
      />

      {/* Search & Filter Section */}
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 lg:justify-center lg:gap-8">
        <input
          type="text"
          placeholder="Search destinations..."
          className="input input-bordered w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="select select-bordered w-full md:w-1/4"
          value={filterDivision}
          onChange={(e) => setFilterDivision(e.target.value)}
        >
          <option value="">Filter by Division</option>
          {divisions.map((division) => (
            <option key={division} value={division}>
              {division}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-8">
        <p className="text-gray-600">
          Showing {filteredDestinations.length} of {destinations.length}{' '}
          destinations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDestinations.length ? (
          filteredDestinations.map((dest) => (
            <DestinationCard key={dest.id || dest._id} destination={dest} />
          ))
        ) : (
          <div className="col-span-full flex flex-col justify-center items-center text-center p-8 bg-white rounded-lg shadow">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              alt="No results"
              className="w-32 h-32 mb-4 opacity-50"
            />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No destinations match your search/filter
            </h3>
            <p className="text-gray-500 max-w-sm">
              Try adjusting your search or filter options to find the perfect
              destination.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
