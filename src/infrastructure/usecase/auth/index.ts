import type { LoginType } from '@/infrastructure/models/auth/login';
import http from '@/lib/axios';

export class AuthAPI {
    async login(body: LoginType.Request): Promise<LoginType.Response> {
        const data = await http.post<LoginType.Response>('/auth/login', body);

        return data.data;
    }
}
