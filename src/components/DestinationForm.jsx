import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from './provider/AuthProvider';

export default function DestinationForm() {
  const { user } = useContext(AuthContext);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const imgbbApiKey = '92e1c9de53c667fa27340a69930020cb';

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    try {
      const urls = [];
      for (let file of files) {
        const formData = new FormData();
        formData.append('image', file);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          formData
        );
        urls.push(res.data.data.url);
      }
      setUploadedImages((prev) => [...prev, ...urls]);
      toast.success('Images uploaded successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newDestination = {
      name: form.name.value,
      division: form.division.value || 'Not specified',
      category: form.category.value || 'Nature',
      images: uploadedImages, // use uploaded images from imgBB
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
        'https://travelease-backend.vercel.app/api/destinations',
        newDestination
      );
      toast.success('Destination created successfully!');
      form.reset();
      setUploadedImages([]);
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

          {/* Image Upload */}
          <div>
            <label className="block mb-2 font-medium">Upload Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="input input-bordered w-full"
            />
            {uploading && (
              <p className="text-sm text-gray-500 mt-1">Uploading...</p>
            )}
            <div className="flex flex-wrap mt-2 gap-2">
              {uploadedImages.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Destination ${idx}`}
                  className="w-24 h-24 object-cover rounded-lg shadow"
                />
              ))}
            </div>
          </div>

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
            className="btn w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Create Destination
          </button>
        </form>
      </div>
    </div>
  );
}
