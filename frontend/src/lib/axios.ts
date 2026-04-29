import axios from 'axios';
import { auth } from './firebase';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://ocr-u72s.onrender.com/api',
});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
