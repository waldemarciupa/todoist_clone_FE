import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://my-todoist-clone.herokuapp.com'
      : 'http://localhost:8000',
});

// Set the AUTH token for any request
api.interceptors.request.use(function (config) {
  const user: string | null = localStorage.getItem('user');
  config.headers.user = user ? JSON.parse(user).token : '';
  config.headers.user_id = user ? JSON.parse(user).id : '';
  return config;
});

export default api;
