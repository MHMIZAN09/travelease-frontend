import React, { useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from './provider/AuthProvider';

export default function DestinationForm() {
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newDestination = {
      name: form.name.value,
      division: form.division.value || 'Not specified',
      category: form.category.value || 'Nature',
      images: form.images.value
        ? form.images.value.split(',').map((url) => url.trim())
        : [],
      description: form.description.value,
      attractions: form.attractions.value
        ? form.attractions.value.split(',').map((a) => a.trim())
        : [],
      bestTime: form.bestTime.value,
      howToReach: form.howToReach.value,
      tags: form.tags.value
        ? form.tags.value.split(',').map((t) => t.trim())
        : [],
      createdBy: user?._id || null,
    };

    try {
      await axios.post(
        'http://localhost:5000/api/destinations',
        newDestination
      );
      toast.success('Destination created successfully!');
      form.reset();
    } catch (error) {
      toast.error('Failed to create destination.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create New Destination
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Destination Name"
            className="input input-bordered w-full"
            required
          />

          <input
            name="division"
            type="text"
            placeholder="Division"
            className="input input-bordered w-full"
          />

          <select
            name="category"
            className="input input-bordered w-full"
            defaultValue="Nature"
          >
            <option value="Beach">Beach</option>
            <option value="Hill">Hill</option>
            <option value="Historical">Historical</option>
            <option value="Adventure">Adventure</option>
            <option value="Waterfall">Waterfall</option>
            <option value="Urban">Urban</option>
            <option value="Nature">Nature</option>
          </select>

          <input
            name="images"
            type="text"
            placeholder="Image URLs (comma separated)"
            className="input input-bordered w-full"
          />

          <textarea
            name="description"
            placeholder="Description"
            rows="3"
            className="textarea textarea-bordered w-full"
            required
          />

          <input
            name="attractions"
            type="text"
            placeholder="Attractions (comma separated)"
            className="input input-bordered w-full"
          />

          <input
            name="bestTime"
            type="text"
            placeholder="Best Time to Visit"
            className="input input-bordered w-full"
          />

          <input
            name="howToReach"
            type="text"
            placeholder="How to Reach"
            className="input input-bordered w-full"
          />

          <input
            name="tags"
            type="text"
            placeholder="Tags (comma separated)"
            className="input input-bordered w-full"
          />

          <button
            type="submit"
            className="btn w-full bg-linear-to-r from-blue-600 to-teal-500 text-white hover:from-blue-700 hover:to-teal-600"
          >
            Create Destination
          </button>
        </form>
      </div>
    </div>
  );
}
