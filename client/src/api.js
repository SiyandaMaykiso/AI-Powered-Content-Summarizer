import axios from 'axios';

// Set the base URL dynamically for production and development
const API_BASE_URL = 
    process.env.REACT_APP_API_URL || // Use the environment variable if defined
    "https://ai-powered-content-summarizer-71f343ba410f.herokuapp.com/api"; // Default to production URL

// Log a warning if the environment variable is missing (helpful for debugging in development)
if (!process.env.REACT_APP_API_URL) {
    console.warn("REACT_APP_API_URL is not defined. Defaulting to production base URL.");
}

// Create an Axios instance with the base URL
const api = axios.create({
    baseURL: API_BASE_URL, // Set the base URL for Axios
});

// Export the Axios instance
export default api;