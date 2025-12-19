import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../components/provider/AuthProvider';
import { Plane, DollarSign, CalendarCheck, Clock } from 'lucide-react';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export default function DashboardHome() {
  const { user } = useContext(AuthContext);

  const [stats, setStats] = useState({
    totalBookings: 0,
    totalSpent: 0,
    confirmed: 0,
    pending: 0,
    canceled: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://travelease-backend.vercel.app/api/bookings/user/${user._id}`
        );

        const data = res.data?.data || [];

        setStats({
          totalBookings: data.length,
          totalSpent: data.reduce((s, b) => s + (b.totalAmount || 0), 0),
          confirmed: data.filter((b) => b.bookingStatus === 'confirmed').length,
          pending: data.filter((b) => b.bookingStatus === 'pending').length,
          canceled: data.filter((b) => b.bookingStatus === 'canceled').length,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  const chartData = [
    { name: 'Confirmed', value: stats.confirmed },
    { name: 'Pending', value: stats.pending },
    { name: 'Canceled', value: stats.canceled },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome back, {user?.displayName || 'Traveler'} ✈️
        </h1>
        <p className="text-gray-500 mt-2">Your booking overview at a glance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Plane />}
          label="Total Bookings"
          value={stats.totalBookings}
          gradient="from-blue-500 to-indigo-600"
        />
        <StatCard
          icon={<DollarSign />}
          label="Total Spent"
          value={`৳${stats.totalSpent.toLocaleString()}`}
          gradient="from-purple-500 to-pink-600"
        />
        <StatCard
          icon={<CalendarCheck />}
          label="Confirmed"
          value={stats.confirmed}
          gradient="from-green-500 to-emerald-600"
        />
        <StatCard
          icon={<Clock />}
          label="Pending"
          value={stats.pending}
          gradient="from-orange-500 to-amber-600"
        />
      </div>

      {/* Booking Status Graph */}
      <div className="bg-white rounded-2xl p-6 shadow">
        <h2 className="text-xl font-semibold mb-4">Booking Status Overview</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* Reusable Stat Card */
function StatCard({ icon, label, value, gradient }) {
  return (
    <div
      className={`bg-gradient-to-r ${gradient} text-white p-6 rounded-2xl shadow-lg`}
    >
      <div className="mb-3">{icon}</div>
      <p className="text-sm opacity-90">{label}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
  );
}
