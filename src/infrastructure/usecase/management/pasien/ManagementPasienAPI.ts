import type { ManagementPatient } from '@/infrastructure/models/management/pasien';
import http from '@/lib/axios';

export class ManagementPasienAPI {
    private readonly url: string = '/patient';

    async getList(
        params: ManagementPatient.Request.List
    ): Promise<ManagementPatient.Response.List> {
        const data = await http.get<ManagementPatient.Response.List>(this.url, {
            params
        });

        return data.data;
    }

    async create(
        body: ManagementPatient.Request.Create
    ): Promise<ManagementPatient.Response.Create> {
        const data = await http.post<ManagementPatient.Response.Create>(
            this.url,
            body
        );

        return data.data;
    }

    async update(
        body: ManagementPatient.Request.Update
    ): Promise<ManagementPatient.Response.Update> {
        const data = await http.put<ManagementPatient.Response.Update>(
            this.url,
            body
        );

        return data.data;
    }
}
