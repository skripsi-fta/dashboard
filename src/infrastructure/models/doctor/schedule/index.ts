import { z } from 'zod';

export const requestScheduleChangeDoctorValidation = z
    .object({
        scheduleId: z.coerce
            .number({ required_error: 'required' })
            .min(1, { message: 'Schedule ID tidak boleh kosong' }),
        notes: z
            .string({ required_error: 'required' })
            .min(1, { message: 'Notes tidak boleh kosong' }),
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
            .min(1, { message: 'Dokter harus dipilih' })
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

export type RequestScheduleChangeDoctorValidation = z.infer<
    typeof requestScheduleChangeDoctorValidation
>;
export namespace DoctorSchedule {
    export namespace Request {
        export interface Change extends RequestScheduleChangeDoctorValidation {}
    }

    export namespace Response {
        export interface Change {
            message: string;
        }
    }
}
