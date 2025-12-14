import React from 'react';

export default function DashboardStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-sm text-gray-500">Users</h2>
        <p className="text-2xl font-bold">{stats.users}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-sm text-gray-500">Bookings</h2>
        <p className="text-2xl font-bold">{stats.bookings}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-sm text-gray-500">Packages</h2>
        <p className="text-2xl font-bold">{stats.packages}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-sm text-gray-500">Revenue</h2>
        <p className="text-2xl font-bold">${stats.revenue}</p>
      </div>
    </div>
  );
}
