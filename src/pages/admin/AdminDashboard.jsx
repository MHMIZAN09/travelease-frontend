import React, { useEffect, useState } from 'react';
import { FaBox, FaUsers, FaDollarSign, FaClipboardList } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPackages: 0,
    totalUsers: 0,
    totalRevenue: 0,
    bookingsToday: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [usersChartData, setUsersChartData] = useState([]);
  const [packagesChartData, setPackagesChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [packagesRes, usersRes, bookingsRes] = await Promise.all([
        axios.get('https://travelease-backend.vercel.app/api/packages'),
        axios.get('https://travelease-backend.vercel.app/api/users'),
        axios.get('https://travelease-backend.vercel.app/api/bookings'),
      ]);

      const packagesData = packagesRes.data.data || [];
      const usersData = usersRes.data.data || [];
      const bookingsData = bookingsRes.data.data || [];

      // Stats
      const revenue = bookingsData
        .filter((b) => b.paymentStatus === 'succeeded')
        .reduce((acc, b) => acc + Number(b.totalAmount || 0), 0);

      const today = new Date().toISOString().slice(0, 10);
      const bookingsToday = bookingsData.filter(
        (b) => (b.createdAt || '').slice(0, 10) === today
      ).length;

      setStats({
        totalPackages: packagesData.length,
        totalUsers: usersData.length,
        totalRevenue: revenue,
        bookingsToday,
      });

      // Chart data: bookings & revenue last 7 days
      const last7Days = [...Array(7)]
        .map((_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - i);
          return d.toISOString().slice(0, 10);
        })
        .reverse();

      setChartData(
        last7Days.map((date) => ({
          date,
          bookings: bookingsData.filter(
            (b) => (b.createdAt || '').slice(0, 10) === date
          ).length,
          revenue: bookingsData
            .filter(
              (b) =>
                (b.createdAt || '').slice(0, 10) === date &&
                b.paymentStatus === 'succeeded'
            )
            .reduce((acc, b) => acc + Number(b.totalAmount || 0), 0),
        }))
      );

      // Users chart (simple example: users created per day last 7 days)
      setUsersChartData(
        last7Days.map((date) => ({
          date,
          users: usersData.filter(
            (u) => (u.createdAt || '').slice(0, 10) === date
          ).length,
        }))
      );

      // Packages chart (packages added per day last 7 days)
      setPackagesChartData(
        last7Days.map((date) => ({
          date,
          packages: packagesData.filter(
            (p) => (p.createdAt || '').slice(0, 10) === date
          ).length,
        }))
      );
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );

  const statsData = [
    {
      title: 'Total Packages',
      value: stats.totalPackages,
      icon: <FaBox size={24} className="text-white" />,
      color: 'bg-indigo-500',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <FaUsers size={24} className="text-white" />,
      color: 'bg-green-500',
    },
    {
      title: 'Total Revenue',
      value: `৳${stats.totalRevenue.toLocaleString()}`,
      icon: <FaDollarSign size={24} className="text-white" />,
      color: 'bg-yellow-500',
    },
    {
      title: 'Bookings Today',
      value: stats.bookingsToday,
      icon: <FaClipboardList size={24} className="text-white" />,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, idx) => (
          <div
            key={idx}
            className={`flex items-center p-4 rounded-xl shadow-lg ${stat.color} text-white`}
          >
            <div className="p-3 bg-white/20 rounded-full mr-4">{stat.icon}</div>
            <div>
              <p className="text-lg font-semibold">{stat.title}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bookings & Revenue Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Bookings & Revenue (Last 7 Days)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip formatter={(value) => `৳${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="bookings" fill="#4f46e5" name="Bookings" />
              <Bar dataKey="revenue" fill="#facc15" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Users Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            New Users (Last 7 Days)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={usersChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#10b981" name="Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Packages Chart */}
        <div className="bg-white rounded-xl shadow p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">
            New Packages (Last 7 Days)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={packagesChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="packages" fill="#f97316" name="Packages" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
