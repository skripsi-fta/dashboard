import http from '@/lib/axios';

export class DoctorAppointmentAPI {
    private readonly url: string = '/doctor/appointment';

    async getList() {
        const data = await http.get(this.url, {});
    }
}
