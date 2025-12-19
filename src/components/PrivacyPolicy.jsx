export default function PrivacyPolicy() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-gray-700">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-10">Last Updated: December 2025</p>

      <section className="space-y-6">
        <p>
          TravelEase values your privacy and is committed to protecting your
          personal information.
        </p>

        <div>
          <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Name, email, phone number</li>
            <li>Authentication data (Google / Email)</li>
            <li>Booking and travel details</li>
            <li>Payment status (no card details stored)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Confirm bookings</li>
            <li>Process payments</li>
            <li>Provide customer support</li>
            <li>Improve our services</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Data Security</h2>
          <p>
            We use secure authentication and encrypted payment gateways like
            Stripe to protect your data.
          </p>
        </div>

        <p>
          For any questions, contact us at{' '}
          <span className="font-semibold">info@travelease.com</span>
        </p>
      </section>
    </div>
  );
}
