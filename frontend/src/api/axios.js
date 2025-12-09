import axios from "axios";

const BASE_URI = import.meta.env.VITE_BASE_URI;

const api = axios.create({
  baseURL: BASE_URI,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;