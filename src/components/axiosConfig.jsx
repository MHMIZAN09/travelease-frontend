import axios from 'axios';

const api = axios.create({
  baseURL: 'https://travelease-backend.vercel.app/',
  withCredentials: true, // SEND COOKIES
});

export default api;
