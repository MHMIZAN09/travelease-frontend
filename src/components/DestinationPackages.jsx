import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PackageCard from '../components/PackageCard';

export default function DestinationPackages() {
  const { id } = useParams(); // destination id
  const [packages, setPackages] = useState([]);
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/packages?destination=${id}`
        );
        setPackages(res.data.data || []);

        // Fetch destination details
        const destRes = await axios.get(
          `http://localhost:5000/api/destinations/${id}`
        );
        setDestination(destRes.data.data);
      } catch (error) {
        toast.error('Failed to fetch packages.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-xl text-emerald-500"></span>
      </div>
    );

  if (!packages.length)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          No Packages Found for {destination?.name || 'this destination'}
        </h2>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Packages in {destination?.name || 'Selected Destination'}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <PackageCard key={pkg._id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}
