import { paginationValidation } from '@/lib/validator';
import { z } from 'zod';

export const managementPatientListValidation = z.object({
    name: z
        .string({ required_error: 'required' })
        .max(64, { message: 'Nama tidak boleh lebih dari 64 karakter' }),
    gender: z.enum(['', 'MALE', 'FEMALE'], {
        errorMap: () => ({ message: 'Gender tidak valid' })
    }),
    idType: z.enum(['', 'PASSPORT', 'DRIVER_LICENSE', 'NATIONAL_ID'], {
        errorMap: () => ({ message: 'Tipe Identitas tidak valid' })
    }),
    idNumber: z.string({ required_error: 'required' }).max(128, {
        message: 'Nomor Identitas tidak boleh lebih dari 128 karakter'
    })
});

export const managementPatientQueryValidation =
    managementPatientListValidation.merge(paginationValidation);

export type ManagementPatientListValidation = z.infer<
    typeof managementPatientListValidation
>;

export type ManagementPatientQueryValidation = z.infer<
    typeof managementPatientQueryValidation
>;

export const managementPatientCreateValidation = z.object({
    name: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Nama tidak boleh kosong' })
        .max(64, { message: 'Nama tidak boleh lebih dari 64 karakter' }),
    gender: z.enum(['MALE', 'FEMALE'], {
        errorMap: () => ({ message: 'Gender tidak valid' })
    }),
    address: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Alamat tidak boleh kosong' })
        .max(128, { message: 'Alamat tidak boleh lebih dari 128 karakter' }),
    dateOfBirth: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Tanggal Lahir tidak boleh kosong' })
        .max(128, {
            message: 'Tanggal Lahir tidak boleh lebih dari 128 karakter'
        }),
    idType: z.enum(['PASSPORT', 'DRIVER_LICENSE', 'NATIONAL_ID'], {
        errorMap: () => ({ message: 'Tipe Identitas tidak valid' })
    }),
    idNumber: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Nomor Identitas tidak boleh kosong' })
        .max(128, {
            message: 'Nomor Identitas tidak boleh lebih dari 128 karakter'
        })
});

export type ManagementPatientCreate = z.infer<
    typeof managementPatientCreateValidation
>;

export const managementPatientUpdateValidation = z
    .object({
        id: z.number({ required_error: 'required' })
    })
    .merge(managementPatientCreateValidation);

export type ManagementPatientUpdate = z.infer<
    typeof managementPatientUpdateValidation
>;

export namespace ManagementPatient {
    export namespace Request {
        export interface List extends ManagementPatientQueryValidation {}

        export interface Create extends ManagementPatientCreate {}

        export interface Update extends ManagementPatientUpdate {}
    }

    export namespace Response {
        export interface Data {
            id: number;
            name: string;
            address: string;
            dateOfBirth: string;
            gender: 'MALE' | 'FEMALE';
            idType: 'PASSPORT' | 'DRIVER_LICENSE' | 'NATIONAL_ID';
            idNumber: string;
        }

        export interface List {
            message: string;
            totalRows: number;
            data: Data[];
        }

        export interface Create {
            data: Data;
            message: string;
        }

        export interface Update {
            data: Data;
            message: string;
        }
    }
}
