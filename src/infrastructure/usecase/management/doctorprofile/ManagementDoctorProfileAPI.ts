import type { GlobalModels } from '@/infrastructure/models/global';
import type { ManagementDoctorProfile } from '@/infrastructure/models/management/doctorprofile';
import type { ManagementStaff } from '@/infrastructure/models/management/staff';
import http from '@/lib/axios';

export class ManagementDoctorProfileAPI {
    async getDropdown(): Promise<GlobalModels.DropdownData> {
        const data =
            await http.get<ManagementDoctorProfile.Response.List>(
                '/management/doctor'
            );

        return {
            data:
                data?.data?.data?.map((d) => ({
                    label: d.name,
                    value: d.id.toString()
                })) || []
        };
    }

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

        const formData = new FormData();
        formData.append('name', body.name);
        formData.append('profile', body.profile);
        formData.append('consulePrice', body.consulePrice.toString());
        formData.append('specializationId', body.specializationId.toString());
        formData.append('image', body.image);

        const createProfileDoctor =
            await http.post<ManagementDoctorProfile.Response.Create>(
                '/management/doctor',
                formData
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
        const formData = new FormData();
        formData.append('id', body.id.toString());
        formData.append('name', body.name);
        formData.append('profile', body.profile);
        formData.append('consulePrice', body.consulePrice.toString());
        formData.append('specializationId', body.specializationId);
        formData.append('image', body.image);

        const data = await http.put<ManagementDoctorProfile.Response.Update>(
            '/management/doctor',
            formData
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
