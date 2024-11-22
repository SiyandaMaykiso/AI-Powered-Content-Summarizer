// src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api', // Change to backend URL in production
});

export default api;