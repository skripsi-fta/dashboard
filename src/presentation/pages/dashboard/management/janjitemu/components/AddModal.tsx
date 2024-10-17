import {
    type ManagementAppointmentCreate,
    managementAppointmentCreateValidation,
    type ManagementAppointment
} from '@/infrastructure/models/management/janjitemu';
import { ManagementRegulerScheduleListValidation } from '@/infrastructure/models/management/schedule/reguler';
import { ManagementAppointmentAPI } from '@/infrastructure/usecase/management/janjitemu/ManagementAppointmentAPI';
import { ManagementPasienAPI } from '@/infrastructure/usecase/management/pasien/ManagementPasienAPI';
import { ManagementScheduleAPI } from '@/infrastructure/usecase/management/schedule/ManagementScheduleAPI';
import { ManagementSpecializationAPI } from '@/infrastructure/usecase/management/spesialisasidokter/ManagementSpecializationAPI';
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
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

interface AddModalProps {
    refetch: () => void;
}

const AddModal = ({ refetch }: AddModalProps) => {
    const { control, handleSubmit } = useForm<ManagementAppointmentCreate>({
        defaultValues: {
            patientId: '',
            scheduleId: '',
        },
        mode: 'onChange',
        resolver: zodResolver(managementAppointmentCreateValidation)
    });

    const { closeModal } = useModal();

    const api = new ManagementAppointmentAPI();

    const scheduleAPI = new ManagementScheduleAPI();

    const pasienAPI = new ManagementPasienAPI();

    const { mutate: create, isLoading } = useMutation({
        mutationFn: (data: ManagementAppointment.Request.Create) =>
            api.create(data),
        onSuccess: () => {
            toast.success('Sukses membuat appointment');
            closeModal();
            refetch();
        },
        onError: (res: AxiosError<{ message: string }>) => {
            toast.error(res.response?.data?.message ?? 'Membuat appointment error');
        }
    });

    const [filterValues, setFilterValues] = useState<ManagementRegulerScheduleListValidation>({
        date: '',
        doctorId: '',
        endDate: '',
        endTime: '',
        roomId: '',
        startDate: '',
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
        enabled: !!filterValues.date,
    });

    const { data: pasienData, isLoading: pasienLoading } = useQuery({
        queryKey: ['pasien-dropdown-data'],
        queryFn: () => pasienAPI.getDropdown()
    });

    return (
        <>
            <ModalFormContainer
                formProps={{ onSubmit: handleSubmit((e) => {
                    create(e)
                }) }}
            >
                <ModalFormContent>
                    <ModalFormFields>
                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>
                                Pasien
                            </p>
                            <Controller
                                control={control}
                                name='patientId'
                                render={({
                                    field: { ref, ...field },
                                    fieldState: { error }
                                }) => (
                                    <CustomSelectInput
                                        {...field}
                                        placeholder='Cari Pasien'
                                        data={pasienData?.data ?? []}
                                        loading={pasienLoading}
                                        noDataNotice='Pasien tidak ditemukan'
                                        error={error}
                                    />
                                )}
                            />
                        </div>

                        <DatePickerSingleInput
                            control={control}
                            name='date'
                            label='Tanggal Janji Temu'

                            onDateChange={(date) => {
                                console.log("Selected")
                                setFilterValues(prev => ({
                                    ...prev,
                                    date: dayjsUtils(date).format('YYYY-MM-DD'),
                                    startDate: dayjsUtils(date).format('YYYY-MM-DD'),
                                    endDate: dayjsUtils(date).format('YYYY-MM-DD')
                                }));
                                console.log("Done")
                                refetchSchedule();
                            }}
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
                    <ModalFormFooter type='add' loading={isLoading} />
                </ModalFormContent>
            </ModalFormContainer>
        </>
    );
};

export default AddModal;
