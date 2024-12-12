// src/api.js
import axios from 'axios';

// Set the base URL dynamically from the environment variable
const API_BASE_URL = process.env.REACT_APP_API_URL;

// Check if the API_BASE_URL is defined
if (!API_BASE_URL) {
    console.error("REACT_APP_API_URL is not defined in the environment variables. Please set it in your .env file.");
    throw new Error("API base URL is missing. Ensure REACT_APP_API_URL is defined.");
}

// Create an Axios instance with the correct base URL
const api = axios.create({
    baseURL: API_BASE_URL, // Use the environment variable for production
});

// Export the Axios instance
export default api;