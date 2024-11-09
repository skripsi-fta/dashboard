import { paginationValidation } from '@/lib/validator';
import { z } from 'zod';


export const managementCashierQueryValidation = z.object({}).merge(paginationValidation);

export type ManagementCashierQueryValidation = z.infer<typeof managementCashierQueryValidation>;

export namespace ManagementCashier {
    export namespace Response {

        export interface Data {
            id: number;
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

    }

    export namespace Request {
        export interface List extends ManagementCashierQueryValidation{}
    }
}
