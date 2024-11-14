import { paginationValidation } from '@/lib/validator';
import { z } from 'zod';


export const managementCashierQueryValidation = z.object({}).merge(paginationValidation);

export type ManagementCashierQueryValidation = z.infer<typeof managementCashierQueryValidation>;

export namespace ManagementCashier {
    export namespace Response {

        export interface Data {
            id: number;
            bookingCode: string;
            consultationFee: number;
            pharmacyFee: number;
            cashierQueue: {
                id: number;
                queueNumber: number;
            };
            patient: {
                id: number;
                name: string;
            };
            schedule: {
                date: string;
                room: {
                    name: string;
                };
                doctor: {
                    name: string;
                    specialization: {
                        name: string;
                    };
                };
            };
        }

        export interface List {
            message: string;
            totalRows: number;
            data: Data[];
        }

        export interface DetailListQueue {
            mesaage: string;
            data: DetailListQueueData;
        }

        export interface DetailListQueueData {
            total: string;
            totalwaiting: string;
            totalfinished: string;
        }

        export interface Payment {
            statusCode: number;
            message: string;
        }

    }

    export namespace Request {
        export interface List extends ManagementCashierQueryValidation{}

        export interface Payment {
            bookingId: number;
        }
    }
}
