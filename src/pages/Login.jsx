/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { toast } from 'react-toastify';
import { AuthContext } from '../components/provider/AuthProvider';
import axios from 'axios';
import loginAnimation from '../assets/Login.json';
import Lottie from 'lottie-react';
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    signInUser,
    signInWithGoogle,
    signInWithGithub,
    sendVerificationEmail,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signInUser(email, password);
      const loggedUser = result.user;

      // Check if email is verified
      if (!loggedUser.emailVerified) {
        toast.warning('Please verify your email before logging in.');
        await sendVerificationEmail(loggedUser);
        return;
      }

      toast.success(`Welcome back ${loggedUser.displayName || 'User'}!`);
      navigate('/');
    } catch (error) {
      toast.error(`Login Error: ${error.message}`);
    }
  };

  // Social Login helper
  const handleSocialLogin = async (provider) => {
    try {
      let result;

      if (provider === 'google') {
        result = await signInWithGoogle();
      } else if (provider === 'github') {
        result = await signInWithGithub();
      }

      const user = result.user;

      // Send to backend: create if doesn't exist
      const res = await axios.post(
        'https://travelease-backend.vercel.app/api/users',
        {
          name: user.displayName || 'No Name',
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL,
          provider: provider,
          role: 'customer',
        }
      );

      const loggedUser = res.data.data;
      toast.success(`Welcome ${loggedUser.name || 'User'}!`);
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error(
        `Login Error: ${error.response?.data?.message || error.message}`
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-base-100 shadow-xl rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left side: Lottie */}
        <div className="hidden md:flex items-center justify-center bg-linear-to-br from-emerald-100 to-teal-100 p-6">
          <Lottie animationData={loginAnimation} loop autoplay />;
        </div>

        {/* Right side: Form */}
        <form onSubmit={handleLogin} className="p-8 md:p-10">
          <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
          <p className="text-center text-gray-500 mb-6">
            Log in to your TravelEase account
          </p>

          {/* Email */}
          <div className="form-control w-full mb-4">
            <span className="label-text">Email</span>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                className="input input-bordered w-full pl-12"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-control w-full mb-4">
            <span className="label-text">Password</span>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full pl-12 pr-12"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            <div className="flex justify-end mt-1">
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="btn w-full bg-linear-to-r from-emerald-600 to-teal-600 text-white"
          >
            Sign In
          </button>

          <div className="divider my-6 text-sm">Or continue with</div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              className="btn btn-outline w-full flex items-center gap-2"
            >
              <FcGoogle className="text-lg" /> Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('github')}
              className="btn btn-outline w-full flex items-center gap-2"
            >
              <FaGithub className="text-lg text-blue-600" /> GitHub
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-2">
            Don’t have an account?{' '}
            <Link
              to="/register"
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
