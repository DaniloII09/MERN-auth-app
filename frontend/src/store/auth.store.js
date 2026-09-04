import { create } from "zustand";
import axios from "axios";

const API_AUTH_URL = import.meta.env.VITE_API_AUTH_URL;

axios.defaults.withCredentials = true;
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  errors: [],
  isLoading: false,
  isCheckingAuth: true,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null, errors: [] });
    try {
      const response = await axios.post(`${API_AUTH_URL}/signup`, {
        email,
        password,
        name,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error signing up",
        errors: error.response?.data?.errors || [],
        isLoading: false,
      });
      throw error;
    }
  },
  verifyEmail: async (code) => {
    set({ isLoading: true, error: null, errors: [] });
    try {
      const response = await axios.post(`${API_AUTH_URL}/verify-email`, {
        code,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error verifying email",
        errors: error.response?.data?.errors || [],
        isLoading: false,
      });
      throw error;
    }
  },
}));
