import axios from 'axios';


export const API = axios.create({
    baseURL: 'http://0.0.0.0:3004/',
});

export default API