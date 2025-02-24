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

export default axiosInstance;