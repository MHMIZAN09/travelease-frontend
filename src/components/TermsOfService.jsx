export default function TermsOfService() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-gray-700">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">
        Terms of Service
      </h1>
      <p className="text-sm text-gray-500 mb-10">Last Updated: December 2025</p>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">User Eligibility</h2>
          <p>
            Users must be at least 18 years old and provide accurate
            information.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Booking & Payments</h2>
          <p>
            All bookings are confirmed only after successful payment via Stripe.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">User Responsibilities</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>No fake or fraudulent bookings</li>
            <li>No misuse of other users’ data</li>
            <li>No harmful activities on the platform</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Admin Rights</h2>
          <p>
            TravelEase reserves the right to cancel or suspend bookings/accounts
            when necessary.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            Limitation of Liability
          </h2>
          <p>
            TravelEase is not responsible for delays or issues caused by third
            parties or natural events.
          </p>
        </div>
      </section>
    </div>
  );
}
