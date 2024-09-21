import { paginationValidation } from '@/lib/validator';
import { z } from 'zod';

export const managementRuanganListValidation = z.object({
    name: z
        .string({ required_error: 'required' })
        .max(64, { message: 'Nama tidak boleh lebih dari 64 karakter' }),
    detail: z
        .string({ required_error: 'required' })
        .max(255, { message: 'Detail tidak boleh lebih dari 255 karakter' })
});

export const managementRuanganListQuery =
    managementRuanganListValidation.merge(paginationValidation);

export type ManagementRuanganList = z.infer<
    typeof managementRuanganListValidation
>;

export type ManagementRuanganListQuery = z.infer<
    typeof managementRuanganListQuery
>;

export const managementRuanganCreateValidation = z.object({
    name: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Nama tidak boleh kosong' })
        .max(64, { message: 'Nama tidak boleh lebih dari 64 karakter' }),
    detail: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Detail tidak boleh kosong' })
        .max(255, { message: 'Detail tidak boleh lebih dari 255 karakter' })
});

export type ManagementRuanganCreate = z.infer<
    typeof managementRuanganCreateValidation
>;

export const managementRuanganUpdateValidation = z
    .object({
        id: z
            .number({ required_error: 'required' })
            .min(1, { message: 'ID tidak boleh kosong' })
    })
    .merge(managementRuanganCreateValidation);

export type ManagementRuanganUpdate = z.infer<
    typeof managementRuanganUpdateValidation
>;
export namespace ManagementRuangan {
    export namespace Request {
        export interface List extends ManagementRuanganListQuery {}
        export interface Create extends ManagementRuanganCreate {}
        export interface Update extends ManagementRuanganUpdate {}
        export interface Delete {
            id: number;
        }
    }

    export namespace Response {
        export interface Data {
            id: number;
            name: string;
            detail: string;
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
            message: string;
            data: Data;
        }

        export interface Delete {
            message: string;
            data: {
                dataAffected: number;
            };
        }
    }
}
