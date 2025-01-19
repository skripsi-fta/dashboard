import { z } from 'zod';
import type { ManagementDoctorProfile } from '../../doctorprofile';
import type { ManagementRuangan } from '../../ruangan';
import { paginationValidation } from '@/lib/validator';
import type { ManagementRegulerScheduleDoctor } from '../reguler';

export const managementFixedScheduleListValidation = z.object({
    day: z.string({ required_error: 'required' }),
    doctorId: z.string({ required_error: 'required' }),
    roomId: z.string({ required_error: 'required' }),
    startTime: z.string({ required_error: 'required' }),
    endTime: z.string({ required_error: 'required' })
});

export const managementFixedScheduleListQuery =
    managementFixedScheduleListValidation.merge(paginationValidation);

export type ManagementFixedScheduleListValidation = z.infer<
    typeof managementFixedScheduleListValidation
>;

export type ManagementFixedScheduleListQuery = z.infer<
    typeof managementFixedScheduleListQuery
>;

export const managementFixedScheduleCreateValidation = z
    .object({
        day: z
            .string({ required_error: 'required' })
            .min(1, { message: 'Hari tidak boleh kosong' }),
        doctorId: z
            .string({ required_error: 'required' })
            .min(1, { message: 'Dokter harus dipilih' }),
        roomId: z
            .string({ required_error: 'required' })
            .min(1, { message: 'Ruangan harus dipilih' }),
        startTime: z
            .string({ required_error: 'required' })
            .min(1, { message: 'Jam mulai harus diisi' }),
        endTime: z
            .string({ required_error: 'required' })
            .min(1, { message: 'Jam selesai harus diisi' }),
        capacity: z.coerce
            .number({ required_error: 'required' })
            .min(1, { message: 'Kapasitas tidak boleh kosong' })
    })
    .refine(
        ({ startTime, endTime }) => {
            const [startHours, startMinutes] = startTime.split(':').map(Number);
            const [endHours, endMinutes] = endTime.split(':').map(Number);

            const startTotalMinutes = startHours * 60 + startMinutes;
            const endTotalMinutes = endHours * 60 + endMinutes;

            return startTotalMinutes < endTotalMinutes;
        },
        {
            message: 'Start Time tidak boleh lebih dari End Time',
            path: ['endTime']
        }
    );

export type ManagementFixedScheduleCreate = z.infer<
    typeof managementFixedScheduleCreateValidation
>;

export const managementFixedScheduleUpdateValidation = z
    .object({
        day: z
            .string({ required_error: 'required' })
            .min(1, { message: 'Hari tidak boleh kosong' }),
        id: z
            .string({ required_error: 'required' })
            .min(1, { message: 'ID tidak boleh kosong' }),
        doctorId: z
            .string({ required_error: 'required' })
            .min(1, { message: 'Dokter harus dipilih' }),
        roomId: z
            .string({ required_error: 'required' })
            .min(1, { message: 'Ruangan harus dipilih' }),
        startTime: z
            .string({ required_error: 'required' })
            .min(1, { message: 'Jam mulai harus diisi' }),
        endTime: z
            .string({ required_error: 'required' })
            .min(1, { message: 'Jam selesai harus diisi' }),
        capacity: z.coerce
            .number({ required_error: 'required' })
            .min(1, { message: 'Kapasitas tidak boleh kosong' }),
        isOverrideSchedule: z.boolean({ required_error: 'required' })
    })
    .refine(
        ({ startTime, endTime }) => {
            const [startHours, startMinutes] = startTime.split(':').map(Number);
            const [endHours, endMinutes] = endTime.split(':').map(Number);

            const startTotalMinutes = startHours * 60 + startMinutes;
            const endTotalMinutes = endHours * 60 + endMinutes;

            return startTotalMinutes < endTotalMinutes;
        },
        {
            message: 'Start Time tidak boleh lebih dari End Time',
            path: ['endTime']
        }
    );

export type ManagementFixedScheduleUpdate = z.infer<
    typeof managementFixedScheduleUpdateValidation
>;

export namespace ManagementFixedScheduleDoctor {
    export namespace Request {
        export interface List extends ManagementFixedScheduleListQuery {}

        export interface Create extends ManagementFixedScheduleCreate {}

        export interface Update extends ManagementFixedScheduleUpdate {}
    }

    export namespace Response {
        export interface Data {
            day: string;
            endTime: string;
            id: string;
            startTime: string;
            doctor: ManagementDoctorProfile.Response.Data;
            room: ManagementRuangan.Response.Data;
            syncDate: string;
            capacity: number;
        }

        export interface List {
            message: string;
            totalRows: number;
            data: Data[];
        }

        export interface Create {
            message: string;
            data: {
                schedules: ManagementRegulerScheduleDoctor.Response.Data[];
                fixedSchedule: Data;
                skippedSchedule: string[];
            };
        }

        export interface Update {
            message: string;
            data: {
                fixedSchedule: Data;
                skippedSchedule?: string[];
                changedSchedule?: string[];
            };
        }
    }
}
