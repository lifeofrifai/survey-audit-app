// api.js

import axios from 'axios';
import BaseURL from '../../config';

const baseURL = BaseURL;

const api = axios.create({
  baseURL: baseURL,
  timeout: 10000, // timeout jika diperlukan
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // Anda dapat menambahkan header lain jika diperlukan
  },
});

export default api;
