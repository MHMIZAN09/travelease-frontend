/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  FaUsers,
  FaSuitcaseRolling,
  FaMapMarkedAlt,
  FaHotel,
} from 'react-icons/fa';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
import UsersTable from './UsersTable'; // import the new component

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Stats counts
  const [userCount, setUserCount] = useState(0);
  const [packageCount, setPackageCount] = useState(0);
  const [destinationCount, setDestinationCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);

  // Chart data
  const [bookingsData, setBookingsData] = useState([]);
  const [packageChartData, setPackageChartData] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get('http://localhost:3000/api/v1/users');
        setUserCount(usersRes.data.length);
        setUsers(usersRes.data);

        const packagesRes = await axios.get(
          'http://localhost:3000/api/v1/packages/count'
        );
        setPackageCount(packagesRes.data.count);

        const destinationsRes = await axios.get(
          'http://localhost:3000/api/v1/destinations/'
        );
        setDestinationCount(destinationsRes.data.length);

        const packageChart = packagesRes.data.reduce((acc, pkg) => {
          const existing = acc.find((item) => item.name === pkg.destination);
          if (existing) existing.value += 1;
          else acc.push({ name: pkg.destination, value: 1 });
          return acc;
        }, []);
        setPackageChartData(packageChart);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:3000/api/v1/users/${id}`);
        setUsers(users.filter((user) => user._id !== id));
        setUserCount(userCount - 1);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const renderMainContent = () => {
    if (activeTab === 'dashboard') {
      return (
        <div>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-sm text-gray-500">Total Users</h2>
              <p className="text-2xl font-bold">{userCount}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-sm text-gray-500">Packages</h2>
              <p className="text-2xl font-bold">{packageCount}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-sm text-gray-500">Destinations</h2>
              <p className="text-2xl font-bold">{destinationCount}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-sm text-gray-500">Bookings</h2>
              <p className="text-2xl font-bold">{bookingCount}</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Bookings Over Time</h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={bookingsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="bookings"
                    stroke="#10B981"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                Package Distribution
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={packageChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {packageChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      );
    } else if (activeTab === 'users') {
      return <UsersTable users={users} handleDeleteUser={handleDeleteUser} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 text-2xl font-bold text-emerald-600">
          TravelEase Admin
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center w-full p-2 rounded hover:bg-emerald-100 ${
              activeTab === 'dashboard' ? 'bg-emerald-100' : ''
            }`}
          >
            <FiSettings className="mr-2" /> Dashboard
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center w-full p-2 rounded hover:bg-emerald-100 ${
              activeTab === 'users' ? 'bg-emerald-100' : ''
            }`}
          >
            <FaUsers className="mr-2" /> Users
          </button>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center w-full text-red-600 hover:text-red-800">
            <FiLogOut className="mr-2" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">{renderMainContent()}</main>
    </div>
  );
}
