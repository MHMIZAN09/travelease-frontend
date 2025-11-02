import { Mail } from 'lucide-react';

export function Newsletter() {
  return (
    <section className="py-20 bg-linear-to-r from-emerald-600 to-teal-600">
      <div className="container mx-auto px-4">
        <div className="card max-w-4xl mx-auto p-8 md:p-12 bg-gray-100 backdrop-blur shadow-lg">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-linear-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 text-white" />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Stay Updated with Bangladesh Tours
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Get exclusive Bangladesh tour deals, seasonal offers, and travel
              tips delivered to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="input input-bordered flex-1"
              />
              <button className="btn bg-linear-to-r from-emerald-600 to-teal-600 text-white border-0">
                Subscribe
              </button>
            </div>

            <p className="text-sm text-gray-500">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
