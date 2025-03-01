import type { GlobalModels } from '@/infrastructure/models/global';
import type { ManagementSpesialisasiDokter } from '@/infrastructure/models/management/spesialisasidokter';
import http from '@/lib/axios';

export class ManagementSpecializationAPI {
    async getList(
        params: ManagementSpesialisasiDokter.Request.List
    ): Promise<ManagementSpesialisasiDokter.Response.List> {
        const data = await http.get<ManagementSpesialisasiDokter.Response.List>(
            '/management/specialization',
            {
                params
            }
        );

        return data.data;
    }

    async create(
        body: ManagementSpesialisasiDokter.Request.Create
    ): Promise<ManagementSpesialisasiDokter.Response.Create> {
        const formData = new FormData();
        formData.append('name', body.name);
        formData.append('description', body.description);
        formData.append('image', body.image);

        const data = await http.post<ManagementSpesialisasiDokter.Response.Create>(
            '/management/specialization',
            formData
        );

        return data.data;
    }

    async switch(
        body: ManagementSpesialisasiDokter.Request.Switch
    ): Promise<ManagementSpesialisasiDokter.Response.Switch> {
        const data =
            await http.put<ManagementSpesialisasiDokter.Response.Switch>(
                '/management/specialization/switch',
                body
            );

        return data.data;
    }

    async update(
        body: ManagementSpesialisasiDokter.Request.Update
    ): Promise<ManagementSpesialisasiDokter.Response.Update> {
        const formData = new FormData();
        formData.append('id', body.id.toString());
        formData.append('name', body.name);
        formData.append('description', body.description);
        formData.append('image', body.image);

        const data = await http.put<ManagementSpesialisasiDokter.Response.Update>(
            '/management/specialization',
            formData
        );

        return data.data;
    }

    async getDropdown(): Promise<GlobalModels.DropdownData> {
        const data = await http.get<ManagementSpesialisasiDokter.Response.List>(
            '/management/specialization'
        );

        return {
            data: data.data.data.map((d) => ({
                label: d.name,
                value: `${d.id}`
            }))
        };
    }
}
