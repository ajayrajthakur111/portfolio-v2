

// src/api/axios.ts
import axios from 'axios';

// Create a base axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.yourportfolio.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error status codes
    if (error.response) {
      const { status } = error.response;
      
      if (status === 401) {
        // Unauthorized - possibly token expired
        localStorage.removeItem('auth_token');
        // Optional: Redirect to login or refresh token
      }
      
      if (status === 404) {
        // Resource not found
        console.error('Resource not found');
      }
      
      if (status >= 500) {
        // Server error
        console.error('Server error occurred');
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('Network error - no response received');
    } else {
      // Error in setting up the request
      console.error('Error setting up request:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;
