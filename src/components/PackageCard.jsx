import { useNavigate } from 'react-router-dom';
import { Star, Users, MapPin, Clock } from 'lucide-react';

export default function PackageCard({ pkg }) {
  const navigate = useNavigate();

  const destinationName = pkg.destination?.name || 'Unknown';
  const durationText =
    pkg.duration?.days && pkg.duration?.nights
      ? `${pkg.duration.days}D / ${pkg.duration.nights}N`
      : 'N/A';

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 h-full">
      {/* Image Section */}
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={pkg.images?.[0] || 'https://via.placeholder.com/400x300'}
          alt={pkg.title || 'Package'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-yellow-400 text-white px-2 py-1 rounded-md flex items-center gap-1 text-xs font-semibold shadow-md">
          <Star className="h-3 w-3" /> {pkg.rating ?? 0}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {pkg.title || 'Untitled Package'}
          </h3>
          <p className="text-gray-500 text-xs flex items-center gap-1">
            <MapPin className="h-3 w-3 text-emerald-500" /> {destinationName}
          </p>
          <p className="text-gray-400 text-xs">
            {pkg.reviews?.length ?? 0} reviews
          </p>

          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1 text-gray-500 text-xs">
              <Clock className="h-3 w-3 text-emerald-500" /> {durationText}
            </div>
            {pkg.maxPeople && (
              <div className="flex items-center gap-1 text-gray-500 text-xs">
                <Users className="h-3 w-3 text-emerald-500" /> {pkg.maxPeople}{' '}
                pax
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-emerald-600 font-bold text-lg">
            ৳{pkg.discountedPrice ?? pkg.price ?? 'N/A'}
          </div>
          <button
            onClick={() => navigate(`/packages/${pkg._id}`)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
