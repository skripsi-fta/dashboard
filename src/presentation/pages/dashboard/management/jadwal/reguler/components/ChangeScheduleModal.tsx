import {
    managementRegulerScheduleChangeValidation,
    type ManagementRegulerScheduleChangeValidation,
    type ManagementRegulerScheduleDoctor
} from '@/infrastructure/models/management/schedule/reguler';
import { ManagementRuanganAPI } from '@/infrastructure/usecase/management/ruangan/ManagementRuanganAPI';
import { ManagementScheduleAPI } from '@/infrastructure/usecase/management/schedule/ManagementScheduleAPI';
import dayjsUtils from '@/lib/dayjs';
import { cn } from '@/lib/utils';
import CustomSelectInput from '@/presentation/components/CustomSelectInput';
import DatePickerSingleInput from '@/presentation/components/DatePickerSingleInput';
import Spinner from '@/presentation/components/Spinner';
import TextFieldInput from '@/presentation/components/TextfieldInput';
import {
    ModalFormContainer,
    ModalFormContent,
    ModalFormFields,
    ModalFormFooter
} from '@/presentation/layout/modal-form';
import { useModal } from '@/providers/ModalProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import type { AxiosError } from 'axios';
import { MapPin } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

interface ChangeScheduleModal {
    refetch: () => void;
    defaultValue: ManagementRegulerScheduleChangeValidation;
}

const ChangeScheduleModal = ({
    refetch,
    defaultValue
}: ChangeScheduleModal) => {
    const { control, handleSubmit } =
        useForm<ManagementRegulerScheduleChangeValidation>({
            defaultValues: defaultValue,
            mode: 'onChange',
            resolver: zodResolver(managementRegulerScheduleChangeValidation)
        });

    const api = new ManagementScheduleAPI();

    const roomAPI = new ManagementRuanganAPI();

    const { closeModal } = useModal();

    const { data: scheduleData, isLoading: isLoadingSchedule } = useQuery({
        queryKey: ['schedule-detail', defaultValue.id],
        queryFn: () => api.getScheduleById({ id: defaultValue.id })
    });

    const { mutate: change, isLoading } = useMutation({
        mutationFn: (data: ManagementRegulerScheduleDoctor.Request.Change) =>
            api.changeSchedule(data),
        onSuccess: () => {
            toast.success('Sukses mengubah jadwal');
            closeModal();
            refetch();
        },
        onError: (res: AxiosError<{ message: string }>) => {
            toast.error(res.response?.data.message ?? 'Mengubah jadwal gagal');
        }
    });

    const { data: roomData, isLoading: roomLoading } = useQuery({
        queryKey: ['room-dropdown-data'],
        queryFn: () => roomAPI.getDropdown()
    });

    if (isLoading && !scheduleData) {
        return <Spinner size={40} color='black' />;
    }

    return (
        <>
            <ModalFormContainer
                formProps={{ onSubmit: handleSubmit((e) => change(e)) }}
            >
                <ModalFormContent>
                    <ModalFormFields>
                        <div className='mb-2 flex flex-col gap-2'>
                            <div className='flex flex-row justify-between'>
                                <p className='font-bold'>
                                    {dayjsUtils(
                                        scheduleData?.data?.schedule?.date
                                    ).format('dddd, DD MMMM YYYY')}
                                </p>
                                <div className='flex flex-row items-center gap-2'>
                                    <MapPin
                                        className='text-primaryblue'
                                        size={18}
                                    />
                                    <p className='font-semibold text-primaryblue'>
                                        {
                                            scheduleData?.data?.schedule?.room
                                                .name
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <div className='flex flex-row font-medium'>
                                    <p className='w-[150px]'>Jadwal</p>
                                    <p>
                                        :{' '}
                                        {
                                            scheduleData?.data?.schedule
                                                ?.startTime
                                        }{' '}
                                        -{' '}
                                        {scheduleData?.data?.schedule?.endTime}
                                    </p>
                                </div>
                                <div className='flex flex-row font-medium'>
                                    <p className='w-[150px]'>Status</p>
                                    <p
                                        className={cn(
                                            'capitalize',
                                            scheduleData?.data?.schedule
                                                ?.status === 'cancelled' &&
                                                'text-red-500',
                                            scheduleData?.data?.schedule
                                                ?.status === 'in review' &&
                                                'text-[#EC7525]',
                                            scheduleData?.data?.schedule
                                                ?.status === 'changed' &&
                                                'text-green-400'
                                        )}
                                    >
                                        : {scheduleData?.data?.schedule?.status}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <p className='text-center font-semibold capitalize'>
                            Ubah jadwal ke
                        </p>

                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>
                                Ruangan
                            </p>
                            <Controller
                                control={control}
                                name='roomId'
                                render={({
                                    field: { ref, ...field },
                                    fieldState: { error }
                                }) => (
                                    <CustomSelectInput
                                        {...field}
                                        placeholder='Pilih Ruangan'
                                        data={roomData?.data ?? []}
                                        loading={roomLoading}
                                        noDataNotice='Ruangan tidak ditemukan'
                                        error={error}
                                    />
                                )}
                            />
                        </div>

                        <DatePickerSingleInput
                            control={control}
                            name='date'
                            label='Tanggal Jadwal'
                        />

                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>
                                Waktu
                            </p>
                            <div className='flex w-full flex-row items-center justify-center gap-4'>
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
                                <p>-</p>
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
                    </ModalFormFields>
                    <ModalFormFooter type='edit' loading={isLoading} />
                </ModalFormContent>
            </ModalFormContainer>
        </>
    );
};

export default ChangeScheduleModal;
