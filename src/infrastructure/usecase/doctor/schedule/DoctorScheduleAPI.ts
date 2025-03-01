import type { DoctorSchedule } from '@/infrastructure/models/doctor/schedule';
import http from '@/lib/axios';

export class DoctorScheduleAPI {
    private readonly url: string = '/doctor/schedule';

    async requestChange(
        body: DoctorSchedule.Request.Change
    ): Promise<DoctorSchedule.Response.Change> {
        const data = await http.post<DoctorSchedule.Response.Change>(
            `${this.url}/request`,
            body
        );

        return data.data;
    }

    async finishSchedule(
        body: DoctorSchedule.Request.Finish
    ): Promise<DoctorSchedule.Response.Finish> {
        const data = await http.put<DoctorSchedule.Response.Finish>(
            `${this.url}/finish`,
            body
        );

        return data.data;
    }
}
