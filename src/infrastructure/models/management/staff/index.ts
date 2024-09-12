import { paginationValidation } from '@/lib/validator';
import { z } from 'zod';

export const managementStaffListValidation = z.object({
    name: z
        .string({ required_error: 'required' })
        .max(64, { message: 'Nama tidak boleh lebih dari 64 karakter' }),
    email: z
        .string({ required_error: 'required' })
        .max(64, { message: 'Email tidak boleh lebih dari 64 karakter' }),
    role: z
        .string({ required_error: 'required' })
        .max(64, { message: 'Role tidak boleh lebih dari 64 karakter' })
});

export const managementStaffListQuery =
    managementStaffListValidation.merge(paginationValidation);

export type ManagementStaffListValidation = z.infer<
    typeof managementStaffListValidation
>;

export type ManagementStaffListQuery = z.infer<typeof managementStaffListQuery>;

export namespace ManagementStaff {
    export namespace Request {
        export interface List extends ManagementStaffListQuery {}
    }

    export namespace Response {
        export interface Data {
            id: number;
            username: string;
            name: string;
            email: string;
            role: string;
            doctorName?: string;
        }

        export interface List {
            statusCode: number;
            message: string;
            totalData: number;
            data: Data[];
        }
    }
}
