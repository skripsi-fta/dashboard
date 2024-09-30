import type { ManagementStaff } from '@/infrastructure/models/management/staff';
import http from '@/lib/axios';

export class ManagementStaffAPI {
    async getList(
        params: ManagementStaff.Request.List
    ): Promise<ManagementStaff.Response.List> {
        const data = await http.get<ManagementStaff.Response.List>(
            '/management/staff',
            {
                params
            }
        );

        return data.data;
    }

    async createStaff(
        body: ManagementStaff.Request.Create
    ): Promise<ManagementStaff.Response.Create> {
        const data = await http.post<ManagementStaff.Response.Create>(
            '/management/staff',
            body
        );

        return data.data;
    }

    async updateStaff(
        body: ManagementStaff.Request.Update
    ): Promise<ManagementStaff.Response.Update> {
        const data = await http.put<ManagementStaff.Response.Update>(
            '/management/staff',
            body
        );

        return data.data;
    }

    async deleteStaff(id: number): Promise<ManagementStaff.Response.Delete> {
        const data = await http.delete<ManagementStaff.Response.Delete>(
            '/management/staff',
            { params: { id } }
        );

        return data.data;
    }
}
