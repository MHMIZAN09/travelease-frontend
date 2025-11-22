import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, User, Lock, Eye, EyeOff } from 'lucide-react';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-base-100 shadow-xl rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* LEFT SIDE LOTTIE */}
        <div className="hidden md:flex items-center justify-center bg-linear-to-br from-emerald-100 to-teal-100 p-6">
          <DotLottieReact src="../../public/registration.json" loop autoplay />
        </div>

        {/* RIGHT FORM */}
        <div className="p-8 md:p-10">
          <h2 className="text-3xl font-bold text-center">Create Account</h2>
          <p className="text-center text-gray-500 mb-6">
            Join TravelEase and start your journey
          </p>

          {/* Name */}
          <div className="form-control w-full mb-4">
            <span className="label-text">Full Name</span>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter your full name"
                className="input input-bordered w-full pl-12"
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-control w-full mb-4">
            <span className="label-text">Email</span>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="your.email@example.com"
                className="input input-bordered w-full pl-12"
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-control w-full mb-4">
            <span className="label-text">Password</span>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                className="input input-bordered w-full pl-12 pr-12"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-control w-full mb-6">
            <span className="label-text">Confirm Password</span>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Re-enter your password"
                className="input input-bordered w-full pl-12 pr-12"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Register Btn */}
          <button className="btn w-full bg-linear-to-r from-emerald-600 to-teal-600 text-white">
            Create Account
          </button>

          {/* Divider */}
          <div className="divider my-6 text-sm">Or continue with</div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button className="btn btn-outline w-full flex items-center gap-2">
              <FcGoogle className="text-lg" /> Google
            </button>

            <button className="btn btn-outline w-full flex items-center gap-2">
              <FaFacebook className="text-lg text-blue-600" /> Facebook
            </button>
          </div>

          {/* Already have account */}
          <p className="text-center text-sm text-gray-600 mt-2">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary font-medium hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
