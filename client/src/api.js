import axios from 'axios';


const API_BASE_URL = 
    process.env.REACT_APP_API_URL || 
    "https://ai-powered-content-summarizer-71f343ba410f.herokuapp.com/api"; 


if (!process.env.REACT_APP_API_URL) {
    console.warn("REACT_APP_API_URL is not defined. Defaulting to production base URL.");
}


const api = axios.create({
    baseURL: API_BASE_URL, 
});


export default api;