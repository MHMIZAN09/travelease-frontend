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
      for (const file of files) {
        const formData = new FormData();
        formData.append('image', file);
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          formData
        );
        urls.push(res.data.data.url);
      }
      setUploadedImages((prev) => [...prev, ...urls]);
      toast.success('Images uploaded!');
    } catch {
      toast.error('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const payload = {
      name: form.name.value,
      division: form.division.value || 'Not specified',
      category: form.category.value,
      description: form.description.value,
      images: uploadedImages,
      createdBy: user?._id,
    };

    try {
      await axios.post(
        'https://travelease-backend.vercel.app/api/destinations',
        payload
      );
      toast.success('Destination created successfully!');
      form.reset();
      setUploadedImages([]);
    } catch {
      toast.error('Failed to create destination');
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
          Create Destination
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="label">Destination Name</label>
            <input
              name="name"
              placeholder="e.g. Cox's Bazar"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Division */}
          <div>
            <label className="label">Division</label>
            <input
              name="division"
              placeholder="e.g. Chittagong"
              className="input input-bordered w-full"
            />
          </div>

          {/* Category */}
          <div>
            <label className="label">Category</label>
            <select
              name="category"
              className="select select-bordered w-full"
              required
            >
              <option value="Beach">Beach</option>
              <option value="Hill">Hill</option>
              <option value="Historical">Historical</option>
              <option value="Adventure">Adventure</option>
              <option value="Waterfall">Waterfall</option>
              <option value="Urban">Urban</option>
              <option value="Nature">Nature</option>
            </select>
          </div>

          {/* Images */}
          <div>
            <label className="label">Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="file-input file-input-bordered w-full"
              disabled={uploading}
              required
            />
            {uploading && (
              <p className="text-sm text-gray-500 mt-1">Uploading images…</p>
            )}
            <div className="flex gap-3 mt-3 flex-wrap">
              {uploadedImages.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt="Preview"
                  className="w-24 h-24 rounded-lg object-cover shadow"
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="label">Description</label>
            <textarea
              name="description"
              rows={3}
              placeholder="Short description of the destination"
              className="textarea textarea-bordered w-full"
              required
            />
          </div>

          {/* Submit */}
          <button className="btn btn-success w-full text-lg mt-4">
            Create Destination
          </button>
        </form>
      </div>
    </div>
  );
}
