import axios from 'axios';
import toast from 'react-hot-toast';

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api',
//   timeout: 30000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });



// const api = axios.create({
//   baseURL: "/api",
//   withCredentials: true,
// });





const api = axios.create({
  baseURL: "/api",

  
});





// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle responses & auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      toast.error('Session expired. Please login again.');
    } else if (error.response?.status === 429) {
      toast.error('Too many requests. Please slow down.');
    }

    return Promise.reject(error);
  }
);

export default api;