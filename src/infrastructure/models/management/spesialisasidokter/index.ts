import { paginationValidation } from '@/lib/validator';
import { z } from 'zod';

export const managementSpesialisasiDokterListValidation = z.object({
    name: z
        .string({ required_error: 'required' })
        .max(64, { message: 'Nama tidak boleh lebih dari 64 karakter' }),
    description: z
        .string({ required_error: 'required' })
        .max(64, { message: 'Deskripsi tidak boleh lebih dari 64 karakter' })
});

export const managementSpesialisasiDokterListQuery =
    managementSpesialisasiDokterListValidation.merge(paginationValidation);

export type ManagementSpesialisasiDokterList = z.infer<
    typeof managementSpesialisasiDokterListValidation
>;

export type ManagementSpesialisasiDokterListQuery = z.infer<
    typeof managementSpesialisasiDokterListQuery
>;

export const managementSpesialisasiDokterCreateValidation = z.object({
    name: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Nama tidak boleh kosong' })
        .max(64, { message: 'Nama tidak boleh lebih dari 64 karakter' }),
    description: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Deskripsi tidak boleh kosong' })
        .max(64, { message: 'Deskripsi tidak boleh lebih dari 64 karakter' }),
    image: z
        .any()
        .refine((file: File) => file && file?.size !== 0, {
            message: 'Foto tidak boleh kosong'
        })
        .refine(
            (file: File) =>
                file &&
                ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type),
            { message: 'Invalid image file type' }
        )
});

export type ManagementSpesialisasiDokterCreate = z.infer<
    typeof managementSpesialisasiDokterCreateValidation
>;

export const managementSpesialisasiDokterUpdateValidation = z.object({
    id: z
        .number({ required_error: 'required' })
        .min(1, { message: 'ID tidak boleh kosong' }),
    name: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Nama tidak boleh kosong' })
        .max(64, { message: 'Nama tidak boleh lebih dari 64 karakter' }),
    description: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Deskripsi tidak boleh kosong' })
        .max(64, { message: 'Deskripsi tidak boleh lebih dari 64 karakter' }),
    image: z
        .any()
        .refine(
            (file: File) =>
                !file ||
                (file &&
                    ['image/png', 'image/jpeg', 'image/jpg'].includes(
                        file.type
                    )),
            { message: 'Invalid image file type' }
        ),
    photoPath: z.string()
});

export type ManagementSpesialisasiDokterUpdate = z.infer<
    typeof managementSpesialisasiDokterUpdateValidation
>;

export namespace ManagementSpesialisasiDokter {
    export namespace Request {
        export interface List extends ManagementSpesialisasiDokterListQuery {}

        export interface Create extends ManagementSpesialisasiDokterCreate {}

        export interface Switch {
            id: number;
        }

        export interface Update extends ManagementSpesialisasiDokterUpdate {}
    }

    export namespace Response {
        export interface Data {
            id: number;
            name: string;
            description: string;
            doctorCount: number;
            isActive: boolean;
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

        export interface Switch {
            message: string;
            data: Data;
        }

        export interface Update {
            message: string;
            data: Data;
        }
    }
}
