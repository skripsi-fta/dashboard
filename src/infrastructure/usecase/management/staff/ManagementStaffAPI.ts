import type { ManagementStaff } from '@/infrastructure/models/management/staff';

export class ManagementStaffAPI {
    // Test mock
    async getList(
        params: ManagementStaff.Request.List
    ): Promise<ManagementStaff.Response.List> {
        let data: ManagementStaff.Response.Data[] = [];

        await new Promise((resolve) => setTimeout(resolve, 5000));

        if (params.pageNumber === 1) {
            data = [
                {
                    id: 1,
                    email: 'fabian@gmail.com',
                    name: 'Fabian Habil',
                    role: 'Dokter',
                    username: 'fabianhabil',
                    doctorName: 'Fabian'
                },
                {
                    id: 2,
                    email: 'fabian@gmail.com',
                    name: 'Fabian Habil',
                    role: 'Dokter',
                    username: 'fabianhabil',
                    doctorName: 'Fabian'
                },
                {
                    id: 3,
                    email: 'fabian@gmail.com',
                    name: 'Fabian Habil',
                    role: 'Dokter',
                    username: 'fabianhabil',
                    doctorName: 'Fabian'
                },
                {
                    id: 4,
                    email: 'fabian@gmail.com',
                    name: 'Fabian Habil',
                    role: 'Dokter',
                    username: 'fabianhabil',
                    doctorName: 'Fabian'
                },
                {
                    id: 5,
                    email: 'fabian@gmail.com',
                    name: 'Fabian Habil',
                    role: 'Dokter',
                    username: 'fabianhabil',
                    doctorName: 'Fabian'
                }
            ];
        } else {
            data = [
                {
                    id: 6,
                    email: 'fabian@gmail.com',
                    name: 'Fabian Habil',
                    role: 'Dokter',
                    username: 'fabianhabil',
                    doctorName: 'Fabian'
                },
                {
                    id: 7,
                    email: 'fabian@gmail.com',
                    name: 'Fabian Habil',
                    role: 'Dokter',
                    username: 'fabianhabil',
                    doctorName: 'Fabian'
                },
                {
                    id: 8,
                    email: 'fabian@gmail.com',
                    name: 'Fabian Habil',
                    role: 'Dokter',
                    username: 'fabianhabil',
                    doctorName: 'Fabian'
                },
                {
                    id: 9,
                    email: 'fabian@gmail.com',
                    name: 'Fabian Habil',
                    role: 'Dokter',
                    username: 'fabianhabil',
                    doctorName: 'Fabian'
                },
                {
                    id: 10,
                    email: 'fabian@gmail.com',
                    name: 'Fabian Habil',
                    role: 'Dokter',
                    username: 'fabianhabil',
                    doctorName: 'Fabian'
                }
            ];
        }

        return { data, message: 'HALO', statusCode: 200, totalData: 10 };
    }
}
