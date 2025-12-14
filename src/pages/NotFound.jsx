import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import errorAnimation from '../assets/Error_404.json'; // import the JSON

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Lottie Animation */}
      <div className="w-80 h-80">
        <Lottie animationData={errorAnimation} loop={true} autoplay={true} />
      </div>

      <button
        onClick={() => navigate('/')}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
