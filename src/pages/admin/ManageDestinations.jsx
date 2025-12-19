import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function ManageDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingDestination, setEditingDestination] = useState(null);
  const [deleteDestinationId, setDeleteDestinationId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [imageUploading, setImageUploading] = useState(false);

  const itemsPerPage = 10;
  const imgbbApiKey = '92e1c9de53c667fa27340a69930020cb';

  // Fetch all destinations
  const fetchDestinations = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/destinations');
      setDestinations(res.data.data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch destinations.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  // Update destination
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const form = e.target;
      const updatedDestination = {
        name: form.name.value,
        division: form.division.value || 'Not specified',
        category: form.category.value,
        description: form.description.value,
        images: editingDestination.images || [],
      };
      await axios.put(
        `http://localhost:5000/api/destinations/${editingDestination._id}`,
        updatedDestination
      );
      toast.success('Destination updated successfully!');
      setEditingDestination(null);
      fetchDestinations();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update destination.');
    }
  };

  // Delete destination
  const handleDelete = async () => {
    if (!deleteDestinationId) return;
    try {
      await axios.delete(
        `http://localhost:5000/api/destinations/${deleteDestinationId}`
      );
      toast.success('Destination deleted successfully!');
      setDestinations(
        destinations.filter((d) => d._id !== deleteDestinationId)
      );
      setDeleteDestinationId(null);
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete destination.');
    }
  };

  // Filter and search
  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch =
      dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = filterCategory
      ? dest.category === filterCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDestinations = filteredDestinations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-xl text-emerald-500"></span>
      </div>
    );

  const categories = [...new Set(destinations.map((d) => d.category))];

  return (
    <div className="px-6 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700 text-center">
        Manage Destinations
      </h2>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center items-center">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="input input-bordered w-full max-w-md border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 rounded-lg shadow-sm"
        />
        <select
          value={filterCategory}
          onChange={(e) => {
            setFilterCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="input input-bordered w-full max-w-md border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 rounded-lg shadow-sm"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
        <table className="min-w-full border-collapse">
          <thead className="bg-indigo-100">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-indigo-800 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left font-medium text-indigo-800 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left font-medium text-indigo-800 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-center font-medium text-indigo-800 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentDestinations.length ? (
              currentDestinations.map((dest) => (
                <tr
                  key={dest._id}
                  className="hover:bg-indigo-50 transition duration-150"
                >
                  <td className="px-6 py-4">{dest.name}</td>
                  <td className="px-6 py-4">{dest.category}</td>
                  <td className="px-6 py-4">{dest.description}</td>
                  <td className="px-6 py-4 flex justify-center gap-4">
                    <button
                      onClick={() => setEditingDestination(dest)}
                      className="text-blue-600 hover:text-blue-800 transition text-lg"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => setDeleteDestinationId(dest._id)}
                      className="text-red-600 hover:text-red-800 transition text-lg"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No destinations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 disabled:opacity-50 transition"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg transition ${
                currentPage === i + 1
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 disabled:opacity-50 transition"
          >
            Next
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {editingDestination && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-auto p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
              Edit Destination
            </h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              {/* Name */}
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  defaultValue={editingDestination.name}
                  className="input input-bordered w-full rounded-lg"
                  required
                />
              </div>

              {/* Division */}
              <div className="flex flex-col">
                <label
                  htmlFor="division"
                  className="font-medium text-gray-700 mb-1"
                >
                  Division
                </label>
                <input
                  id="division"
                  name="division"
                  defaultValue={editingDestination.division}
                  className="input input-bordered w-full rounded-lg"
                />
              </div>

              {/* Category */}
              <div className="flex flex-col">
                <label
                  htmlFor="category"
                  className="font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  defaultValue={editingDestination.category}
                  className="input input-bordered w-full rounded-lg"
                >
                  <option>Beach</option>
                  <option>Hill</option>
                  <option>Historical</option>
                  <option>Adventure</option>
                  <option>Waterfall</option>
                  <option>Urban</option>
                  <option>Nature</option>
                </select>
              </div>

              {/* Images with imgbb upload */}
              <div className="flex flex-col">
                <label
                  htmlFor="images"
                  className="font-medium text-gray-700 mb-1"
                >
                  Images (Upload new or remove)
                </label>
                <input
                  id="images"
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    const formData = new FormData();
                    formData.append('image', file);

                    setImageUploading(true);

                    try {
                      const res = await fetch(
                        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
                        { method: 'POST', body: formData }
                      );
                      const data = await res.json();
                      if (data.success) {
                        const uploadedURL = data.data.url;
                        setEditingDestination((prev) => ({
                          ...prev,
                          images: prev.images
                            ? [...prev.images, uploadedURL]
                            : [uploadedURL],
                        }));
                        toast.success('Image uploaded successfully!');
                      } else {
                        toast.error('Image upload failed!');
                      }
                    } catch (err) {
                      console.error(err);
                      toast.error('Image upload error!');
                    } finally {
                      setImageUploading(false);
                    }
                  }}
                  className="input input-bordered w-full rounded-lg"
                />
                {imageUploading && (
                  <p className="text-sm text-gray-500 mt-1">Uploading...</p>
                )}

                <div className="flex flex-wrap mt-2 gap-2">
                  {editingDestination.images?.map((img, i) => (
                    <div key={i} className="relative">
                      <img
                        src={img}
                        alt="Destination"
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setEditingDestination((prev) => ({
                            ...prev,
                            images: prev.images.filter(
                              (_, index) => index !== i
                            ),
                          }))
                        }
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col">
                <label
                  htmlFor="description"
                  className="font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  defaultValue={editingDestination.description}
                  className="textarea textarea-bordered w-full rounded-lg"
                  rows={3}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setEditingDestination(null)}
                  className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteDestinationId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              Confirm Delete
            </h3>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete this destination?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteDestinationId(null)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
