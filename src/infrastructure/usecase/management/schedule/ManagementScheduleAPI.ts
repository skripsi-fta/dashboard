import type { GlobalModels } from '@/infrastructure/models/global';
import type { ManagementFixedScheduleDoctor } from '@/infrastructure/models/management/schedule/fixed';
import type { ManagementRegulerScheduleDoctor } from '@/infrastructure/models/management/schedule/reguler';
import http from '@/lib/axios';

export class ManagementScheduleAPI {
    async getDropdown(
        params: ManagementRegulerScheduleDoctor.Request.List
    ): Promise<GlobalModels.DropdownData> {
        const data =
            await http.get<ManagementRegulerScheduleDoctor.Response.List>(
                '/management/schedule',
                { params }
            );
        return {
            data:
                data?.data?.data?.map((d) => ({
                    label: `${d.doctor.name} (${d.doctor.specialization.name}) - ${d.startTime}-${d.endTime} - ${d.room.name}`,
                    value: d.id.toString()
                })) || []
        };
    }

    private readonly url: string = '/management/schedule';

    async getScheduleList(
        params: ManagementRegulerScheduleDoctor.Request.List
    ): Promise<ManagementRegulerScheduleDoctor.Response.List> {
        const data =
            await http.get<ManagementRegulerScheduleDoctor.Response.List>(
                `${this.url}`,
                { params }
            );

        return data.data;
    }

    async createRegulerSchedule(
        body: ManagementRegulerScheduleDoctor.Request.Create
    ): Promise<ManagementRegulerScheduleDoctor.Response.Create> {
        const data =
            await http.post<ManagementRegulerScheduleDoctor.Response.Create>(
                this.url,
                body
            );

        return data.data;
    }

    async changeSchedule(
        body: ManagementRegulerScheduleDoctor.Request.Change
    ): Promise<ManagementRegulerScheduleDoctor.Response.Change> {
        const data =
            await http.put<ManagementRegulerScheduleDoctor.Response.Change>(
                this.url,
                body
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

    async getScheduleById(
        params: ManagementRegulerScheduleDoctor.Request.GetById
    ): Promise<ManagementRegulerScheduleDoctor.Response.GetById> {
        const data =
            await http.get<ManagementRegulerScheduleDoctor.Response.GetById>(
                `${this.url}/${params.id}`
            );

        return data.data;
    }

    async approvalSchedule(
        body: ManagementRegulerScheduleDoctor.Request.Approval
    ): Promise<ManagementRegulerScheduleDoctor.Response.Approval> {
        const data =
            await http.put<ManagementRegulerScheduleDoctor.Response.Approval>(
                `${this.url}/approval`,
                body
            );

        return data.data;
    }
}
