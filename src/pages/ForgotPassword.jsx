import { useState, useContext } from 'react';
import { AuthContext } from '../components/provider/AuthProvider';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const { resetPassword } = useContext(AuthContext);

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      toast.success('Password reset email sent! Check your inbox.');
      setEmail('');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleReset}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow"
      >
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <p className="text-gray-500 mb-6">
          Enter your email to receive a password reset link.
        </p>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full mb-4"
          required
        />
        <button
          type="submit"
          className="btn w-full bg-green-500 text-white hover:bg-green-600"
        >
          Send Reset Email
        </button>
        <p className="text-sm text-center mt-4">
          <Link to="/login" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </p>
      </form>
    </div>
  );
}
