import {
    type ManagementRegulerScheduleApproval,
    managementRegulerScheduleApproval
} from '@/infrastructure/models/management/schedule/reguler';
import { ManagementRuanganAPI } from '@/infrastructure/usecase/management/ruangan/ManagementRuanganAPI';
import { ManagementScheduleAPI } from '@/infrastructure/usecase/management/schedule/ManagementScheduleAPI';
import dayjsUtils from '@/lib/dayjs';
import { cn } from '@/lib/utils';
import CustomButtonComponent from '@/presentation/components/CustomButton';
import CustomSelectInput from '@/presentation/components/CustomSelectInput';
import Spinner from '@/presentation/components/Spinner';
import {
    ModalFormContainer,
    ModalFormContent,
    ModalFormFields
} from '@/presentation/layout/modal-form';
import { useModal } from '@/providers/ModalProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import type { AxiosError } from 'axios';
import { MapPin } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

interface ApprovalModal {
    scheduleId: number;
    action: 'reject' | 'approve' | 'cancel';
    refetch: () => void;
}

const ApprovalModal = ({ scheduleId, action, refetch }: ApprovalModal) => {
    const managementScheduleAPI = new ManagementScheduleAPI();

    const { control, handleSubmit, setValue } =
        useForm<ManagementRegulerScheduleApproval>({
            defaultValues: {
                action,
                id: scheduleId,
                roomId: undefined
            },
            mode: 'onChange',
            resolver: zodResolver(managementRegulerScheduleApproval)
        });

    const { data, isLoading } = useQuery({
        queryKey: ['schedule-detail', scheduleId],
        queryFn: () =>
            managementScheduleAPI.getScheduleById({ id: scheduleId }),
        onSuccess: (d) => {
            setValue('roomId', d.data.schedule.room.id);

            return d;
        }
    });

    const { closeModal } = useModal();

    const roomAPI = new ManagementRuanganAPI();

    const { data: roomData, isLoading: roomLoading } = useQuery({
        queryKey: ['room-dropdown-data'],
        queryFn: () => roomAPI.getDropdown()
    });

    const { mutate: approve, isLoading: loadingApprove } = useMutation({
        mutationFn: (data: ManagementRegulerScheduleApproval) =>
            managementScheduleAPI.approvalSchedule(data),
        onSuccess: () => {
            toast.success('Sukses approve jadwal');
            closeModal();
            refetch();
        },
        onError: (res: AxiosError<{ message: string }>) => {
            toast.error(res.response?.data.message ?? 'Gagal approve jadwal');
        }
    });

    const scheduleData = data?.data;

    if (isLoading && !data) {
        return <Spinner size={40} color='black' />;
    }

    return (
        <>
            <ModalFormContainer
                formProps={{ onSubmit: handleSubmit((e) => approve(e)) }}
            >
                <ModalFormContent>
                    <ModalFormFields>
                        <div className='mb-2 flex flex-col gap-2'>
                            <div className='flex flex-row justify-between'>
                                <p className='font-bold'>
                                    {dayjsUtils(
                                        scheduleData?.schedule.date
                                    ).format('dddd, DD MMMM YYYY')}
                                </p>
                                <div className='flex flex-row items-center gap-2'>
                                    <MapPin
                                        className='text-primaryblue'
                                        size={18}
                                    />
                                    <p className='font-semibold text-primaryblue'>
                                        {scheduleData?.schedule.room.name}
                                    </p>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <div className='flex flex-row font-medium'>
                                    <p className='w-[150px]'>Jadwal</p>
                                    <p>
                                        : {scheduleData?.schedule.startTime} -{' '}
                                        {scheduleData?.schedule.endTime}
                                    </p>
                                </div>
                                <div className='flex flex-row font-medium'>
                                    <p className='w-[150px]'>Status</p>
                                    <p
                                        className={cn(
                                            'capitalize',
                                            scheduleData?.schedule.status ===
                                                'cancelled' && 'text-red-500',
                                            scheduleData?.schedule.status ===
                                                'in review' && 'text-[#EC7525]',
                                            scheduleData?.schedule.status ===
                                                'changed' && 'text-green-400'
                                        )}
                                    >
                                        : {scheduleData?.schedule.status}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {scheduleData?.schedule.status === 'in review' && (
                            <>
                                <p className='text-center font-semibold capitalize'>
                                    Diajukan perubahan jadwal ke
                                </p>

                                {scheduleData.proposedSchedule && (
                                    <div className='mb-2 flex flex-col gap-2'>
                                        <div className='flex flex-row justify-between'>
                                            <p className='font-bold'>
                                                {dayjsUtils(
                                                    scheduleData
                                                        ?.proposedSchedule?.date
                                                ).format('dddd, DD MMMM YYYY')}
                                            </p>
                                            {scheduleData?.proposedSchedule
                                                ?.room && (
                                                <div className='flex flex-row items-center gap-2'>
                                                    <MapPin
                                                        className='text-primaryblue'
                                                        size={18}
                                                    />
                                                    <p className='font-semibold text-primaryblue'>
                                                        {
                                                            scheduleData
                                                                ?.proposedSchedule
                                                                .room.name
                                                        }
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <div className='flex flex-col'>
                                            <div className='flex flex-row font-medium'>
                                                <p className='w-[150px]'>
                                                    Jadwal
                                                </p>
                                                <p>
                                                    :{' '}
                                                    {
                                                        scheduleData
                                                            ?.proposedSchedule
                                                            ?.startTime
                                                    }{' '}
                                                    -{' '}
                                                    {
                                                        scheduleData
                                                            ?.proposedSchedule
                                                            ?.endTime
                                                    }
                                                </p>
                                            </div>
                                            <div className='flex flex-row font-medium'>
                                                <p className='w-[150px]'>
                                                    Status
                                                </p>
                                                <p
                                                    className={cn(
                                                        'capitalize',
                                                        scheduleData
                                                            ?.proposedSchedule
                                                            .status ===
                                                            'cancelled' &&
                                                            'text-red-500',
                                                        scheduleData
                                                            ?.proposedSchedule
                                                            .status ===
                                                            'in review' &&
                                                            'text-[#EC7525]',
                                                        scheduleData
                                                            ?.proposedSchedule
                                                            .status ===
                                                            'changed' &&
                                                            'text-green-400'
                                                    )}
                                                >
                                                    :{' '}
                                                    {
                                                        scheduleData
                                                            ?.proposedSchedule
                                                            .status
                                                    }
                                                </p>
                                            </div>
                                            {scheduleData.proposedSchedule
                                                ?.notes && (
                                                <div className='flex flex-row font-medium'>
                                                    <p className='w-[150px]'>
                                                        Notes
                                                    </p>
                                                    <p>
                                                        :{' '}
                                                        {
                                                            scheduleData
                                                                ?.proposedSchedule
                                                                .notes
                                                        }
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {action === 'approve' && (
                            <div className='flex flex-col gap-2'>
                                <p className='font-semibold text-[#666666]'>
                                    Ruangan
                                </p>
                                <Controller
                                    control={control}
                                    name='roomId'
                                    render={({
                                        field: { ref, value, ...field },
                                        fieldState: { error }
                                    }) => (
                                        <CustomSelectInput
                                            {...field}
                                            value={value}
                                            placeholder='Pilih Ruangan'
                                            data={
                                                roomData?.data.map((d) => ({
                                                    ...d,
                                                    value: Number(d.value)
                                                })) ?? []
                                            }
                                            loading={roomLoading}
                                            noDataNotice='Ruangan tidak ditemukan'
                                            error={error}
                                        />
                                    )}
                                />
                            </div>
                        )}
                    </ModalFormFields>

                    <div className='flex w-full flex-row gap-4'>
                        <CustomButtonComponent
                            className='w-full flex-1 text-black'
                            variant={'ghost'}
                            onClick={closeModal}
                        >
                            Batal
                        </CustomButtonComponent>

                        <CustomButtonComponent
                            className={cn(
                                'w-full flex-1 capitalize',
                                action === 'approve'
                                    ? 'bg-green-500 hover:bg-green-500/70'
                                    : 'bg-red-500 hover:bg-red-500/70'
                            )}
                            variant={'addButton'}
                            disabled={loadingApprove}
                            loading={loadingApprove}
                            type='submit'
                        >
                            {action === 'approve' ? 'Terima' : 'Tolak'}
                        </CustomButtonComponent>
                    </div>
                </ModalFormContent>
            </ModalFormContainer>
        </>
    );
};

export default ApprovalModal;
