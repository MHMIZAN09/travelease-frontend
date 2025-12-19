import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { AuthContext } from '../components/provider/AuthProvider';
import axios from 'axios';
import loginAnimation from '../assets/Login.json';
import Lottie from 'lottie-react';
import { GithubAuthProvider, getAdditionalUserInfo } from 'firebase/auth';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [modalEmail, setModalEmail] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);
  const [pendingProvider, setPendingProvider] = useState(null);

  const {
    signInUser,
    signInWithGoogle,
    signInWithGithub,
    sendVerificationEmail,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  // Email/Password login
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signInUser(email, password);
      const loggedUser = result.user;

      if (!loggedUser.emailVerified) {
        toast.warning(t('loginVerifyEmail'));
        await sendVerificationEmail(loggedUser);
        return;
      }

      toast.success(
        t('loginWelcome', { name: loggedUser.displayName || t('loginUser') })
      );
      navigate('/');
    } catch (error) {
      toast.error(`${t('loginError')}: ${error.message}`);
    }
  };

  // Social login
  const handleSocialLogin = async (providerName) => {
    try {
      let result;
      if (providerName === 'google') {
        result = await signInWithGoogle();
      } else if (providerName === 'github') {
        const githubProvider = new GithubAuthProvider();
        githubProvider.addScope('user:email');
        result = await signInWithGithub(githubProvider);
      }

      const user = result.user;
      let email = user.email;

      if (!email && user.providerData?.length > 0) {
        email = user.providerData[0].email;
      }

      const additionalInfo = getAdditionalUserInfo(result);
      if (!email && additionalInfo?.profile?.email) {
        email = additionalInfo.profile.email;
      }

      if (!email) {
        setPendingUser(user);
        setPendingProvider(providerName);
        setShowEmailModal(true);
        return;
      }

      await saveUserToBackend(user, providerName, email);
    } catch (error) {
      console.error(error);
      toast.error(
        `${t('loginError')}: ${error.response?.data?.message || error.message}`
      );
    }
  };

  // Save user to backend
  const saveUserToBackend = async (user, provider, email) => {
    try {
      const res = await axios.post(
        'https://travelease-backend.vercel.app/api/users',
        {
          name: user.displayName || t('loginNoName'),
          email: email,
          uid: user.uid,
          photoURL: user.photoURL,
          provider: provider,
          role: 'customer',
        }
      );
      const loggedUser = res.data.data;
      toast.success(
        t('loginWelcome', { name: loggedUser.name || t('loginUser') })
      );
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error(
        `${t('backendError')}: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  // Modal submit
  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!modalEmail) {
      toast.error(t('loginEmailRequired'));
      return;
    }
    setShowEmailModal(false);
    if (pendingUser && pendingProvider) {
      await saveUserToBackend(pendingUser, pendingProvider, modalEmail);
      setPendingUser(null);
      setPendingProvider(null);
      setModalEmail('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-base-100 shadow-xl rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Lottie Animation */}
        <div className="hidden md:flex items-center justify-center bg-linear-to-br from-emerald-100 to-teal-100 p-6">
          <Lottie animationData={loginAnimation} loop autoplay />
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="p-8 md:p-10">
          <h2 className="text-3xl font-bold text-center">{t('loginTitle')}</h2>
          <p className="text-center text-gray-500 mb-6">{t('loginSubtitle')}</p>

          {/* Email */}
          <div className="form-control w-full mb-4">
            <span className="label-text">{t('loginEmail')}</span>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder={t('loginEmailPlaceholder')}
                className="input input-bordered w-full pl-12"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-control w-full mb-4">
            <span className="label-text">{t('loginPassword')}</span>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder={t('loginPasswordPlaceholder')}
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
                {t('loginForgotPassword')}
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="btn w-full bg-linear-to-r from-emerald-600 to-teal-600 text-white"
          >
            {t('loginSignIn')}
          </button>

          <div className="divider my-6 text-sm">{t('loginOrContinue')}</div>

          {/* Social Login */}
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
            {t('loginNoAccount')}{' '}
            <Link
              to="/register"
              className="text-primary font-medium hover:underline"
            >
              {t('loginSignUp')}
            </Link>
          </p>
        </form>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form
            onSubmit={handleModalSubmit}
            className="bg-white p-6 rounded-lg w-96 flex flex-col gap-4"
          >
            <h3 className="text-lg font-bold">{t('loginModalTitle')}</h3>
            <p className="text-sm text-gray-600">{t('loginModalSubtitle')}</p>
            <input
              type="email"
              value={modalEmail}
              onChange={(e) => setModalEmail(e.target.value)}
              placeholder={t('loginModalPlaceholder')}
              className="input input-bordered w-full"
              required
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowEmailModal(false)}
                className="btn btn-outline"
              >
                {t('loginModalCancel')}
              </button>
              <button type="submit" className="btn btn-primary">
                {t('loginModalSubmit')}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
