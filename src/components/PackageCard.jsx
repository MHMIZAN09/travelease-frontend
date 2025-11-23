import { Star, Users, MapPin, Clock } from 'lucide-react';

export default function PackageCard({ pkg }) {
  if (!pkg) return null;

  return (
    <div className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={pkg.images?.[0] || pkg.image || ''}
          alt={pkg.title || 'Package Image'}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {pkg.category && (
          <div className="absolute top-4 left-4 bg-white/90 text-gray-800 text-xs px-2 py-1 rounded-md shadow">
            {pkg.category}
          </div>
        )}
        {pkg.discountedPrice && pkg.discountedPrice < pkg.price && (
          <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-md shadow">
            {Math.round(((pkg.price - pkg.discountedPrice) / pkg.price) * 100)}%
            OFF
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="text-base font-semibold">{pkg.title}</h3>

        <p className="text-gray-600 text-xs flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {pkg.destination || 'Unknown'}
        </p>

        <p className="text-gray-600 text-xs">{pkg.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="h-3 w-3" />
            <span>{pkg.rating ?? 0}</span>
          </div>
          <span>({pkg.totalReviews ?? 0} reviews)</span>
        </div>

        {/* Duration & Max People */}
        {pkg.availability && (
          <div className="flex items-center gap-3 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {pkg.duration || 'N/A'}
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              Max {pkg.availability.slots || 'N/A'}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 pt-0 flex items-center justify-between">
        <div>
          <div className="text-xs text-gray-500">Starting from</div>
          <div className="flex items-baseline gap-2">
            <span className="text-emerald-600 font-semibold">
              ৳{pkg.discountedPrice ?? pkg.price}
            </span>
            {pkg.discountedPrice && pkg.discountedPrice < pkg.price && (
              <span className="text-xs text-gray-400 line-through">
                ৳{pkg.price}
              </span>
            )}
          </div>
        </div>
        <button className="btn btn-success text-white">Book</button>
      </div>
    </div>
  );
}
