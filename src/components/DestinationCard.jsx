import { Link } from 'react-router-dom';
import { FaLocationDot } from 'react-icons/fa6';
import { FaClock } from 'react-icons/fa';
import { IoIosAirplane } from 'react-icons/io';

export default function DestinationCard({ destination }) {
  console.log(destination);
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer">
      <figure className="relative h-64 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        {/* top left side one tag show  */}
        <div className="absolute top-2 left-2 bg-emerald-300 text-white text-xs px-2 py-1 rounded-md shadow-lg">
          {destination.tags[0].toUpperCase()}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-4">
          <h2 className="text-white text-lg font-semibold">
            <FaLocationDot className="inline-block mr-2 text-emerald-600" />
            {destination.name}
          </h2>
        </div>
      </figure>
      <div className="card-body">
        {/* <h2 className="card-title">
            <FaLocationDot className="text-emerald-600 mr-2" />
            {destination.name}
          </h2> */}
        <p className="text-gray-500 text-sm mb-2">
          {destination.division} Division
        </p>
        <p className="text-gray-600 text-sm mb-2">{destination.description}</p>
        <div className="mb-4">
          <span className="block text-sm text-gray-500 mb-2">
            Top Attractions:
          </span>
          <div className="flex flex-wrap gap-2">
            {destination.attractions?.map((attr, idx) => (
              <div key={idx} className="badge badge-outline text-xs">
                {attr}
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <span className="block text-sm text-gray-500 mb-2">Tags:</span>
          <div className="flex flex-wrap gap-2">
            {destination.tags?.map((tag, idx) => (
              <div key={idx} className="badge badge-outline text-xs">
                {tag}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-2 text-sm text-gray-500">
          {destination.bestTime && (
            <div className="flex items-center gap-1">
              <FaClock className="h-4 w-4" />
              <span>Best Time: {destination.bestTime}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-2 text-sm text-gray-500">
          {destination.howToReach && (
            <div className="flex items-center gap-1">
              <IoIosAirplane className="h-4 w-4" />
              <span>How to Reach: {destination.howToReach}</span>
            </div>
          )}
        </div>

        <div className="divider "></div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">
            {destination.packages} packages
          </span>
          <span className="text-emerald-600 font-semibold">
            <Link to={`/destinations/${destination.name}`}>View Details</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
