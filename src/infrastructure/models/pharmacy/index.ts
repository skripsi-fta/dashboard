import { z } from 'zod';
import type { ManagementAppointment } from '../management/janjitemu';

export const pharmacyQueueUpdateValidation = z.object({
    pharmacyFee: z.coerce.number({ required_error: 'required' }),
    appointmentId: z.number({ required_error: 'required' })
});

export type PharmacyQueueUpdate = z.infer<typeof pharmacyQueueUpdateValidation>;

export namespace PharmacyQueue {
    export namespace Request {
        export interface List {
            pageNumber: number;
            pageSize: number;
        }
        export interface Update extends PharmacyQueueUpdate {}
        export interface Current {}
    }

    export namespace Response {
        export interface Data extends ManagementAppointment.Response.Data {
            id: number;
            globalQueue: number;
            patient: {
                name: string;
            };
            medicalRecord: {
                id: number;
                height: number;
                weight: number;
                systolic: number;
                diastolic: number;
                temperature: number;
                illness: string;
                prescription: string[];
            };
            pharmacyQueue: {
                id: number;
                queueNumber: number;
                startTime: string;
                finishTime: string | null;
            };
            schedule: {
                room: {
                    name: string;
                };
                doctor: {
                    name: string;
                };
            };
        }

        export interface Current {
            data: {
                total: number;
                totalFinished: number;
                totalWaiting: number;
            };
        }

        export interface List {
            message: string;
            totalRows: number;
            data: Data[];
        }

        export interface Update {
            data: Data;
            message: string;
        }
    }
}
