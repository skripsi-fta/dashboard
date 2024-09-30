import type { Profile } from '@/infrastructure/models/auth/profile';
import axios from 'axios';
import { toast } from 'sonner';

const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

const refreshAccessToken = async () => {
    try {
        const stringData =
            typeof window !== 'undefined'
                ? localStorage.getItem('user-data')
                : null;

        if (!stringData) {
            throw new Error('No User Data');
        }

        const profileData: Profile.Response = JSON.parse(stringData);

        const response = await axios.get('/auth/refresh', {
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            headers: {
                Authorization: `Bearer ${profileData.refreshToken}`
            }
        });

        const { token } = response.data;

        localStorage.setItem(
            'user-data',
            JSON.stringify({ ...profileData, token })
        );

        return token;
    } catch (error) {
        console.error('Failed to refresh token', error);
        throw error;
    }
};

http.interceptors.request.use(
    (config) => {
        const stringData =
            typeof window !== 'undefined'
                ? localStorage.getItem('user-data')
                : null;

        if (!stringData) {
            return config;
        }

        const token: Profile.Response = JSON.parse(stringData);

        if (token) {
            config.headers.Authorization = `Bearer ${token.token}`;
        }

        return config;
    },
    (error) => {
        throw error;
    }
);

http.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry &&
            originalRequest?.headers?.Authorization
        ) {
            originalRequest._retry = true;

            try {
                const newToken = await refreshAccessToken();

                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                return http(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('user-data');

                toast.error('Session Expired');

                window.location.href = '/login';

                return Promise.reject(refreshError);
            }
        }

        throw error;
    }
);

http.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (
            error.response &&
            error.response.status === 403 &&
            error?.config?.headers?.Authorization
        ) {
            window.location.replace('/dashboard/500');
            return;
        }

        throw error;
    }
);

export default http;
