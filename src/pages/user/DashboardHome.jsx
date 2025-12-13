import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../components/provider/AuthProvider';
import { toast } from 'react-toastify';

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
    upcomingTrips: 0,
    pendingPayments: 0,
  });

  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/bookings/user/${user.uid}`
        );

        const bookings = res.data.data || [];

        const totalBookings = bookings.length;
        const upcomingTrips = bookings.filter(
          (b) => b.bookingStatus === 'confirmed'
        ).length;

        const pendingPayments = bookings.filter(
          (b) => b.paymentStatus === 'pending'
        ).length;

        // Chart data
        const pending = bookings.filter(
          (b) => b.bookingStatus === 'pending'
        ).length;

        const canceled = bookings.filter(
          (b) => b.bookingStatus === 'canceled'
        ).length;

        setStats({
          totalBookings,
          upcomingTrips,
          pendingPayments,
        });

        setChartData([
          { name: 'Confirmed', value: upcomingTrips },
          { name: 'Pending', value: pending },
          { name: 'Canceled', value: canceled },
        ]);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Bookings</p>
          <h2 className="text-2xl font-bold">{stats.totalBookings}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Upcoming Trips</p>
          <h2 className="text-2xl font-bold">{stats.upcomingTrips}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Pending Payments</p>
          <h2 className="text-2xl font-bold">{stats.pendingPayments}</h2>
        </div>
      </div>

      {/* Booking Status Chart */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Booking Status Overview</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
