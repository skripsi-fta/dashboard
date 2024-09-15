import type { AxiosInstance } from 'axios';
import axios from 'axios';

const http: AxiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`
});

export default http;
