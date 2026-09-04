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
  clearError: () => set({ error: null, errors: [] }),
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
  resendVerificationEmail: async (email) => {
    set({ isLoading: true, error: null, errors: [] });
    try {
      const response = await axios.post(
        `${API_AUTH_URL}/resend-verification-email`,
        {
          email,
        },
      );
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error resending code",
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
  login: async (email, password) => {
    set({ isLoading: true, error: null, errors: [] });
    try {
      const response = await axios.post(`${API_AUTH_URL}/login`, {
        email,
        password,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging in",
        errors: error.response?.data?.errors || [],
        isLoading: false,
      });
      throw error;
    }
  },
  logout: async () => {
    set({ isLoading: true, error: null, errors: [] });
    try {
      await axios.post(`${API_AUTH_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging out",
        errors: error.response?.data?.errors || [],
        isLoading: false,
      });
      throw error;
    }
  },
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null, errors: [] });
    try {
      await axios.post(`${API_AUTH_URL}/forgot-password`, {
        email,
      });
      set({
        isLoading: false,
        error: null,
        errors: [],
      });
      return true;
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Error sending reset password email",
        errors: error.response?.data?.errors || [],
        isLoading: false,
      });
      return false;
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null, errors: [] });
    try {
      const response = await axios.get(`${API_AUTH_URL}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({
        error: null,
        errors: [],
        isCheckingAuth: false,
      });
    }
  },
}));
