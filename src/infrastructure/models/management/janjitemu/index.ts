import { paginationValidation } from '@/lib/validator';
import { z } from 'zod';

export const managementAppointmentListValidation = z.object({
    appointmentStatus: z.string({ required_error: 'required' }),
    bookingCode: z.string({ required_error: 'required' }),
});

export const managementAppointmentListQuery =
    managementAppointmentListValidation.merge(paginationValidation);

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
        .min(1, { message: 'Jadwal harus dipilih' }),
});

export type ManagementAppointmentCreate = z.infer<
    typeof managementAppointmentCreateValidation
>;

export const managementAppointmentCheckInValidation = z.object({
    bookingCode: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Booking ID harus dipilih' }),
});

export type ManagementAppointmentCheckIn = z.infer<
    typeof managementAppointmentCheckInValidation
>;

export const managementAppointmentUpdateValidation = z
    .object({
        id: z.number({ required_error: 'required' }),
        scheduleDate: z.string(),
        scheduleId: z
            .string({ required_error: 'required' })
            .min(1, { message: 'Jadwal harus dipilih' }),
        medicalRecordId: z.number()
    })

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
            appointmentStatus: string,
            bookingCode: string;
            bookingQr: string;
            checkInStatus: boolean;
            patientId: number;
            patientName: string;
            doctorName: string;
            roomName: string;
            medicalRecord: {
                id: number,
                height: number,
                weight: number,
                systolic: number,
                diastolic: number,
                temperature: number,
                illness: string,
            };
            scheduleDate: string;
            scheduleId: number;
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
