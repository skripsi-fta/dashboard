import { ManagementRuangan } from '@/infrastructure/models/management/ruangan';
import http from '@/lib/axios';

export class ManagementRuanganAPI {
    async getList(
        params: ManagementRuangan.Request.List
    ): Promise<ManagementRuangan.Response.List> {
        const data = await http.get<ManagementRuangan.Response.List>(
            '/ruangan',
            { params }
        );

        return data.data;
    }

    async create(
        body: ManagementRuangan.Request.Create
    ): Promise<ManagementRuangan.Response.Create> {
        const data =
            await http.post<ManagementRuangan.Response.Create>(
                '/ruangan',
                body
            );

        return data.data;
    }

    async update(
        body: ManagementRuangan.Request.Update
    ): Promise<ManagementRuangan.Response.Update> {
        const data =
            await http.put<ManagementRuangan.Response.Update>(
                '/ruangan',
                body
            );

        return data.data;
    }

    async delete(
        params: ManagementRuangan.Request.Delete
    ): Promise<ManagementRuangan.Response.Delete> {
        const data = await http.delete<ManagementRuangan.Response.Delete>(
            '/ruangan',
            { params }
        );

        return data.data;
    }
}
