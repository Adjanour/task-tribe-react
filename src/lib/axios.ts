import Axios, { InternalAxiosRequestConfig } from 'axios';
import { notification } from 'antd';

import { API_URL } from '@/config';
import storage from '@/utils/storage';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
    const token = storage.getToken();
    if (token) {
        config.headers.authorization = `token ${token}`;
    }
    config.headers.Accept = 'application/json';
    return config;
}

export const axios = Axios.create({
    baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);

// axios.interceptors.response.use(
//     (response) => {
//         return response.data;
//     },
//     (error) => {
//         const message = error.response?.data?.message || error.message;
//         notification.warning({
//             message: ` Error ${error.response?.status}}`,
//             description: message,
//             placement: 'topLeft',
//           });
//         return Promise.reject(error);
//     }
// );