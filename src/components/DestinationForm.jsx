/* eslint-disable no-unused-vars */
import axios from 'axios';

import { toast } from 'react-toastify';
import createImage from '../../public/create.jpg';
export default function DestinationForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newDestination = {
      name: form.name.value,
      division: form.division.value,
      image: form.image.value,
      description: form.description.value,
      attractions: form.attractions.value.split(',').map((a) => a.trim()),
      bestTime: form.bestTime.value,
      howToReach: form.howToReach.value,
      tags: form.tags.value.split(',').map((t) => t.trim()),
    };

    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/destinations',
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
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row">
        {/* LEFT SIDE IMAGE */}
        <div className="md:w-1/2 w-full h-64 md:h-auto overflow-hidden">
          <img
            src={createImage}
            alt="Destination"
            className="hover:scale-110 transition duration-700 shrink-0 w-full h-full object-fill"
          />
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="md:w-1/2 w-full p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              type="text"
              defaultValue=""
              placeholder="Destination Name"
              className="input input-bordered w-full"
              required
            />

            <input
              name="division"
              type="text"
              defaultValue=""
              placeholder="Division"
              className="input input-bordered w-full"
              required
            />

            <input
              name="image"
              type="text"
              defaultValue=""
              placeholder="Image URL"
              className="input input-bordered w-full"
            />

            <textarea
              name="description"
              defaultValue=""
              placeholder="Description"
              className="textarea textarea-bordered w-full"
              rows="3"
            />

            <input
              name="attractions"
              type="text"
              defaultValue=""
              placeholder="Attractions (comma separated)"
              className="input input-bordered w-full"
            />

            <input
              name="bestTime"
              type="text"
              defaultValue=""
              placeholder="Best Time to Visit"
              className="input input-bordered w-full"
            />

            <input
              name="howToReach"
              type="text"
              defaultValue=""
              placeholder="How to Reach"
              className="input input-bordered w-full"
            />

            <input
              name="tags"
              type="text"
              defaultValue=""
              placeholder="Tags (comma separated)"
              className="input input-bordered w-full"
            />

            <button className="btn btn-success text-white w-full" type="submit">
              Create Destination
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
