import { paginationValidation } from '@/lib/validator';
import dayjs from 'dayjs';
import { z } from 'zod';

export const managementAppointmentListValidation = z
    .object({
        appointmentStatus: z.string({ required_error: 'required' }),
        bookingCode: z.string({ required_error: 'required' }),
        startDate: z.string({ required_error: 'required' }),
        endDate: z.string({ required_error: 'required' }),
        startTime: z.string({ required_error: 'required' }),
        endTime: z.string({ required_error: 'required' })
    })
    .refine(
        ({ startDate, endDate }) => {
            if (!startDate || !endDate) {
                return true;
            }

            return (
                dayjs(startDate, 'YYYY-MM-DD') <= dayjs(endDate, 'YYYY-MM-DD')
            );
        },
        {
            message: 'Tanggal awal tidak boleh lebih dari Tanggal akhir',
            path: ['endDate']
        }
    )
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

export const managementAppointmentListQuery = z
    .object({
        appointmentStatus: z.string({ required_error: 'required' }),
        bookingCode: z.string({ required_error: 'required' }),
        startDate: z.string({ required_error: 'required' }),
        endDate: z.string({ required_error: 'required' }),
        startTime: z.string({ required_error: 'required' }),
        endTime: z.string({ required_error: 'required' })
    })
    .merge(paginationValidation)
    .refine(
        ({ startDate, endDate }) => {
            if (!startDate || !endDate) {
                return true;
            }

            return (
                dayjs(startDate, 'YYYY-MM-DD') <= dayjs(endDate, 'YYYY-MM-DD')
            );
        },
        {
            message: 'Tanggal awal tidak boleh lebih dari Tanggal akhir',
            path: ['endDate']
        }
    )
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

export type ManagementAppointmentList = z.infer<
    typeof managementAppointmentListValidation
>;

export type ManagementAppointmentListQuery = z.infer<
    typeof managementAppointmentListQuery
>;

export const managementAppointmentCreateValidation = z.object({
    patientId: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Pasien harus dipilih' }),
    scheduleId: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Jadwal harus dipilih' })
});

export type ManagementAppointmentCreate = z.infer<
    typeof managementAppointmentCreateValidation
>;

export const managementAppointmentCheckInValidation = z.object({
    bookingCode: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Booking ID harus dipilih' })
});

export type ManagementAppointmentCheckIn = z.infer<
    typeof managementAppointmentCheckInValidation
>;

export const managementAppointmentUpdateValidation = z.object({
    id: z.number({ required_error: 'required' }),
    scheduleDate: z.string(),
    scheduleId: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Jadwal harus dipilih' }),
    medicalRecordId: z.number()
});

export type ManagementAppointmentUpdate = z.infer<
    typeof managementAppointmentUpdateValidation
>;
export namespace ManagementAppointment {
    export namespace Request {
        export interface List extends ManagementAppointmentListQuery {}
        export interface Create extends ManagementAppointmentCreate {}
        export interface Update extends ManagementAppointmentUpdate {}
        export interface CheckIn extends ManagementAppointmentCheckIn {}
    }

    export namespace Response {
        export interface Data {
            id: number;
            appointmentStatus: string;
            bookingCode: string;
            bookingQr: string;
            checkInStatus: boolean;
            patientId: number;
            patientName: string;
            doctorName: string;
            roomName: string;
            medicalRecord: {
                id: number;
                height: number;
                weight: number;
                systolic: number;
                diastolic: number;
                temperature: number;
                illness: string;
            };
            scheduleDate: string;
            scheduleId: number;
            date: string;
            globalQueue: number;
            checkInTime: string;
            finishTime: string;
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
            scheduleId: number;
            medicalRecordId: number;
        }

        export interface CheckIn {
            message: string;
            data: Data;
        }
    }
}
