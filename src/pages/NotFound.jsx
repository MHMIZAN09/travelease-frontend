import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-9xl font-extrabold text-red-500">404</h1>
      <p className="mt-4 text-2xl font-semibold text-gray-700">
        Oops! Page Not Found
      </p>
      <p className="mt-2 text-gray-500 text-center max-w-sm">
        The page you are looking for does not exist or has been moved.
      </p>
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
