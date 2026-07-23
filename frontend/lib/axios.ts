import axios from "axios";
import { useAuthStore } from "./store";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
  withCredentials: true, // If backend uses cookies
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is 401 and it's not a retry request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Attempt to refresh the token using the refresh endpoint
        // This endpoint will automatically send the HttpOnly refreshToken cookie
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        
        if (res.data.success && res.data.data.accessToken) {
          const newAccessToken = res.data.data.accessToken;
          // Save the new access token
          useAuthStore.getState().setToken(newAccessToken);
          
          // Update the authorization header for the original request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          // Retry the original request
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refreshing fails (e.g., refresh token is expired/invalid)
        useAuthStore.getState().logout();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    } else if (error.response?.status === 401 && originalRequest._retry) {
      // If retried 401 (refresh failed or token invalid), log out
      useAuthStore.getState().logout();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
