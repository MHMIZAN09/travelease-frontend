import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-10">
      <div className="w-full max-w-5xl bg-base-100 shadow-xl rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* LEFT SIDE: LOTTIE ANIMATION */}
        <div className="hidden md:flex items-center justify-center bg-linear-to-br from-emerald-100 to-teal-100 p-6">
          <DotLottieReact src="../../public/Login.json" loop autoplay />
        </div>

        {/* RIGHT SIDE: LOGIN FORM  */}
        <div className="p-8 md:p-10">
          <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
          <p className="text-center text-gray-500 mb-6">
            Log in to your TravelEase account
          </p>

          {/* Email Field */}
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

          {/* Password Field */}
          <div className="form-control w-full mb-4">
            <span className="label-text">Password</span>

            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="input input-bordered w-full pl-12 pr-12"
              />

              {/* Show/Hide Password */}
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
          <button className="btn w-full bg-linear-to-r from-emerald-600 to-teal-600 text-white">
            Sign In
          </button>

          {/* Divider */}
          <div className="divider my-6 text-sm">Or continue with</div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button className="btn btn-outline w-full flex items-center gap-2">
              <FcGoogle className="text-lg " /> Google
            </button>

            <button className="btn btn-outline w-full flex items-center gap-2">
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
        </div>
      </div>
    </div>
  );
}
