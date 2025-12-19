import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../components/provider/AuthProvider';
import auth from '../../components/firebase/firebase.init';
import { toast } from 'react-toastify';
import {
  FaEdit,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaBirthdayCake,
  FaUser,
  FaVenusMars,
  FaEnvelope,
  FaGlobe,
  FaHome,
  FaCity,
  FaMapPin,
  FaCamera,
} from 'react-icons/fa';

export default function UserProfile() {
  const { loading: authLoading } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    gender: '',
    dob: '',
    bio: '',
    photoURL: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: 'Bangladesh',
    },
  });

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!auth.currentUser) return;
      try {
        const token = await auth.currentUser.getIdToken();
        const res = await axios.get(
          `http://localhost:5000/api/users/${auth.currentUser.uid}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = res.data.data;
        setProfile(data);
        setFormData({
          name: data.name || '',
          phone: data.phone || '',
          gender: data.gender || '',
          dob: data.dob ? data.dob.split('T')[0] : '',
          bio: data.bio || '',
          photoURL: data.photoURL || '',
          address: {
            street: data.address?.street || '',
            city: data.address?.city || '',
            state: data.address?.state || '',
            zip: data.address?.zip || '',
            country: data.address?.country || 'Bangladesh',
          },
        });
      } catch (err) {
        console.error(err);
        toast.error('Failed to load profile');
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        address: { ...formData.address, [field]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const apiKey = '92e1c9de53c667fa27340a69930020cb'; // Consider moving to env
    const formDataImg = new FormData();
    formDataImg.append('image', file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formDataImg
      );
      const imageUrl = res.data.data.url;
      setFormData((prev) => ({ ...prev, photoURL: imageUrl }));
      toast.success('Image uploaded successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Image upload failed');
    }
  };

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const token = await auth.currentUser.getIdToken();
      const res = await axios.put(
        `http://localhost:5000/api/users/${auth.currentUser.uid}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile(res.data.data);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading your profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="bg-linear-to-r from-emerald-500 to-emerald-600 text-white rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <img
              src={
                formData.photoURL || profile.photoURL || '/default-avatar.png'
              }
              alt="Profile"
              className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-white shadow-xl"
            />
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-white text-emerald-600 p-3 rounded-full cursor-pointer shadow hover:bg-gray-100 transition">
                <FaCamera className="w-6 h-6" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">
              {formData.name || 'Traveler'}
            </h1>
            <p className="text-xl opacity-90 mb-4">{profile.email}</p>
            <p className="text-lg italic">
              {formData.bio || 'Traveler at heart 🌍'}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-8 py-3 bg-white text-emerald-600 font-bold rounded-full shadow-lg hover:bg-gray-100 transition"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition flex items-center gap-4">
            <FaPhoneAlt className="text-emerald-500 text-4xl" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-lg font-semibold">{formData.phone || 'N/A'}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition flex items-center gap-4">
            <FaBirthdayCake className="text-emerald-500 text-4xl" />
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="text-lg font-semibold">{formData.dob || 'N/A'}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition flex items-center gap-4">
            <FaVenusMars className="text-emerald-500 text-4xl" />
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="text-lg font-semibold capitalize">
                {formData.gender || 'N/A'}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition flex items-center gap-4">
            <FaMapMarkerAlt className="text-emerald-500 text-4xl" />
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="text-lg font-semibold">
                {formData.address.city || 'N/A'},{' '}
                {formData.address.country || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-emerald-700 mb-8 text-center md:text-left">
              Edit Your Profile
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2 items-center gap-2"
                >
                  <FaUser /> Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
                >
                  <FaPhoneAlt /> Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+880 1XXXXXXXXX"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
                >
                  <FaBirthdayCake /> Date of Birth
                </label>
                <input
                  id="dob"
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />
              </div>

              {/* Gender */}
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
                >
                  <FaVenusMars /> Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Email (Disabled) */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaEnvelope /> Email Address
                </label>
                <input
                  value={profile.email}
                  disabled
                  className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Email cannot be changed
                </p>
              </div>

              {/* Profile Image */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaCamera /> Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />
                {formData.photoURL && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Preview:</p>
                    <img
                      src={formData.photoURL}
                      alt="Preview"
                      className="w-32 h-32 rounded-full object-cover border-4 border-emerald-100 shadow-md"
                    />
                  </div>
                )}
              </div>

              {/* Bio */}
              <div className="md:col-span-2">
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us a bit about yourself..."
                  rows={4}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />
              </div>

              {/* Address Fields */}
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="street"
                    className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
                  >
                    <FaHome /> Street Address
                  </label>
                  <input
                    id="street"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    placeholder="House no, Road no"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
                  >
                    <FaCity /> City
                  </label>
                  <input
                    id="city"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    placeholder="e.g., Dhaka"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
                  >
                    <FaGlobe /> Country
                  </label>
                  <input
                    id="country"
                    name="address.country"
                    value={formData.address.country}
                    onChange={handleChange}
                    placeholder="Bangladesh"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
                  >
                    <FaMapPin /> State/Region
                  </label>
                  <input
                    id="state"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleChange}
                    placeholder="e.g., Dhaka Division"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="zip"
                    className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
                  >
                    <FaMapPin /> ZIP Code
                  </label>
                  <input
                    id="zip"
                    name="address.zip"
                    value={formData.address.zip}
                    onChange={handleChange}
                    placeholder="e.g., 1200"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-end gap-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-8 py-3 bg-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={saving}
                className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
