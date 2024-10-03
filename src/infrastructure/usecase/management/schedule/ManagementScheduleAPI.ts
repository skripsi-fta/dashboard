import type { ManagementFixedScheduleDoctor } from '@/infrastructure/models/management/schedule/fixed';
import type { ManagementRegulerScheduleDoctor } from '@/infrastructure/models/management/schedule/reguler';
import http from '@/lib/axios';

export class ManagementScheduleAPI {
    private readonly url: string = '/management/schedule';

    async getScheduleList(
        params: ManagementRegulerScheduleDoctor.Request.List
    ): Promise<ManagementRegulerScheduleDoctor.Response.List> {
        console.log(params);

        const data =
            await http.get<ManagementRegulerScheduleDoctor.Response.List>(
                `${this.url}`,
                { params }
            );

        return data.data;
    }

    async getFixedScheduleList(
        params: ManagementFixedScheduleDoctor.Request.List
    ): Promise<ManagementFixedScheduleDoctor.Response.List> {
        const data =
            await http.get<ManagementFixedScheduleDoctor.Response.List>(
                `${this.url}/fixed`,
                { params }
            );

        return data.data;
    }

    async createFixedSchedule(
        body: ManagementFixedScheduleDoctor.Request.Create
    ): Promise<ManagementFixedScheduleDoctor.Response.Create> {
        const data =
            await http.post<ManagementFixedScheduleDoctor.Response.Create>(
                `${this.url}/fixed`,
                body
            );

        return data.data;
    }

    async updateFixedSchedule(
        body: ManagementFixedScheduleDoctor.Request.Update
    ): Promise<ManagementFixedScheduleDoctor.Response.Update> {
        const data =
            await http.put<ManagementFixedScheduleDoctor.Response.Update>(
                `${this.url}/fixed`,
                body
            );

        return data.data;
    }
}
