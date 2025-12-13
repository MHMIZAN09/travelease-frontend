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
} from 'react-icons/fa';

export default function UserProfile() {
  const { loading } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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
      try {
        if (!auth.currentUser) return;
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

  // Handle form input changes
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

  // Update profile
  const handleUpdate = async () => {
    try {
      const token = await auth.currentUser.getIdToken();
      const res = await axios.put(
        `http://localhost:5000/api/users/${auth.currentUser.uid}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile(res.data.data);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (err) {
      console.error(err);
      toast.error('Update failed');
    }
  };

  // Upload image to imgBB
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const apiKey = '92e1c9de53c667fa27340a69930020cb';
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

  if (loading || !profile)
    return <div className="text-center mt-20 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto my-12">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-linear-to-r from-emerald-400 to-emerald-500 text-white rounded-2xl p-8 shadow-lg">
        <img
          src={formData.photoURL || profile.photoURL || '/default-avatar.png'}
          alt="Profile"
          className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border- shadow-lg object-cover"
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold">{formData.name}</h1>
          <p className="mt-2">{profile.email}</p>
          <p className="mt-1 text-sm">
            {formData.bio || 'Traveler at heart 🌍'}
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="mt-4 md:mt-0 px-6 py-2 bg-white text-emerald-600 font-semibold rounded-full shadow hover:bg-gray-100 transition"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {/* Stats / Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition flex flex-col items-center">
          <FaPhoneAlt className="text-green-500 text-3xl mb-2" />
          <p className="text-gray-500 text-sm">Phone</p>
          <p className="font-semibold">{formData.phone || 'N/A'}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition flex flex-col items-center">
          <FaBirthdayCake className="text-green-500 text-3xl mb-2" />
          <p className="text-gray-500 text-sm">Date of Birth</p>
          <p className="font-semibold">{formData.dob || 'N/A'}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition flex flex-col items-center">
          <FaMapMarkerAlt className="text-green-500 text-3xl mb-2" />
          <p className="text-gray-500 text-sm">Location</p>
          <p className="font-semibold">
            {formData.address.city || 'N/A'},{' '}
            {formData.address.country || 'N/A'}
          </p>
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="bg-white rounded-2xl p-8 mt-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="p-3 border rounded-md focus:ring-2 focus:ring-green-400"
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="p-3 border rounded-md focus:ring-2 focus:ring-green-400"
            />
            <input
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              className="p-3 border rounded-md focus:ring-2 focus:ring-green-400"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="p-3 border rounded-md focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              name="email"
              value={profile.email}
              disabled
              className="p-3 border rounded-md bg-gray-100 cursor-not-allowed"
            />
            {/* imgBB Upload Input */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="p-3 border rounded-md focus:ring-2 focus:ring-green-400 w-full"
              />
              {formData.photoURL && (
                <img
                  src={formData.photoURL}
                  alt="Preview"
                  className="mt-2 w-32 h-32 rounded-full object-cover"
                />
              )}
            </div>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Bio"
              className="p-3 border rounded-md focus:ring-2 focus:ring-green-400 md:col-span-2"
              rows={4}
            />
            {['street', 'city', 'state', 'zip', 'country'].map((addr) => (
              <input
                key={addr}
                name={`address.${addr}`}
                value={formData.address[addr]}
                onChange={handleChange}
                placeholder={addr.charAt(0).toUpperCase() + addr.slice(1)}
                className="p-3 border rounded-md focus:ring-2 focus:ring-green-400"
              />
            ))}
          </div>
          <div className="mt-6 text-right">
            <button
              onClick={handleUpdate}
              className="px-6 py-3 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
