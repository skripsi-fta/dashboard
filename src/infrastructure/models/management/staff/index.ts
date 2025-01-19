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

export const managementStaffCreateValidation = z.object({
    username: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Username tidak boleh kosong' })
        .regex(
            /^[a-zA-Z0-9_]+$/,
            'Username hanya boleh huruf, angka dan underscore symbol'
        )
        .max(64, { message: 'Username tidak boleh lebih dari 64 karakter' }),
    name: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Nama tidak boleh kosong' })
        .max(64, { message: 'Nama tidak boleh lebih dari 64 karakter' }),
    password: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Password tidak boleh kosong' })
        .max(64, { message: 'Password tidak boleh lebih dari 64 karakter' }),
    email: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Email tidak boleh kosong' })
        .max(64, { message: 'Email tidak boleh lebih dari 64 karakter' })
        .regex(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Email tidak valid'
        ),
    role: z.enum(['PHARMACIST', 'CASHIER', 'MANAGEMENT', 'MONITORING'], {
        errorMap: () => ({ message: 'Role tidak valid' })
    })
});

export type ManagementStaffCreate = z.infer<
    typeof managementStaffCreateValidation
>;

export const managementStaffUpdateValidation = managementStaffCreateValidation
    .merge(
        z.object({
            id: z.number({ required_error: 'required' })
        })
    )
    .omit({ password: true });

export type ManagementStaffUpdate = z.infer<
    typeof managementStaffUpdateValidation
>;

export namespace ManagementStaff {
    export namespace Request {
        export interface List extends ManagementStaffListQuery {}

        export interface Create extends ManagementStaffCreate {}

        export interface Update extends ManagementStaffUpdate {}

        export interface Delete {
            id: number;
        }
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
            message: string;
            totalRows: number;
            data: Data[];
        }

        export interface Create {
            data: { id: number };
            message: string;
        }

        export interface Update {
            data: number;
            message: string;
        }

        export interface Delete {
            data: number;
            message: string;
        }
    }
}
