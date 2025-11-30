import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PackageCard from '../components/PackageCard';
import axios from 'axios';
import { SectionTitle } from '../components/SectionTitle';

export default function PackagesByDestination() {
  const { destinationId } = useParams();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/packages/destination/${destinationId}`
        );
        setPackages(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [destinationId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-xl text-emerald-500"></span>
      </div>
    );
  }

  if (!packages.length) {
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
          We couldn't find any travel packages at the moment. Please check back
          later or try refreshing the page.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <SectionTitle
          title="Packages by Destination"
          description="Explore our curated travel packages tailored to your favorite destinations."
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <PackageCard key={pkg._id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}
