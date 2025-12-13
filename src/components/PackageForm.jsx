import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from './provider/AuthProvider';

export default function PackageForm() {
  const { user } = useContext(AuthContext);
  const [destinations, setDestinations] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]); // store imgBB URLs
  const [uploading, setUploading] = useState(false);

  const imgbbApiKey = '92e1c9de53c667fa27340a69930020cb';
  // Fetch destinations
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/destinations');
        setDestinations(res.data.data);
      } catch (err) {
        console.error('Error fetching destinations:', err);
      }
    };
    fetchDestinations();
  }, []);

  // Handle image upload to imgBB
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
      durationDays: Number(form.days.value),
      durationNights: Number(form.nights.value),
      destination: form.destination.value,
      images: uploadedImages, // use uploaded images from imgBB
      itinerary: itineraryArray,
      included: form.included.value
        ? form.included.value.split(',').map((item) => item.trim())
        : [],
      excluded: form.excluded.value
        ? form.excluded.value.split(',').map((item) => item.trim())
        : [],
      groupSize: Number(form.groupSize.value) || 20,
      transportation: form.transportation.value,
      createdBy: user?._id,
    };

    try {
      const res = await axios.post(
        'http://localhost:5000/api/packages',
        payload
      );
      toast.success('Package created successfully!');
      form.reset();
      setUploadedImages([]);
      console.log('Created package:', res.data);
    } catch (err) {
      console.error(
        'Error creating package:',
        err.response?.data || err.message
      );
      toast.error('Failed to create package.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden max-w-5xl w-full p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Create Package</h2>

          <input
            name="title"
            type="text"
            placeholder="Package Title"
            className="input input-bordered w-full"
            required
          />

          <select
            name="destination"
            className="input input-bordered w-full"
            required
          >
            <option value="">Select Destination</option>
            {destinations.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
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
                  alt={`Package ${idx}`}
                  className="w-24 h-24 object-cover rounded-lg shadow"
                />
              ))}
            </div>
          </div>

          <input
            name="price"
            type="number"
            placeholder="Price"
            className="input input-bordered w-full"
            required
          />

          <div className="flex gap-4">
            <input
              name="days"
              type="number"
              placeholder="Days"
              className="input input-bordered w-1/2"
              required
            />
            <input
              name="nights"
              type="number"
              placeholder="Nights"
              className="input input-bordered w-1/2"
              required
            />
          </div>

          <textarea
            name="description"
            placeholder="Description"
            className="textarea textarea-bordered w-full"
            rows={3}
            required
          />

          <textarea
            name="itinerary"
            placeholder="Itinerary (one per line: Title|Details)"
            className="textarea textarea-bordered w-full"
            rows={4}
          />

          <input
            name="included"
            type="text"
            placeholder="Included Items (comma separated)"
            className="input input-bordered w-full"
          />

          <input
            name="excluded"
            type="text"
            placeholder="Excluded Items (comma separated)"
            className="input input-bordered w-full"
          />

          <input
            name="groupSize"
            type="number"
            placeholder="Group Size"
            className="input input-bordered w-full"
          />

          <select
            name="transportation"
            className="input input-bordered w-full"
            defaultValue="AC Bus"
          >
            <option value="AC Bus">AC Bus</option>
            <option value="Non-AC Bus">Non-AC Bus</option>
            <option value="Train">Train</option>
            <option value="Flight">Flight</option>
            <option value="Ship">Ship</option>
            <option value="Car">Car</option>
          </select>

          <button type="submit" className="btn btn-success w-full text-white">
            Create Package
          </button>
        </form>
      </div>
    </div>
  );
}
