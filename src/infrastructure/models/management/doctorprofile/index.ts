import { paginationValidation } from '@/lib/validator';
import { z } from 'zod';

export const managementDoctorProfileListValidation = z.object({
    name: z
        .string({ required_error: 'required' })
        .max(64, { message: 'Nama tidak boleh lebih dari 64 karakter' }),
    sortBy: z.enum(['', 'rating', 'totalRating', 'consulePrice'], {
        errorMap: () => ({ message: 'Pilihan urutan tidak valid' })
    })
});

export const managementDoctorProfileListQuery =
    managementDoctorProfileListValidation.merge(paginationValidation);

export type ManagementDoctorProfileList = z.infer<
    typeof managementDoctorProfileListValidation
>;

export type ManagementDoctorProfileListQuery = z.infer<
    typeof managementDoctorProfileListQuery
>;

export const managementDoctorProfileCreateValidation = z.object({
    name: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Nama tidak boleh kosong' })
        .max(64, { message: 'Nama tidak boleh lebih dari 64 karakter' }),
    profile: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Deskripsi tidak boleh kosong' })
        .max(255, { message: 'Deskripsi tidak boleh lebih dari 255 karakter' }),
    consulePrice: z.coerce
        .number({ required_error: 'required' })
        .min(1, { message: 'Harga tidak boleh kosong' }),
    username: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Username tidak boleh kosong' })
        .regex(
            /^[a-zA-Z0-9_]+$/,
            'Username hanya boleh huruf, angka dan underscore symbol'
        )
        .max(64, { message: 'Username tidak boleh lebih dari 64 karakter' }),
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
    role: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Role tidak boleh kosong' }),
    specializationId: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Spesialisasi ID tidak boleh kosong' }),
    image: z
        .any()
        .refine((file: File) => file && file?.size !== 0, {
            message: 'Foto tidak boleh kosong'
        })
        .refine(
            (file: File) =>
                file &&
                ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type),
            {
                message: 'Invalid image file type'
            }
        )
});

export type ManagementDoctorProfileCreateValidation = z.infer<
    typeof managementDoctorProfileCreateValidation
>;

export const managementDoctorProfileEditValidation = z.object({
    id: z
        .number({ required_error: 'requried' })
        .min(1, { message: 'ID tidak boleh kosong' }),
    name: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Nama tidak boleh kosong' })
        .max(64, { message: 'Nama tidak boleh lebih dari 64 karakter' }),
    profile: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Deskripsi tidak boleh kosong' })
        .max(255, { message: 'Deskripsi tidak boleh lebih dari 255 karakter' }),
    consulePrice: z.coerce
        .number({ required_error: 'required' })
        .min(1, { message: 'Harga tidak boleh kosong' }),
    specializationId: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Spesialisasi ID tidak boleh kosong' }),
    image: z.any().refine(
        (file: File) => {
            return (
                !file ||
                (file &&
                    ['image/png', 'image/jpeg', 'image/jpg'].includes(
                        file.type
                    ))
            );
        },
        { message: 'Invalid image file type' }
    ),
    photoPath: z.string()
});

export type ManagementDoctorProfileEditValidation = z.infer<
    typeof managementDoctorProfileEditValidation
>;

export namespace ManagementDoctorProfile {
    export namespace Request {
        export interface List extends ManagementDoctorProfileListQuery {}

        export interface Create
            extends ManagementDoctorProfileCreateValidation {}

        export interface Update extends ManagementDoctorProfileEditValidation {}

        export interface Delete {
            id: number;
        }
    }

    export namespace Response {
        export interface Data {
            id: number;
            name: string;
            profile: string;
            consulePrice: number;
            totalRating: number;
            rating: number;
            specializationName: string;
            specializationDescription: string;
            specializationId: string;
            photoPath: string;
        }

        export interface List {
            message: string;
            totalRows: number;
            data: Data[];
        }

        export interface Create {
            message: string;
            data: Data;
        }

        export interface Update {
            id: number;
            name: string;
            profile: string;
            consulePrice: string;
        }

        export interface Delete {
            message: string;
            data: {
                dataAffected: number;
            };
        }
    }
}
