import axios from 'axios';


export const API = axios.create({
    baseURL : 'https://lais-api-carteira-vacinacao.herokuapp.com/api',
});