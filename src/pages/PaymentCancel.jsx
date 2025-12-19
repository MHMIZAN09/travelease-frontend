import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';

export default function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center">
        <XCircle className="w-24 h-24 text-red-600 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          No charges were made. Your booking was not completed.
        </p>

        <button
          onClick={() => navigate('/')}
          className="w-full bg-gray-600 text-white py-4 rounded-xl text-xl font-bold hover:bg-gray-700"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}
