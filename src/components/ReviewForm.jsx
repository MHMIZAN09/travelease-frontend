import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';

export default function ReviewForm({ packageId, onReviewAdded }) {
  const { token } = useContext(AuthContext);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      toast.error('Please select a rating between 1 and 5');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        'http://localhost:5000/api/reviews',
        { packageId, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Review added successfully');
      setRating(0);
      setComment('');
      onReviewAdded(res.data.review); // update parent component
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to add review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md space-y-2">
      <div>
        <label className="block mb-1 font-medium">Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border p-1 rounded w-full"
        >
          <option value={0}>Select Rating</option>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border p-2 rounded w-full"
          rows={4}
          placeholder="Write your review..."
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
