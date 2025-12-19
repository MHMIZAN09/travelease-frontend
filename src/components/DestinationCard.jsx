import { FaLocationDot } from 'react-icons/fa6';
import { FaClock } from 'react-icons/fa';
import { IoIosAirplane } from 'react-icons/io';

export default function DestinationCard({ destination, packageCount }) {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden h-full">
      {/* Image Section */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={destination.images?.[0] || 'https://via.placeholder.com/400x300'}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* Top-left Tag */}
        {destination.tags?.[0] && (
          <div className="absolute top-3 left-3 bg-emerald-500 text-white text-xs px-3 py-1 rounded-md shadow-md uppercase font-semibold">
            {destination.tags[0]}
          </div>
        )}
        {/* Bottom Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h2 className="text-white text-lg font-bold flex items-center justify-between">
            <span className="flex items-center">
              <FaLocationDot className="mr-2 text-emerald-400" />
              {destination.name}
            </span>
            {packageCount !== undefined && (
              <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-md">
                {packageCount} package{packageCount !== 1 ? 's' : ''}
              </span>
            )}
          </h2>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 flex flex-col justify-between p-5 bg-gray-50">
        <div>
          <p className="text-emerald-600 font-semibold text-sm mb-1">
            {destination.division} Division
          </p>
          <p className="text-gray-700 text-sm mb-3 line-clamp-3">
            {destination.description}
          </p>

          {/* Top Attractions */}
          {destination.attractions?.length > 0 && (
            <div className="mb-3">
              <span className="block text-gray-500 text-xs font-medium mb-1">
                Top Attractions:
              </span>
              <div className="flex flex-wrap gap-2">
                {destination.attractions.map((attr, idx) => (
                  <span
                    key={idx}
                    className="badge badge-outline badge-sm text-xs bg-white border-gray-200 text-gray-600"
                  >
                    {attr}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {destination.tags?.length > 0 && (
            <div className="mb-3">
              <span className="block text-gray-500 text-xs font-medium mb-1">
                Tags:
              </span>
              <div className="flex flex-wrap gap-2">
                {destination.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="badge badge-outline badge-sm text-xs bg-white border-gray-200 text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Info */}
          <div className="flex flex-col md:flex-row gap-4 mt-2 text-gray-600 text-sm">
            {destination.bestTime && (
              <div className="flex items-center gap-1">
                <FaClock className="h-4 w-4 text-emerald-500" />
                <span>Best Time: {destination.bestTime}</span>
              </div>
            )}
            {destination.howToReach && (
              <div className="flex items-center gap-1">
                <IoIosAirplane className="h-4 w-4 text-emerald-500" />
                <span>How to Reach: {destination.howToReach}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
