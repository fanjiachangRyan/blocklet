import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    const prefix = window.blocklet ? window.blocklet.prefix : '/';
    config.baseURL = prefix || '';
    config.timeout = 200000;

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use((response) => {
  return new Promise((resolve) => {
    const { data: res, status } = response;
    if (status === 200) {
      const { data } = res;

      resolve(data);
    }
  });
});

export default axios;
