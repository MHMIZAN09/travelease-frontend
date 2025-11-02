import { Search, Calendar, MapPin, Users } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1658139657766-3ba1adc5a010?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3glMjBiYXphciUyMGJlYWNoJTIwYmFuZ2xhZGVzaHxlbnwxfHx8fDE3NjA5NjYyNTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Cox's Bazar Beach"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/30 to-black/50" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold">
            Explore Beautiful Bangladesh
          </h1>
          <p className="text-white/90 text-xl md:text-2xl max-w-2xl mx-auto">
            From the world's longest sea beach to the Sundarbans - Discover the
            natural wonders of Bangladesh
          </p>

          {/* Search Card */}
          <div className="card bg-white/90 shadow-xl backdrop-blur-md p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Destination */}
              <div className="form-control">
                <label className="label flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="label-text text-gray-600">Destination</span>
                </label>
                <input
                  type="text"
                  placeholder="Where to?"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Check In */}
              <div className="form-control">
                <label className="label flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="label-text text-gray-600">Check In</span>
                </label>
                <input type="date" className="input input-bordered w-full" />
              </div>

              {/* Check Out */}
              <div className="form-control">
                <label className="label flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="label-text text-gray-600">Check Out</span>
                </label>
                <input type="date" className="input input-bordered w-full" />
              </div>

              {/* Guests */}
              <div className="form-control">
                <label className="label flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="label-text text-gray-600">Guests</span>
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="2"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <button className="btn btn-primary w-full mt-6 flex items-center justify-center gap-2 bg-linear-to-r from-emerald-600 to-teal-600 border-none">
              <Search className="h-5 w-5" />
              Search Tours
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
