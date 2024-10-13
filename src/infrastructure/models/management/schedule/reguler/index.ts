import { paginationValidation } from '@/lib/validator';
import { z } from 'zod';

export const managementRegulerScheduleListValidation = z
    .object({
        startDate: z.string({ required_error: 'required' }),
        endDate: z.string({ required_error: 'required' }),
        date: z.string({ required_error: 'required' }),
        startTime: z.string({ required_error: 'required' }),
        endTime: z.string({ required_error: 'required' }),
        doctorId: z.string({ required_error: 'required' }),
        roomId: z.string({ required_error: 'required' }),
        status: z.string({ required_error: 'required' })
    })
    .refine(
        ({ startTime, endTime }) => {
            if (!startTime || !endTime) {
                return true;
            }

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

export const managementRegulerScheduleQueryValidation = z
    .object({
        startDate: z.string({ required_error: 'required' }),
        endDate: z.string({ required_error: 'required' }),
        date: z.string({ required_error: 'required' }),
        startTime: z.string({ required_error: 'required' }),
        endTime: z.string({ required_error: 'required' }),
        doctorId: z.string({ required_error: 'required' }),
        roomId: z.string({ required_error: 'required' }),
        status: z.string({ required_error: 'required' })
    })
    .merge(paginationValidation)
    .refine(
        ({ startTime, endTime }) => {
            if (!startTime || !endTime) {
                return true;
            }

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

export type ManagementRegulerScheduleListValidation = z.infer<
    typeof managementRegulerScheduleListValidation
>;

export type ManagementRegulerScheduleQueryValidation = z.infer<
    typeof managementRegulerScheduleQueryValidation
>;

export const managementRegulerScheduleCreateValidation = z
    .object({
        date: z
            .string({ required_error: 'required' })
            .min(1, { message: 'Tanggal tidak boleh kosong' }),
        capacity: z.coerce
            .number({ required_error: 'required' })
            .min(1, { message: 'Kapasitas tidak boleh kosong' }),
        startTime: z
            .string({ required_error: 'required' })
            .min(1, { message: 'Jam mulai harus diisi' }),
        endTime: z
            .string({ required_error: 'required' })
            .min(1, { message: 'Jam selesai harus diisi' }),
        doctorId: z
            .string({ required_error: 'required' })
            .min(1, { message: 'Dokter harus dipilih' }),
        roomId: z
            .string({ required_error: 'required' })
            .min(1, { message: 'Ruangan harus dipilih' })
    })
    .refine(
        ({ startTime, endTime }) => {
            if (!startTime || !endTime) {
                return true;
            }

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

export type ManagementRegulerScheduleCreateValidation = z.infer<
    typeof managementRegulerScheduleCreateValidation
>;

export namespace ManagementRegulerScheduleDoctor {
    export namespace Request {
        export interface List
            extends ManagementRegulerScheduleQueryValidation {}

        export interface Create
            extends ManagementRegulerScheduleCreateValidation {}
    }

    export namespace Response {
        export interface Data {
            id: number;
            date: string;
            capacity: number;
            status:
                | 'ready'
                | 'in review'
                | 'cancelled'
                | 'changed'
                | 'completed';
            startTime: string;
            endTime: string;
            type: string;
            doctor: {
                id: number;
                name: string;
                profile: string;
                specialization: {
                    name: string;
                };
            };
            room: {
                name: string;
                detail: string;
            };
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
    }
}
