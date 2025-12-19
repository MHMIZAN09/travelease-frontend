import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Reviews({ packageId }) {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/reviews/package/${packageId}`
      );
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [packageId]);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Reviews ({reviews.length})</h3>
      {reviews.length === 0 && <p>No reviews yet.</p>}
      {reviews.map((rev) => (
        <div key={rev._id} className="border p-3 rounded-md">
          <div className="flex items-center space-x-2 mb-2">
            <img
              src={rev.userId.photo || '/default-profile.png'}
              alt={rev.userId.name}
              className="w-8 h-8 rounded-full"
            />
            <span className="font-medium">{rev.userId.name}</span>
            <span className="ml-auto font-semibold">{rev.rating} ⭐</span>
          </div>
          <p>{rev.comment}</p>
          <small className="text-gray-500">
            {new Date(rev.createdAt).toLocaleDateString()}
          </small>
        </div>
      ))}
    </div>
  );
}
