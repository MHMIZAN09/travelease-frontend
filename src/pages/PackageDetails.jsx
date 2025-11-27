import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Star, Users, MapPin, Clock } from 'lucide-react';
import axios from 'axios';

const formatDate = (date) => {
  if (!date) return 'N/A';
  const d = new Date(date);
  return Number.isNaN(d.getTime()) ? 'Invalid Date' : d.toLocaleDateString();
};

export default function PackageDetails() {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/packages/${id}`
        );
        console.log('Fetched package:', res.data);
        setPkg(res.data);
      } catch (err) {
        console.error('Error fetching package:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!pkg) return <div>Package not found</div>;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Image */}
        <div className="col-span-1">
          <img
            src={pkg.images?.[0] || ''}
            alt={pkg.title}
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Right: Details */}
        <div className="col-span-2 space-y-4">
          <h1 className="text-3xl font-bold">{pkg.title}</h1>
          <p className="text-gray-600">{pkg.description}</p>

          {/* Destination */}
          <div className="flex flex-col gap-1">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <strong>Destination:</strong> {pkg.destination?.name || 'N/A'}
            </span>
            <span>
              <strong>Division:</strong> {pkg.destination?.division || 'N/A'}
            </span>
            <span>
              <strong>Description:</strong>{' '}
              {pkg.destination?.description || 'N/A'}
            </span>
            <span>
              <strong>Tags:</strong>{' '}
              {pkg.destination?.tags?.join(', ') || 'N/A'}
            </span>
          </div>

          {/* Ratings & Availability */}
          <div className="flex gap-6 text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="text-yellow-500 h-4 w-4" />
              {pkg.rating ?? 0} ({pkg.totalReviews ?? 0} reviews)
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formatDate(pkg.availability?.startDate)} -{' '}
              {formatDate(pkg.availability?.endDate)}
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" /> Max{' '}
              {pkg.availability?.slots ?? 'N/A'}
            </div>
          </div>

          {/* Overview */}
          <div>
            <h2 className="font-semibold text-lg">Overview</h2>
            <p>{pkg.overview || 'N/A'}</p>
          </div>

          {/* Itinerary */}
          <div>
            <h2 className="font-semibold text-lg">Itinerary</h2>
            <ul className="list-disc list-inside">
              {pkg.itinerary?.length > 0 ? (
                pkg.itinerary.map((item) => (
                  <li key={item._id}>
                    <strong>Day {item.day}:</strong> {item.title} -{' '}
                    {item.description}
                  </li>
                ))
              ) : (
                <li>N/A</li>
              )}
            </ul>
          </div>

          {/* Inclusions */}
          <div>
            <h2 className="font-semibold text-lg">Inclusions</h2>
            <ul className="list-disc list-inside">
              {pkg.inclusions?.length > 0 ? (
                pkg.inclusions.map((item, idx) => <li key={idx}>{item}</li>)
              ) : (
                <li>N/A</li>
              )}
            </ul>
          </div>

          {/* Exclusions */}
          <div>
            <h2 className="font-semibold text-lg">Exclusions</h2>
            <ul className="list-disc list-inside">
              {pkg.exclusions?.length > 0 ? (
                pkg.exclusions.map((item, idx) => <li key={idx}>{item}</li>)
              ) : (
                <li>N/A</li>
              )}
            </ul>
          </div>

          {/* Price */}
          <div className="text-2xl font-bold text-emerald-600 mt-4">
            Price: ৳{pkg.discountedPrice ?? pkg.price}
          </div>
        </div>
      </div>
    </div>
  );
}
