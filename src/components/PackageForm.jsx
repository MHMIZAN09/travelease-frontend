import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from './provider/AuthProvider';

export default function PackageForm() {
  const { user } = useContext(AuthContext);

  const [destinations, setDestinations] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const imgbbApiKey = '92e1c9de53c667fa27340a69930020cb';

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/destinations');
        setDestinations(res.data.data || []);
      } catch {
        toast.error('Failed to load destinations');
      }
    };
    fetchDestinations();
  }, []);

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

    const itineraryArray = form.itinerary.value
      ? form.itinerary.value.split('\n').map((line, idx) => {
          const [title, details] = line.split('|');
          return {
            day: idx + 1,
            title: title?.trim() || `Day ${idx + 1}`,
            details: details?.trim() || 'No details provided',
          };
        })
      : [];

    const payload = {
      title: form.title.value,
      description: form.description.value,
      price: Number(form.price.value),
      discount: Number(form.discount.value) || 0, // Added discount
      duration: {
        days: Number(form.days.value),
        nights: Number(form.nights.value),
      },
      destination: form.destination.value,
      images: uploadedImages,
      itinerary: itineraryArray,
      included: form.included.value
        ? form.included.value.split(',').map((i) => i.trim())
        : [],
      excluded: form.excluded.value
        ? form.excluded.value.split(',').map((i) => i.trim())
        : [],
      groupSize: Number(form.groupSize.value) || 20,
      transportation: form.transportation.value,
      createdBy: user?._id,
    };

    try {
      await axios.post('http://localhost:5000/api/packages', payload);
      toast.success('Package created successfully!');
      form.reset();
      setUploadedImages([]);
    } catch {
      toast.error('Failed to create package');
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 ">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-emerald-600">
          Create Travel Package
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Package Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="label">Package Title</label>
              <input
                name="title"
                placeholder="e.g. Cox's Bazar Premium Tour"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">Destination</label>
              <select
                name="destination"
                className="select select-bordered w-full"
                required
              >
                <option value="">Select destination</option>
                {destinations.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="label">Package Images</label>
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

          {/* Price, Discount & Duration */}
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <label className="label">Price (BDT)</label>
              <input
                name="price"
                type="number"
                placeholder="e.g. 15000"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">Discount (%)</label>
              <input
                name="discount"
                type="number"
                placeholder="e.g. 10"
                min="0"
                max="100"
                className="input input-bordered w-full"
                defaultValue={0}
              />
            </div>

            <div>
              <label className="label">Days</label>
              <input
                name="days"
                type="number"
                placeholder="e.g. 3"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">Nights</label>
              <input
                name="nights"
                type="number"
                placeholder="e.g. 2"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="label">Description</label>
            <textarea
              name="description"
              rows={3}
              placeholder="Short overview of the package"
              className="textarea textarea-bordered w-full"
              required
            />
          </div>

          {/* Itinerary */}
          <div>
            <label className="label">
              Itinerary{' '}
              <span className="text-xs text-gray-400">(Day|Details)</span>
            </label>
            <textarea
              name="itinerary"
              rows={4}
              placeholder={`Day 1 | Arrival & sightseeing\nDay 2 | Beach tour`}
              className="textarea textarea-bordered w-full"
              required
            />
          </div>

          {/* Included / Excluded */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="label">Included</label>
              <input
                name="included"
                placeholder="Hotel, Breakfast, Guide"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">Excluded</label>
              <input
                name="excluded"
                placeholder="Lunch, Personal expenses"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          {/* Group & Transport */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="label">Group Size</label>
              <input
                name="groupSize"
                type="number"
                placeholder="e.g. 20"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">Transportation</label>
              <select
                name="transportation"
                className="select select-bordered w-full"
                defaultValue="AC Bus"
                required
              >
                <option>AC Bus</option>
                <option>Non-AC Bus</option>
                <option>Train</option>
                <option>Flight</option>
                <option>Ship</option>
                <option>Car</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <button className="btn btn-success w-full text-lg mt-4">
            Create Package
          </button>
        </form>
      </div>
    </div>
  );
}
