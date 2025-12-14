import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, User, Lock, Eye, EyeOff } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { AuthContext } from '../components/provider/AuthProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { updateProfile } from 'firebase/auth';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signInWithGoogle, createUser, signInWithGithub } =
    useContext(AuthContext);
  const navigate = useNavigate();

  // Email & Password Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    // Validation
    if (password !== confirmPassword)
      return toast.error('Passwords do not match');
    if (password.length < 6)
      return toast.error('Password must be at least 6 characters long');
    if (!/[A-Z]/.test(password))
      return toast.error('Password must contain at least one uppercase letter');
    if (!/[0-9]/.test(password))
      return toast.error('Password must contain at least one number');
    if (!/[!@#$%^&*]/.test(password))
      return toast.error(
        'Password must contain at least one special character'
      );

    try {
      const result = await createUser(email, password);
      const user = result.user;

      // Update displayName for email/password users
      await updateProfile(user, {
        displayName: name,
        photoURL: 'https://example.com/default-avatar.png',
      });

      // Save user to backend
      await axios.post('https://travelease-backend.vercel.app/api/users', {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL,
        provider: 'password',
        role: 'customer',
      });

      form.reset();
      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Social login handler
  const handleSocialLogin = async (provider) => {
    try {
      let result;
      if (provider === 'google') result = await signInWithGoogle();
      if (provider === 'github') result = await signInWithGithub();

      const user = result.user;

      // Save user to backend (create if doesn't exist)
      const res = await axios.post(
        'https://travelease-backend.vercel.app/api/users',
        {
          name: user.displayName || 'No Name',
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL || 'https://example.com/default-avatar.png',
          provider: provider,
          role: 'customer',
        }
      );

      toast.success(`Welcome ${res.data.data.name || 'User'}!`);
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
        {/* Lottie animation */}
        <div className="hidden md:flex items-center justify-center bg-linear-to-br from-emerald-100 to-teal-100 p-6">
          <DotLottieReact src="/registration.json" loop autoplay />
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="p-8 md:p-10 w-full">
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
                name="name"
                placeholder="Enter your full name"
                className="input input-bordered w-full pl-12"
                required
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
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Create a password"
                className="input input-bordered w-full pl-12 pr-12"
                required
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
                name="confirmPassword"
                placeholder="Re-enter your password"
                className="input input-bordered w-full pl-12 pr-12"
                required
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

          {/* Register Button */}
          <button
            type="submit"
            className="btn w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
          >
            Create Account
          </button>

          {/* Divider */}
          <div className="divider my-6 text-sm">Or continue with</div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button
              type="button"
              className="btn btn-outline w-full flex items-center gap-2"
              onClick={() => handleSocialLogin('google')}
            >
              <FcGoogle className="text-lg" /> Google
            </button>
            <button
              type="button"
              className="btn btn-outline w-full flex items-center gap-2"
              onClick={() => handleSocialLogin('github')}
            >
              <FaGithub className="text-lg text-blue-600" /> GitHub
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
        </form>
      </div>
    </div>
  );
}
