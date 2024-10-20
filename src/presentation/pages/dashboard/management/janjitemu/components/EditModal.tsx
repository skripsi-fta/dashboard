import { ManagementAppointment, managementAppointmentUpdateValidation } from '@/infrastructure/models/management/janjitemu';
import { ManagementRegulerScheduleListValidation } from '@/infrastructure/models/management/schedule/reguler';
import { ManagementAppointmentAPI } from '@/infrastructure/usecase/management/janjitemu/ManagementAppointmentAPI';
import { ManagementPasienAPI } from '@/infrastructure/usecase/management/pasien/ManagementPasienAPI';
import { ManagementScheduleAPI } from '@/infrastructure/usecase/management/schedule/ManagementScheduleAPI';
import dayjsUtils from '@/lib/dayjs';
import CustomSelectInput from '@/presentation/components/CustomSelectInput';
import DatePickerSingleInput from '@/presentation/components/DatePickerSingleInput';
import {
    ModalFormContainer,
    ModalFormContent,
    ModalFormFields,
    ModalFormFooter
} from '@/presentation/layout/modal-form';
import { useModal } from '@/providers/ModalProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import type { AxiosError } from 'axios';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

interface EditModal {
    refetch: () => void;
    defaultValues: ManagementAppointment.Request.Update;
}

const EditModal = ({ refetch, defaultValues }: EditModal) => {
    const { control, handleSubmit } = useForm<ManagementAppointment.Request.Update>(
        {
            defaultValues,
            mode: 'onChange',
            resolver: zodResolver(managementAppointmentUpdateValidation)
        }
    );

    const { closeModal } = useModal();

    const api = new ManagementAppointmentAPI();

    const { mutate: update, isLoading } = useMutation({
        mutationFn: (data: ManagementAppointment.Request.Update) =>
            api.update(data),
        onSuccess: () => {
            toast.success('Edit janji temu sukses');
            closeModal();
            refetch();
        },
        onError: (res: AxiosError<{ message: string }>) => {
            toast.error(res.response?.data?.message ?? 'Edit janji temu error');
        }
    });

    const scheduleAPI = new ManagementScheduleAPI();

    const [filterValues, setFilterValues] = useState<ManagementRegulerScheduleListValidation>({
        date: defaultValues.scheduleDate,
        doctorId: '',
        endDate: defaultValues.scheduleDate,
        endTime: '',
        roomId: '',
        startDate: defaultValues.scheduleDate,
        startTime: '',
        status: ''
    });

    const { data: scheduleData, isLoading: scheduleLoading, refetch: refetchSchedule } = useQuery({
        queryKey: ['schedule-dropdown-data', filterValues],
        queryFn: () => scheduleAPI.getDropdown({
            ...filterValues,
            pageSize: 0,
            pageNumber: 0
        }),
    });

    return (
        <>
            <ModalFormContainer
                formProps={{ onSubmit: handleSubmit((e) => update(e)) }}
            >
                <ModalFormContent>
                    <ModalFormFields>

                        <Controller
                            control={control}
                            name='scheduleDate'
                            render={({ field: { ref, ...field } }) => (
                                <DatePickerSingleInput
                                    {...field}
                                    control={control}
                                    label='Tanggal Janji Temu'

                                    onDateChange={(date) => {
                                        setFilterValues(prev => ({
                                            ...prev,
                                            date: dayjsUtils(date).format('YYYY-MM-DD'),
                                            startDate: dayjsUtils(date).format('YYYY-MM-DD'),
                                            endDate: dayjsUtils(date).format('YYYY-MM-DD')
                                        }));
                                        refetchSchedule();
                                    }}
                                />
                            )}
                        />

                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>
                                Jadwal
                            </p>
                            <Controller
                                control={control}
                                name='scheduleId'
                                render={({
                                    field: { ref, ...field },
                                    fieldState: { error }
                                }) => (
                                    <CustomSelectInput
                                        {...field}
                                        placeholder='Pilih Jadwal'
                                        data={scheduleData?.data ?? []}
                                        loading={scheduleLoading}
                                        noDataNotice='Jadwal tidak ditemukan'
                                        error={error}
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

export default EditModal;
