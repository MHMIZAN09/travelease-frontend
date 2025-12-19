export default function CancellationPolicy() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-gray-700">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">
        Cancellation Policy
      </h1>
      <p className="text-sm text-gray-500 mb-10">Last Updated: December 2025</p>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Customer Cancellation</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>7 days before travel: Full refund</li>
            <li>3–6 days before travel: 50% refund</li>
            <li>Less than 3 days: No refund</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            Cancellation by TravelEase
          </h2>
          <p>
            If a trip is canceled due to unavoidable circumstances, customers
            will receive a full refund or reschedule option.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Refund Processing</h2>
          <p>Refunds are processed via Stripe within 5–10 working days.</p>
        </div>

        <p>
          For support, contact{' '}
          <span className="font-semibold">support@travelease.com</span>
        </p>
      </section>
    </div>
  );
}
