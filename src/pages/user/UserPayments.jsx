import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../components/provider/AuthProvider';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // Correct import for autoTable

export default function UserPayments() {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchPayments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/bookings/user/${
            user._id || user.uid
          }/payments`
        );
        setPayments(res.data.data || []);
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch payment history');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [user]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('My Payment History', 14, 22);

    const tableColumn = [
      'Package',
      'Amount',
      'Payment Status',
      'Booking Status',
      'Date',
    ];
    const tableRows = payments.map((p) => [
      p.package?.title || '-',
      `BDT ${p.totalAmount}`,
      p.paymentStatus,
      p.bookingStatus,
      new Date(p.createdAt).toLocaleString(),
    ]);

    // Correct usage of autoTable
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    doc.save('payment-history.pdf');
  };

  if (loading) return <p>Loading...</p>;
  if (!payments.length) return <p>No payment history found.</p>;

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Payment History</h1>
        <button
          onClick={downloadPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left">Package</th>
            <th className="py-3 px-4 text-left">Amount</th>
            <th className="py-3 px-4 text-left">Payment Status</th>
            <th className="py-3 px-4 text-left">Booking Status</th>
            <th className="py-3 px-4 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p._id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{p.package?.title}</td>
              <td className="py-2 px-4">BDT {p.totalAmount}</td>
              <td className="py-2 px-4">{p.paymentStatus}</td>
              <td className="py-2 px-4">{p.bookingStatus}</td>
              <td className="py-2 px-4">
                {new Date(p.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
