import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function ManagePackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPackage, setEditingPackage] = useState(null);
  const [deletePackageId, setDeletePackageId] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDestination, setFilterDestination] = useState('');

  const itemsPerPage = 10;

  // Fetch packages
  const fetchPackages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/packages');
      setPackages(res.data.data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch packages.');
      setLoading(false);
    }
  };

  // Fetch destinations
  const fetchDestinations = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/destinations');
      setDestinations(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPackages();
    fetchDestinations();
  }, []);

  // Update package
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedPackage = {
      title: form.title.value,
      destination: form.destination.value,
      images: form.images.value
        ? form.images.value.split(',').map((img) => img.trim())
        : [],
      price: Number(form.price.value),
      duration: {
        days: Number(form.days.value),
        nights: Number(form.nights.value),
      },
      description: form.description.value,
      itinerary: form.itinerary.value
        ? form.itinerary.value.split('\n').map((line, idx) => {
            const [title, details] = line.split('|');
            return {
              day: idx + 1,
              title: title?.trim(),
              details: details?.trim(),
            };
          })
        : [],
      included: form.included.value
        ? form.included.value.split(',').map((i) => i.trim())
        : [],
      excluded: form.excluded.value
        ? form.excluded.value.split(',').map((i) => i.trim())
        : [],
      groupSize: Number(form.groupSize.value),
      transportation: form.transportation.value,
    };

    try {
      await axios.put(
        `http://localhost:5000/api/packages/${editingPackage._id}`,
        updatedPackage
      );
      toast.success('Package updated successfully!');
      setEditingPackage(null);
      fetchPackages();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update package.');
    }
  };

  // Delete package
  const handleDelete = async () => {
    if (!deletePackageId) return;
    try {
      await axios.delete(
        `http://localhost:5000/api/packages/${deletePackageId}`
      );
      toast.success('Package deleted successfully!');
      setPackages(packages.filter((p) => p._id !== deletePackageId));
      setDeletePackageId(null);
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete package.');
    }
  };

  // Filter packages
  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.destination?.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDestination = filterDestination
      ? pkg.destination?._id === filterDestination
      : true;

    return matchesSearch && matchesDestination;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPackages = filteredPackages.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-xl text-emerald-500"></span>
      </div>
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700">
        Manage Packages
      </h2>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by title or destination..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full max-w-md border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
        />
        <select
          value={filterDestination}
          onChange={(e) => setFilterDestination(e.target.value)}
          className="input input-bordered w-full max-w-md border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
        >
          <option value="">All Destinations</option>
          {destinations.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      {/* Packages Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-indigo-100">
            <tr>
              <th className="px-5 py-3 border">Title</th>
              <th className="px-5 py-3 border">Destination</th>
              <th className="px-5 py-3 border">Price</th>
              <th className="px-5 py-3 border">Days/Nights</th>
              <th className="px-5 py-3 border">Transportation</th>
              <th className="px-5 py-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPackages.length ? (
              currentPackages.map((pkg) => (
                <tr key={pkg._id} className="hover:bg-indigo-50 transition">
                  <td className="px-5 py-3 border font-semibold text-gray-800">
                    {pkg.title}
                  </td>
                  <td className="px-5 py-3 border">
                    {pkg.destination?.name || 'N/A'}
                  </td>
                  <td className="px-5 py-3 border text-green-600 font-semibold">
                    ${pkg.price}
                  </td>
                  <td className="px-5 py-3 border">
                    {pkg.duration?.days}/{pkg.duration?.nights}
                  </td>
                  <td className="px-5 py-3 border">{pkg.transportation}</td>
                  <td className="px-5 py-3 border flex justify-center gap-3">
                    <button
                      onClick={() => setEditingPackage(pkg)}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => setDeletePackageId(pkg._id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center px-4 py-6 text-gray-500">
                  No packages found.
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
      {editingPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Edit Package
            </h2>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                name="title"
                defaultValue={editingPackage.title}
                className="input input-bordered w-full"
                required
              />
              <select
                name="destination"
                defaultValue={editingPackage.destination?._id}
                className="input input-bordered w-full"
              >
                {destinations.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name}
                  </option>
                ))}
              </select>
              <input
                name="images"
                defaultValue={editingPackage.images?.join(', ')}
                placeholder="Image URLs (comma separated)"
                className="input input-bordered w-full"
              />
              <input
                name="price"
                type="number"
                defaultValue={editingPackage.price}
                className="input input-bordered w-full"
                required
              />
              <div className="flex gap-4">
                <input
                  name="days"
                  type="number"
                  defaultValue={editingPackage.duration?.days}
                  className="input input-bordered w-1/2"
                  required
                />
                <input
                  name="nights"
                  type="number"
                  defaultValue={editingPackage.duration?.nights}
                  className="input input-bordered w-1/2"
                  required
                />
              </div>
              <textarea
                name="description"
                defaultValue={editingPackage.description}
                className="textarea textarea-bordered w-full"
                rows={3}
              />
              <textarea
                name="itinerary"
                placeholder="Itinerary (Title|Details per line)"
                defaultValue={editingPackage.itinerary
                  ?.map((i) => `${i.title}|${i.details}`)
                  .join('\n')}
                className="textarea textarea-bordered w-full"
                rows={4}
              />
              <input
                name="included"
                defaultValue={editingPackage.included?.join(', ')}
                placeholder="Included Items (comma separated)"
                className="input input-bordered w-full"
              />
              <input
                name="excluded"
                defaultValue={editingPackage.excluded?.join(', ')}
                placeholder="Excluded Items (comma separated)"
                className="input input-bordered w-full"
              />
              <input
                name="groupSize"
                type="number"
                defaultValue={editingPackage.groupSize}
                className="input input-bordered w-full"
              />
              <select
                name="transportation"
                defaultValue={editingPackage.transportation}
                className="input input-bordered w-full"
              >
                <option value="AC Bus">AC Bus</option>
                <option value="Non-AC Bus">Non-AC Bus</option>
                <option value="Train">Train</option>
                <option value="Flight">Flight</option>
                <option value="Ship">Ship</option>
                <option value="Car">Car</option>
              </select>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setEditingPackage(null)}
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
      {deletePackageId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Confirm Delete
            </h3>
            <p className="mb-6">
              Are you sure you want to delete this package?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeletePackageId(null)}
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
