import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function PaymentPage({ booking }) {
  const [method, setMethod] = useState('sslcommerz');
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      const payload = {
        booking: booking._id,
        user: booking.user,
        amount: booking.totalAmount,
        method,
        transactionId: method === 'cash' ? null : `TXN-${Date.now()}`,
      };

      await axios.post('/api/payments', payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      toast.success('Payment successful!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Complete Payment</h2>

      <p className="mb-2">
        Amount: <strong>৳{booking.totalAmount}</strong>
      </p>

      <select
        className="w-full border p-2 rounded mb-4"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
      >
        <option value="sslcommerz">SSLCommerz</option>
        <option value="stripe">Stripe</option>
        <option value="paypal">PayPal</option>
        <option value="cash">Cash</option>
      </select>

      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
}
