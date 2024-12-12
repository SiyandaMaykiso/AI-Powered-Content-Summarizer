import axios from 'axios';

// Replace this import
// import api from './api';

// Use Axios directly
const fetchData = async () => {
    try {
        const response = await axios.get('https://ai-powered-content-summarizer-71f343ba410f.herokuapp.com/api/some-endpoint');
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

fetchData();