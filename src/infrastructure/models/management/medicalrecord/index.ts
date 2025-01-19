import { paginationValidation } from '@/lib/validator';
import { z } from 'zod';

export const managementMedicalRecordListValidation = z.object({
    height: z.number({ required_error: 'required' }),
    weight: z.number({ required_error: 'required' }),
    systolic: z.number({ required_error: 'required' }),
    diastolic: z.number({ required_error: 'required' }),
    temperature: z.number({ required_error: 'required' }),
    illness: z.string({ required_error: 'required' })
});

export const managementMedicalRecordListQuery =
    managementMedicalRecordListValidation.merge(paginationValidation);

export type ManagementMedicalRecordList = z.infer<
    typeof managementMedicalRecordListValidation
>;

export type ManagementMedicalRecordListQuery = z.infer<
    typeof managementMedicalRecordListQuery
>;

export const managementMedicalRecordCreateValidation = z.object({
    height: z.coerce
        .number({ required_error: 'required' })
        .min(1, { message: 'Tinggi harus diisi' }),
    weight: z.coerce
        .number({ required_error: 'required' })
        .min(1, { message: 'Berat harus diisi' }),
    systolic: z.coerce
        .number({ required_error: 'required' })
        .min(1, { message: 'Sistolik harus diisi' }),
    diastolic: z.coerce
        .number({ required_error: 'required' })
        .min(1, { message: 'Disatolik harus diisi' }),
    temperature: z.coerce
        .number({ required_error: 'required' })
        .min(1, { message: 'Suhu badan harus diisi' }),
    illness: z.coerce
        .string({ required_error: 'required' })
        .min(1, { message: 'Keluhan harus diisi' }),
    patientId: z.number({ required_error: 'required' }),
    appointmentId: z.number({ required_error: 'required' })
});

export type ManagementMedicalRecordCreate = z.infer<
    typeof managementMedicalRecordCreateValidation
>;

export const managementMedicalRecordUpdateValidation = z.object({
    id: z.number({ required_error: 'required' }),
    height: z.coerce
        .number({ required_error: 'required' })
        .min(1, { message: 'Tinggi harus diisi' }),
    weight: z.coerce
        .number({ required_error: 'required' })
        .min(1, { message: 'Berat harus diisi' }),
    systolic: z.coerce
        .number({ required_error: 'required' })
        .min(1, { message: 'Sistolik harus diisi' }),
    diastolic: z.coerce
        .number({ required_error: 'required' })
        .min(1, { message: 'Disatolik harus diisi' }),
    temperature: z.coerce
        .number({ required_error: 'required' })
        .min(1, { message: 'Suhu badan harus diisi' }),
    illness: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Keluhan harus diisi' })
});

export type ManagementMedicalRecordUpdate = z.infer<
    typeof managementMedicalRecordUpdateValidation
>;
export namespace ManagementMedicalRecord {
    export namespace Request {
        export interface List extends ManagementMedicalRecordListQuery {}
        export interface Create extends ManagementMedicalRecordCreate {}
        export interface Update extends ManagementMedicalRecordUpdate {}
    }

    export namespace Response {
        export interface Data {
            id: number;
            height: number;
            weight: number;
            systolic: number;
            diastolic: number;
            temperature: number;
            illness: string;
            patientId: number;
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
            height: number;
            weight: number;
            systolic: number;
            diastolic: number;
            temperature: number;
            illness: string;
        }

        export interface Delete {
            message: string;
            data: {
                dataAffected: number;
            };
        }
    }
}
