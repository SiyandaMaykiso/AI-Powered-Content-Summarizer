// src/api.js
import axios from 'axios';

// Create an Axios instance with the correct base URL
const api = axios.create({
    baseURL: 'http://localhost:3001/api', // Change to your production backend URL during deployment
});

// Export the Axios instance
export default api;