import { paginationValidation } from '@/lib/validator';
import { z } from 'zod';

export const managementRegulerScheduleListValidation = z.object({
    startDate: z.string({ required_error: 'required' }),
    endDate: z.string({ required_error: 'required' }),
    date: z.string({ required_error: 'required' }),
    startTime: z.string({ required_error: 'required' }),
    endTime: z.string({ required_error: 'required' }),
    doctorId: z.string({ required_error: 'required' }),
    roomId: z.string({ required_error: 'required' }),
    status: z.string({ required_error: 'required' })
});

export const managementRegulerScheduleQueryValidation =
    managementRegulerScheduleListValidation.merge(paginationValidation);

export type ManagementRegulerScheduleListValidation = z.infer<
    typeof managementRegulerScheduleListValidation
>;

export type ManagementRegulerScheduleQueryValidation = z.infer<
    typeof managementRegulerScheduleQueryValidation
>;

export namespace ManagementRegulerScheduleDoctor {
    export namespace Request {
        export interface List
            extends ManagementRegulerScheduleQueryValidation {}
    }

    export namespace Response {
        export interface Data {
            id: number;
            date: string;
            capacity: number;
            status: string;
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
    }
}
