import axios from 'axios';
import { getSessionStorageItem } from './sessionStorageUtils';
import { USER_DETAILS } from './constants';

const axiosInstance = axios.create({
    // baseURL: 'https://localhost:7041/api', replace with your API URL
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getSessionStorageItem(USER_DETAILS)?.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle errors globally
        if (error.response.status === 401) {
            // Handle unauthorized errors
            console.error('Unauthorized access - maybe redirect to login');
        } else if (error.response.status === 500) {
            // Handle server errors
            console.error('Server error - show a notification or something');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;