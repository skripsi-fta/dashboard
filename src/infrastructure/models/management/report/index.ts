import { paginationValidation } from '@/lib/validator';
import dayjs from 'dayjs';
import { z } from 'zod';

export const reportPharmacyCashierValidation = z
    .object({
        startDate: z.string({ required_error: 'required' }),
        endDate: z.string({ required_error: 'required' }),
        year: z.string({ required_error: 'required' }),
        month: z.string({ required_error: 'required' }),
        type: z.string({ required_error: 'required' })
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
    );

export type ReportPharmacyCashierValidation = z.infer<
    typeof reportPharmacyCashierValidation
>;

export const reportPharmacyCashierList = z
    .object({
        startDate: z.string({ required_error: 'required' }),
        endDate: z.string({ required_error: 'required' }),
        year: z.string({ required_error: 'required' }),
        month: z.string({ required_error: 'required' }),
        type: z.string({ required_error: 'required' })
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
    );

export type ReportPharmacyCashierList = z.infer<
    typeof reportPharmacyCashierList
>;

export namespace ManagementReport {
    export namespace Request {
        export interface PharmacyCashierSummary
            extends ReportPharmacyCashierValidation {}

        export interface PharmacyCashierData
            extends ReportPharmacyCashierList {}
    }

    export namespace Response {
        export interface PharmacyCashierSummary {
            message: string;
            summaryData: {
                avgWaitTime: string;
                avgTotalSecond: number;
                avgTotalMinute: number;
                maxWaitTime: string;
                maxTotalSecond: number;
                maxTotalMinute: number;
                minWaitTime: string;
                minTotalSecond: number;
                minTotalMinute: number;
            } | null;
            belowAverage: number;
            aboveAverage: number;
            dataBar: {
                minute: string;
                count: number;
            }[];
        }

        export interface Data {
            appointmentId: number;
            date: string;
            patientId: string;
            patientName: string;
            doctorName: string;
            specializationName: string;
            roomName: string;
            scheduleTime: string;
            startTime: string;
            endTime: string;
        }

        export interface PharmacyCashierData {
            message: string;
            totalRows: number;
            data: Data[];
        }

        export interface DoctorSummary {
            message: string;
            summaryData: {
                avgWaitTime: string;
                avgTotalSecond: number;
                avgTotalMinute: number;
                maxWaitTime: string;
                maxTotalSecond: number;
                maxTotalMinute: number;
                minWaitTime: string;
                minTotalSecond: number;
                minTotalMinute: number;
                totalDoctor: number;
                totalSpecialization: number;
                totalAppointment: number;
            } | null;
            belowAverage: number;
            aboveAverage: number;
            dataBar: {
                minute: string;
                count: number;
            }[];
            doctorData: {
                totalPasien: number;
                name: string;
            }[];
            specializationData: {
                totalPasien: number;
                name: string;
            }[];
        }
    }
}
