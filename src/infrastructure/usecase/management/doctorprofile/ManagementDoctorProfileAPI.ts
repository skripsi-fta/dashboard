import type { ManagementDoctorProfile } from '@/infrastructure/models/management/doctorprofile';
import type { ManagementStaff } from '@/infrastructure/models/management/staff';
import http from '@/lib/axios';

export class ManagementDoctorProfileAPI {
    async getList(
        params: ManagementDoctorProfile.Request.List
    ): Promise<ManagementDoctorProfile.Response.List> {
        const data = await http.get<ManagementDoctorProfile.Response.List>(
            '/management/doctor',
            {
                params: {
                    ...params,
                    sortBy: undefined,
                    ...(params.sortBy
                        ? {
                              [params.sortBy]: true
                          }
                        : {})
                }
            }
        );

        return data.data;
    }

    async createDoctor(
        body: ManagementDoctorProfile.Request.Create
    ): Promise<ManagementStaff.Response.Create> {
        const data = await http.post<ManagementStaff.Response.Create>(
            '/management/staff',
            {
                username: body.username,
                name: body.name,
                email: body.email,
                password: body.password,
                role: 'MANAGEMENT'
            }
        );

        const staffId = data.data.data.id;

        const createProfileDoctor =
            await http.post<ManagementDoctorProfile.Response.Create>(
                '/management/doctor',
                {
                    name: body.name,
                    profile: body.profile,
                    consulePrice: body.consulePrice.toString(),
                    specializationId: body.specializationId.toString()
                }
            );

        const doctorId = createProfileDoctor.data.data.id;

        await http.put<ManagementStaff.Response.Update>('/management/staff', {
            id: staffId,
            role: 'DOCTOR',
            doctorId
        });

        return data.data;
    }

    async updateDoctor(
        body: ManagementDoctorProfile.Request.Update
    ): Promise<ManagementDoctorProfile.Response.Update> {
        const data = await http.put<ManagementDoctorProfile.Response.Update>(
            '/management/doctor',
            {
                ...body,
                consulePrice: body.consulePrice.toString(),
                specializationId: Number(body.specializationId)
            }
        );

        return data.data;
    }

    async deleteDoctor(
        params: ManagementDoctorProfile.Request.Delete
    ): Promise<ManagementDoctorProfile.Response.Delete> {
        const data = await http.delete<ManagementDoctorProfile.Response.Delete>(
            '/management/doctor',
            { params }
        );

        return data.data;
    }
}
