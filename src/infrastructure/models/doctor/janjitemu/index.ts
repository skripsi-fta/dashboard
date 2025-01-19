import { z } from 'zod';
import type { ManagementAppointment } from '../../management/janjitemu';

export const checkInAppointmentDoctorValidation = z.object({
    diagnosis: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Diagnosis tidak boleh kosong' }),
    resepDokter: z.string().array(),
    notes: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Notes tidak boleh kosong' }),
    appointmentId: z
        .number({ required_error: 'required' })
        .min(1, { message: 'ID Appointment tidak boleh kosong' })
});

export type CheckInAppointmentDoctorValidation = z.infer<
    typeof checkInAppointmentDoctorValidation
>;

export namespace DoctorAppointment {
    export namespace Request {
        export interface List {
            pageNumber: number;
            pageSize: number;
            scheduleId: number;
        }

        export interface CheckIn extends CheckInAppointmentDoctorValidation {}
    }

    export namespace Response {
        export interface ListData extends ManagementAppointment.Response.Data {
            id: number;
            appointmentStatus: string;
            bookingCode: string;
            checkInTime: string;
            doctorQueue: {
                id: number;
                queueNumber: number;
                startTime: string;
                finishTime: string | null;
            };
            medicalRecord: {
                id: number;
                height: number;
                weight: number;
                systolic: number;
                diastolic: number;
                temperature: number;
                illness: string;
            };
            globalQueue: number;
            isCheckIn: boolean;
            notes: string;
            patient: {
                dateOfBirth: string;
                gender: string;
                name: string;
            };
        }

        export interface List {
            message: string;
            statusCode: number;
            data: ListData[];
            totalRows: number;
        }

        export interface DetailData {
            scheduleId: number;
            total: number;
            totalFinished: number;
            totalWaiting: number;
            scheduleDetail: {
                capacity: number;
                createdAt: string;
                date: string;
                endTime: string;
                id: number;
                startTime: string;
                status: string;
                type: string;
                updatedAt: string;
            };
            currentQueueNumber: number;
            canFinish: boolean;
        }

        export interface Detail {
            data: DetailData | null;
            message: string;
            statusCode: number;
        }

        export interface CheckIn {
            message: string;
            statusCode: number;
        }
    }
}
