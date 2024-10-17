import type { ManagementAppointment } from '@/infrastructure/models/management/janjitemu';
import http from '@/lib/axios';

export class ManagementAppointmentAPI {

    async getList(
        params: ManagementAppointment.Request.List
    ): Promise<ManagementAppointment.Response.List> {
        const data = await http.get<ManagementAppointment.Response.List>(
            '/management/appointment',
            { params }
        );

        return data.data;
    }

    async create(
        body: ManagementAppointment.Request.Create
    ): Promise<ManagementAppointment.Response.Create> {
        const data = await http.post<ManagementAppointment.Response.Create>(
            '/management/appointment',
            body
        );

        return data.data;
    }

    async update(
        body: ManagementAppointment.Request.Update
    ): Promise<ManagementAppointment.Response.Update> {
        const data = await http.put<ManagementAppointment.Response.Update>(
            '/management/appointment',
            body
        );

        return data.data;
    }

    async createCheckIn(
        body: ManagementAppointment.Request.CheckIn
    ): Promise<ManagementAppointment.Response.CheckIn> {
        const data =
            await http.post<ManagementAppointment.Response.CheckIn>(
                '/management/appointment/checkin',
                body
            );

        return data.data;
    }
}
