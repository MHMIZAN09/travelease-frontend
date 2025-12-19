import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function ManagePackages() {
  const [packages, setPackages] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDestination, setFilterDestination] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [editingPackage, setEditingPackage] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const itemsPerPage = 8;

  /* ================= FETCH DATA ================= */
  const fetchPackages = async () => {
    try {
      const res = await axios.get(
        'https://travelease-backend.vercel.app/api/packages'
      );
      setPackages(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch packages');
    } finally {
      setLoading(false);
    }
  };

  const fetchDestinations = async () => {
    try {
      const res = await axios.get(
        'https://travelease-backend.vercel.app/api/destinations'
      );
      setDestinations(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch destinations');
    }
  };

  useEffect(() => {
    fetchPackages();
    fetchDestinations();
  }, []);

  /* ================= FILTER ================= */
  const filteredPackages = packages.filter((pkg) => {
    const matchSearch =
      pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.destination?.name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchDestination = filterDestination
      ? pkg.destination?._id === filterDestination
      : true;

    return matchSearch && matchDestination;
  });

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const currentPackages = filteredPackages.slice(start, start + itemsPerPage);

  /* ================= UPDATE ================= */
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedPackage = {
      title: form.title.value,
      destination: form.destination.value,
      price: Number(form.price.value),
      duration: {
        days: Number(form.days.value),
        nights: Number(form.nights.value),
      },
      description: form.description.value,
      transportation: form.transportation.value,
      included: form.included.value.split(',').map((i) => i.trim()),
      excluded: form.excluded.value.split(',').map((i) => i.trim()),
    };

    try {
      await axios.put(
        `https://travelease-backend.vercel.app/api/packages/${editingPackage._id}`,
        updatedPackage
      );
      toast.success('Package updated successfully');
      setEditingPackage(null);
      fetchPackages();
    } catch (err) {
      console.error(err);
      toast.error('Update failed');
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://travelease-backend.vercel.app/api/packages/${deleteId}`
      );
      setPackages(packages.filter((p) => p._id !== deleteId));
      toast.success('Package deleted successfully');
      setDeleteId(null);
    } catch (err) {
      console.error(err);
      toast.error('Delete failed');
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">Manage Packages</h1>
        <p className="text-gray-500">Total Packages: {packages.length}</p>
      </div>

      {/* SEARCH & FILTER */}
      <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title or destination"
          className="input input-bordered w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="select select-bordered w-full md:w-1/3"
          value={filterDestination}
          onChange={(e) => setFilterDestination(e.target.value)}
        >
          <option value="">All Destinations</option>
          {destinations.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-indigo-100">
            <tr>
              <th>Title</th>
              <th>Destination</th>
              <th>Price</th>
              <th>Days/Nights</th>
              <th>Transport</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPackages.length ? (
              currentPackages.map((pkg) => (
                <tr key={pkg._id} className="hover:bg-indigo-50 transition">
                  <td className="font-medium">{pkg.title}</td>
                  <td>{pkg.destination?.name}</td>
                  <td className="text-green-600 font-semibold">৳{pkg.price}</td>
                  <td>
                    {pkg.duration?.days}/{pkg.duration?.nights}
                  </td>
                  <td>{pkg.transportation}</td>
                  <td className="flex justify-center gap-2">
                    <button
                      className="btn btn-xs btn-info btn-outline"
                      onClick={() => setEditingPackage(pkg)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-xs btn-error btn-outline"
                      onClick={() => setDeleteId(pkg._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  No packages found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* EDIT MODAL */}
      {editingPackage && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-xl max-h-[90vh] overflow-auto">
            <h2 className="text-xl font-bold mb-4 text-indigo-700">
              Edit Package
            </h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="font-medium">Title</label>
                <input
                  name="title"
                  defaultValue={editingPackage.title}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="font-medium">Destination</label>
                <select
                  name="destination"
                  defaultValue={editingPackage.destination?._id}
                  className="select select-bordered w-full"
                >
                  {destinations.map((d) => (
                    <option key={d._id} value={d._id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-medium">Price (BDT)</label>
                <input
                  name="price"
                  type="number"
                  defaultValue={editingPackage.price}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="font-medium">Days</label>
                  <input
                    name="days"
                    type="number"
                    defaultValue={editingPackage.duration?.days}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="w-1/2">
                  <label className="font-medium">Nights</label>
                  <input
                    name="nights"
                    type="number"
                    defaultValue={editingPackage.duration?.nights}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <div>
                <label className="font-medium">Description</label>
                <textarea
                  name="description"
                  defaultValue={editingPackage.description}
                  className="textarea textarea-bordered w-full"
                  rows={3}
                />
              </div>

              <div>
                <label className="font-medium">Included Items</label>
                <input
                  name="included"
                  defaultValue={editingPackage.included?.join(', ')}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="font-medium">Excluded Items</label>
                <input
                  name="excluded"
                  defaultValue={editingPackage.excluded?.join(', ')}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="font-medium">Transportation</label>
                <select
                  name="transportation"
                  defaultValue={editingPackage.transportation}
                  className="select select-bordered w-full"
                >
                  <option>AC Bus</option>
                  <option>Non-AC Bus</option>
                  <option>Train</option>
                  <option>Flight</option>
                  <option>Ship</option>
                  <option>Car</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setEditingPackage(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete this package?
            </p>
            <div className="flex justify-end gap-3">
              <button className="btn" onClick={() => setDeleteId(null)}>
                Cancel
              </button>
              <button className="btn btn-error" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
