import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('refreshToken');
            const { data } = await axios.post('/api/refreshToken', { refreshToken });

            localStorage.setItem('token', data.token);
            originalRequest.headers['Authorization'] = `Bearer ${data.token}`;

            return axiosInstance(originalRequest);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;