import axios from 'axios';

const api = axios.create({
  baseURL: 'http://89.116.25.43:3500/api',
});

export default api;
