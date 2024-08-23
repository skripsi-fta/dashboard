import type { LoginType } from '@/infrastructure/models/auth/login';

export class AuthAPI {
    async login(data: LoginType.Request): Promise<LoginType.Response> {
        // Mock
        if (data.email === 'doctor@gmail.com' && data.password === '1') {
            return {
                email: 'doctor@gmail.com',
                id: 1,
                name: 'Fabian Habil Ramdhan',
                password: 'admin',
                role: 'doctor'
            };
        } else if (
            data.email === 'pharmacy@gmail.com' &&
            data.password === '1'
        ) {
            return {
                email: 'pharmacy@gmail.com',
                id: 1,
                name: 'Fabian Habil Ramdhan',
                password: 'admin',
                role: 'pharmacy'
            };
        } else if (
            data.email === 'cashier@gmail.com' &&
            data.password === '1'
        ) {
            return {
                email: 'cashier@gmail.com',
                id: 1,
                name: 'Fabian Habil Ramdhan',
                password: 'admin',
                role: 'cashier'
            };
        } else if (
            data.email === 'management@gmail.com' &&
            data.password === '1'
        ) {
            return {
                email: 'management@gmail.com',
                id: 1,
                name: 'Fabian Habil Ramdhan',
                password: 'admin',
                role: 'management'
            };
        }

        throw new Error('User Not Found');
    }
}
