import type { ManagementMedicalRecord } from '@/infrastructure/models/management/medicalrecord';
import http from '@/lib/axios';

export class ManagementMedicalRecordAPI {
    private readonly url: string = '/management/medicalrecord';

    async getList(
        params: ManagementMedicalRecord.Request.List
    ): Promise<ManagementMedicalRecord.Response.List> {
        const data = await http.get<ManagementMedicalRecord.Response.List>(this.url, {
            params
        });

        return data.data;
    }

    async create(
        body: ManagementMedicalRecord.Request.Create
    ): Promise<ManagementMedicalRecord.Response.Create> {
        const data = await http.post<ManagementMedicalRecord.Response.Create>(
            this.url,
            {
                height: body.height.toString(),
                weight: body.weight.toString(),
                systolic: body.systolic.toString(),
                diastolic: body.diastolic.toString(),
                temperature: body.temperature.toString(),
                illness: body.illness,
                patientId: body.patientId,
                appointmentId: body.appointmentId,
            }
        );

        return data.data;
    }

    async update(
        body: ManagementMedicalRecord.Request.Update
    ): Promise<ManagementMedicalRecord.Response.Update> {
        const data = await http.put<ManagementMedicalRecord.Response.Update>(
            this.url,
            {
                id: body.id,
                height: body.height.toString(),
                weight: body.weight.toString(),
                systolic: body.systolic.toString(),
                diastolic: body.diastolic.toString(),
                temperature: body.temperature.toString(),
                illness: body.illness,
            }
        );

        return data.data;
    }
}
