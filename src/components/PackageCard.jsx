import { useNavigate } from 'react-router-dom';
import { Star, Users, MapPin, Clock } from 'lucide-react';

export default function PackageCard({ pkg }) {
  const navigate = useNavigate();

  const destinationName =
    typeof pkg.destination === 'object'
      ? pkg.destination.name
      : pkg.destination || 'Unknown';

  return (
    <div className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={pkg.images?.[0] || ''}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-base font-semibold">{pkg.title}</h3>
        <p className="text-gray-600 text-xs flex items-center gap-1">
          <MapPin className="h-3 w-3" /> {destinationName}
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="h-3 w-3" /> {pkg.rating ?? 0}
          </div>
          <span>({pkg.totalReviews ?? 0} reviews)</span>
        </div>
      </div>

      <div className="p-4 pt-0 flex items-center justify-between">
        <div className="text-emerald-600 font-semibold">
          ৳{pkg.discountedPrice ?? pkg.price}
        </div>
        <button
          className="btn btn-success text-white"
          onClick={() => navigate(`/packages/${pkg._id}`)}
        >
          Details
        </button>
      </div>
    </div>
  );
}
