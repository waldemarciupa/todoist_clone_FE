import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://my-todoist-clone.herokuapp.com'
      : 'http://localhost:8000',
});

// Set the AUTH token for any request
api.interceptors.request.use(function (config) {
  const user = JSON.parse(localStorage.getItem('user'));
  config.headers.user = user ? user.token : '';
  config.headers.user_id = user ? user.id : '';
  return config;
});

export default api;
