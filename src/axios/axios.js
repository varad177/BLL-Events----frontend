import axios from 'axios';

const api = axios.create({
 // baseURL: 'http://localhost:5000', // replace with your API base URL
    baseURL: 'https://bll-backend.onrender.com', 
 
});

export default api;
