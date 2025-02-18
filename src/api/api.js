import axios from 'axios';

// Use MirageJS' local API instead of real backend
const API = axios.create({
  baseURL: '/api', // This points to the MirageJS server
  headers: { 'Content-Type': 'application/json' },
});

// Mock API requests
export const loginUser = (data) => API.post('/login', data);
export const registerUser = (data) => API.post('/register', data);
export const getTasks = () => API.get('/tasks');
export const getTaskById = (id) => API.get(`/tasks/${id}`);

export default API;

