import axios from 'axios';

const weatherURL = 'https://openweathermap.org/';
export const API = axios.create({ baseURL: weatherURL });
