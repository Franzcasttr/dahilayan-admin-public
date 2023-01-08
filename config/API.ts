import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { initFirebase } from '../firebase/firebaseApp';

const baseURL = process.env.NEXT_PUBLIC_API_URL;
export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

API.interceptors.request.use(
  async (config) => {
    // initFirebase();
    const auth = getAuth();

    const token = await auth.currentUser?.getIdToken(false);

    if (token) {
      config.headers!['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
