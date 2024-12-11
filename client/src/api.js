// src/api.js
import axios from 'axios';

// Set the base URL dynamically based on the environment
const API_BASE_URL =
    process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Create an Axios instance with the correct base URL
const api = axios.create({
    baseURL: API_BASE_URL, // Dynamic base URL for API calls
});

// Export the Axios instance
export default api;