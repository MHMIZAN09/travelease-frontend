import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, User, Lock, Eye, EyeOff } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../components/provider/AuthProvider';
import { toast } from 'react-toastify';
import axios from 'axios';
import { updateProfile } from 'firebase/auth';
import { getAdditionalUserInfo, GithubAuthProvider } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Register() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [modalEmail, setModalEmail] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);
  const [pendingProvider, setPendingProvider] = useState(null);

  const { signInWithGoogle, createUser, signInWithGithub } =
    useContext(AuthContext);
  const navigate = useNavigate();

  // Normal email/password registration
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) return toast.error(t('passwordMismatch'));
    if (password.length < 6) return toast.error(t('passwordMinLength'));
    if (!/[A-Z]/.test(password)) return toast.error(t('passwordUppercase'));
    if (!/[0-9]/.test(password)) return toast.error(t('passwordNumber'));
    if (!/[!@#$%^&*]/.test(password)) return toast.error(t('passwordSpecial'));

    try {
      const result = await createUser(email, password);
      const user = result.user;

      await updateProfile(user, {
        displayName: name,
        photoURL: 'https://example.com/default-avatar.png',
      });

      await saveUserToBackend(user, 'password', email);

      form.reset();
      toast.success(t('registrationSuccess'));
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Social login registration
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
        t('loginError', {
          message: error.response?.data?.message || error.message,
        })
      );
    }
  };

  // Save user to backend
  const saveUserToBackend = async (user, provider, email) => {
    try {
      const res = await axios.post('http://localhost:5000/api/users', {
        name: user.displayName || t('noName'),
        email,
        uid: user.uid,
        photoURL: user.photoURL || 'https://example.com/default-avatar.png',
        provider,
        role: 'customer',
      });

      toast.success(
        t('welcomeUser', { name: res.data.data.name || t('user') })
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

  // Modal submit for missing email
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
        <div className="hidden md:flex items-center justify-center bg-linear-to-br from-emerald-100 to-teal-100 p-6">
          <DotLottieReact src="/registration.json" loop autoplay />
        </div>

        <form onSubmit={handleRegister} className="p-8 md:p-10 w-full">
          <h2 className="text-3xl font-bold text-center">
            {t('createAccount')}
          </h2>
          <p className="text-center text-gray-500 mb-6">
            {t('joinTravelEase')}
          </p>

          <div className="form-control w-full mb-4">
            <span className="label-text">{t('fullName')}</span>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder={t('enterFullName')}
                className="input input-bordered w-full pl-12"
                required
              />
            </div>
          </div>

          <div className="form-control w-full mb-4">
            <span className="label-text">{t('email')}</span>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder={t('enterEmail')}
                className="input input-bordered w-full pl-12"
                required
              />
            </div>
          </div>

          <div className="form-control w-full mb-4">
            <span className="label-text">{t('password')}</span>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder={t('createPassword')}
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

          <div className="form-control w-full mb-6">
            <span className="label-text">{t('confirmPassword')}</span>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder={t('reEnterPassword')}
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

          <button
            type="submit"
            className="btn w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
          >
            {t('createAccount')}
          </button>

          <div className="divider my-6 text-sm">{t('orContinueWith')}</div>

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

          <p className="text-center text-sm text-gray-600 mt-2">
            {t('alreadyHaveAccount')}{' '}
            <Link
              to="/login"
              className="text-primary font-medium hover:underline"
            >
              {t('signIn')}
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
