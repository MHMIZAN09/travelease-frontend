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

  const itemsPerPage = 10;

  // Fetch all destinations
  const fetchDestinations = async () => {
    try {
      const res = await axios.get(
        'https://travelease-backend.vercel.app/api/destinations'
      );
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
        category: form.category.value,
        description: form.description.value,
      };
      await axios.put(
        `https://travelease-backend.vercel.app/api/destinations/${editingDestination._id}`,
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
        `https://travelease-backend.vercel.app/api/destinations/${deleteDestinationId}`
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

  // Extract unique categories for filter dropdown
  const categories = [...new Set(destinations.map((d) => d.category))];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700 text-center">
        Manage Destinations
      </h2>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-4 justify-center">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset page when search changes
          }}
          className="input input-bordered w-full max-w-md border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
        />
        <select
          value={filterCategory}
          onChange={(e) => {
            setFilterCategory(e.target.value);
            setCurrentPage(1); // reset page when filter changes
          }}
          className="input input-bordered w-full max-w-md border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
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
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-indigo-100">
            <tr>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Category</th>
              <th className="border px-4 py-2 text-left">Description</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentDestinations.length ? (
              currentDestinations.map((dest) => (
                <tr
                  key={dest._id}
                  className="hover:bg-indigo-50 transition duration-200"
                >
                  <td className="border px-4 py-2">{dest.name}</td>
                  <td className="border px-4 py-2">{dest.category}</td>
                  <td className="border px-4 py-2">{dest.description}</td>
                  <td className="border px-4 py-2 flex justify-center gap-2">
                    <button
                      onClick={() => setEditingDestination(dest)}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => setDeleteDestinationId(dest._id)}
                      className="text-red-600 hover:text-red-800 transition"
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
                  className="text-center py-4 text-gray-500 font-medium"
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
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
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
            className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {editingDestination && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Edit Destination
            </h2>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                name="name"
                defaultValue={editingDestination.name}
                className="input input-bordered w-full"
                required
              />
              <input
                name="category"
                defaultValue={editingDestination.category}
                className="input input-bordered w-full"
              />
              <textarea
                name="description"
                defaultValue={editingDestination.description}
                className="textarea textarea-bordered w-full"
                rows={3}
              />
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
