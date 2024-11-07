import type { DoctorAppointment } from '@/infrastructure/models/doctor/janjitemu';
import http from '@/lib/axios';

export class DoctorAppointmentAPI {
    private readonly url: string = '/doctor/appointment';

    async getDetail(): Promise<DoctorAppointment.Response.DetailData | null> {
        const data = await http.get<DoctorAppointment.Response.Detail>(
            this.url
        );

        return data.data.data;
    }

    async getList(params: DoctorAppointment.Request.List) {
        const data = await http.get<DoctorAppointment.Response.List>(
            `${this.url}/list`,
            { params }
        );

        return data.data;
    }

    async checkIn(
        body: DoctorAppointment.Request.CheckIn
    ): Promise<DoctorAppointment.Response.CheckIn> {
        const data = await http.post<DoctorAppointment.Response.CheckIn>(
            `${this.url}/check`,
            body
        );

        return data.data;
    }
}
