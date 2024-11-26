import {
    requestScheduleChangeDoctorValidation,
    type DoctorSchedule,
    type RequestScheduleChangeDoctorValidation
} from '@/infrastructure/models/doctor/schedule';
import type { ManagementRegulerScheduleDoctor } from '@/infrastructure/models/management/schedule/reguler';
import { DoctorScheduleAPI } from '@/infrastructure/usecase/doctor/schedule/DoctorScheduleAPI';
import dayjsUtils from '@/lib/dayjs';
import { cn } from '@/lib/utils';
import DatePickerSingleInput from '@/presentation/components/DatePickerSingleInput';
import TextFieldInput from '@/presentation/components/TextfieldInput';
import {
    ModalFormContainer,
    ModalFormContent,
    ModalFormFields,
    ModalFormFooter
} from '@/presentation/layout/modal-form';
import { Textarea } from '@/presentation/ui/textarea';
import { useModal } from '@/providers/ModalProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import type { AxiosError } from 'axios';
import { MapPin } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

interface RequestChangeModalProps {
    refetch: () => void;
    data: ManagementRegulerScheduleDoctor.Response.Data;
}

const RequestChangeModal = ({ refetch, data }: RequestChangeModalProps) => {
    const { control, handleSubmit } =
        useForm<RequestScheduleChangeDoctorValidation>({
            defaultValues: {
                capacity: 0,
                date: '',
                doctorId: data.doctor.id.toString(),
                endTime: '',
                startTime: '',
                scheduleId: data.id,
                notes: ''
            },
            mode: 'onChange',
            resolver: zodResolver(requestScheduleChangeDoctorValidation)
        });

    const api = new DoctorScheduleAPI();

    const { closeModal } = useModal();

    const { mutate: request, isLoading } = useMutation({
        mutationFn: (data: DoctorSchedule.Request.Change) =>
            api.requestChange(data),
        onSuccess: () => {
            toast.success('Sukses pengajuan perubahan jadwal');
            closeModal();
            refetch();
        },
        onError: (res: AxiosError<{ message: string }>) => {
            toast.error(
                res.response?.data.message ?? 'Pengajuan perubahan jadwal error'
            );
        }
    });

    return (
        <>
            <ModalFormContainer
                formProps={{ onSubmit: handleSubmit((e) => request(e)) }}
            >
                <ModalFormContent>
                    <ModalFormFields>
                        <div className='mb-2 flex flex-col gap-2'>
                            <div className='flex flex-row justify-between'>
                                <p className='font-bold'>
                                    {dayjsUtils(data.date).format(
                                        'dddd, DD MMMM YYYY'
                                    )}
                                </p>
                                <div className='flex flex-row items-center gap-2'>
                                    <MapPin
                                        className='text-primaryblue'
                                        size={18}
                                    />
                                    <p className='font-semibold text-primaryblue'>
                                        {data.room.name}
                                    </p>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <div className='flex flex-row font-medium'>
                                    <p className='w-[150px]'>Jadwal</p>
                                    <p>
                                        : {data.startTime} - {data.endTime}
                                    </p>
                                </div>
                                <div className='flex flex-row font-medium'>
                                    <p className='w-[150px]'>Status</p>
                                    <p className='capitalize'>
                                        : {data.status}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <DatePickerSingleInput
                            control={control}
                            name='date'
                            label='Tanggal Jadwal'
                            disablePast
                        />

                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>
                                Waktu
                            </p>
                            <div className='flex w-full flex-row justify-center gap-4'>
                                <Controller
                                    control={control}
                                    name='startTime'
                                    render={({
                                        field: { ref, ...field },
                                        fieldState: { error }
                                    }) => (
                                        <TextFieldInput
                                            {...field}
                                            placeholder='Waktu Mulai'
                                            error={error}
                                            variant='modal'
                                            type='time'
                                            fullWidth
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name='endTime'
                                    render={({
                                        field: { ref, ...field },
                                        fieldState: { error }
                                    }) => (
                                        <TextFieldInput
                                            {...field}
                                            placeholder='Waktu Selsai'
                                            error={error}
                                            variant='modal'
                                            type='time'
                                            fullWidth
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>
                                Kapasitas
                            </p>
                            <Controller
                                control={control}
                                name='capacity'
                                render={({ field, fieldState: { error } }) => (
                                    <TextFieldInput
                                        {...field}
                                        placeholder='Masukkan Kapasitas'
                                        error={error}
                                        variant='modal'
                                        type='number'
                                    />
                                )}
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>
                                Alasan Perubahan Jadwal
                            </p>
                            <Controller
                                control={control}
                                name='notes'
                                render={({ field, fieldState: { error } }) => (
                                    <div
                                        className={cn(
                                            'flex flex-1 flex-col gap-2'
                                        )}
                                    >
                                        <Textarea
                                            {...field}
                                            className={cn(
                                                '',
                                                !!error?.message &&
                                                    'border-red-500'
                                            )}
                                            placeholder='Masukkan Alasan'
                                        />
                                        {!!error?.message && (
                                            <p className='mt-1 text-xs font-bold text-red-500'>
                                                {error.message}
                                            </p>
                                        )}
                                    </div>
                                )}
                            />
                        </div>
                    </ModalFormFields>
                    <ModalFormFooter type='add' loading={isLoading} />
                </ModalFormContent>
            </ModalFormContainer>
        </>
    );
};

export default RequestChangeModal;
