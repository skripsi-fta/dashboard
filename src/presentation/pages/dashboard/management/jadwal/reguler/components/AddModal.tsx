import {
    managementRegulerScheduleCreateValidation,
    type ManagementRegulerScheduleCreateValidation,
    type ManagementRegulerScheduleDoctor
} from '@/infrastructure/models/management/schedule/reguler';
import { ManagementDoctorProfileAPI } from '@/infrastructure/usecase/management/doctorprofile/ManagementDoctorProfileAPI';
import { ManagementRuanganAPI } from '@/infrastructure/usecase/management/ruangan/ManagementRuanganAPI';
import { ManagementScheduleAPI } from '@/infrastructure/usecase/management/schedule/ManagementScheduleAPI';
import CustomSelectInput from '@/presentation/components/CustomSelectInput';
import DatePickerSingleInput from '@/presentation/components/DatePickerSingleInput';
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
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

interface AddModalProps {
    refetch: () => void;
}

const AddModal = ({ refetch }: AddModalProps) => {
    const { control, handleSubmit } =
        useForm<ManagementRegulerScheduleCreateValidation>({
            defaultValues: {
                capacity: 0,
                date: '',
                doctorId: '',
                endTime: '',
                roomId: '',
                startTime: ''
            },
            mode: 'onChange',
            resolver: zodResolver(managementRegulerScheduleCreateValidation)
        });

    const api = new ManagementScheduleAPI();

    const doctorAPI = new ManagementDoctorProfileAPI();

    const roomAPI = new ManagementRuanganAPI();

    const { closeModal } = useModal();

    const { mutate: create, isLoading } = useMutation({
        mutationFn: (data: ManagementRegulerScheduleDoctor.Request.Create) =>
            api.createRegulerSchedule(data),
        onSuccess: () => {
            toast.success('Sukses membuat jadwal');
            closeModal();
            refetch();
        },
        onError: (res: AxiosError<{ message: string }>) => {
            toast.error(res.response?.data.message ?? 'Membuat jadwal tetap');
        }
    });

    const { data: doctorData, isLoading: doctorLoading } = useQuery({
        queryKey: ['doctor-dropdown-data'],
        queryFn: () => doctorAPI.getDropdown()
    });

    const { data: roomData, isLoading: roomLoading } = useQuery({
        queryKey: ['room-dropdown-data'],
        queryFn: () => roomAPI.getDropdown()
    });

    return (
        <ModalFormContainer
            formProps={{ onSubmit: handleSubmit((e) => create(e)) }}
        >
            <ModalFormContent>
                <ModalFormFields>
                    <div className='flex flex-col gap-2'>
                        <p className='font-semibold text-[#666666]'>Dokter</p>
                        <Controller
                            control={control}
                            name='doctorId'
                            render={({
                                field: { ref, ...field },
                                fieldState: { error }
                            }) => (
                                <CustomSelectInput
                                    {...field}
                                    placeholder='Pilih Dokter'
                                    data={doctorData?.data ?? []}
                                    loading={doctorLoading}
                                    noDataNotice='Dokter tidak ditemukan'
                                    error={error}
                                />
                            )}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='font-semibold text-[#666666]'>Ruangan</p>
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
                        <p className='font-semibold text-[#666666]'>Waktu</p>
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
                <ModalFormFooter type='add' loading={isLoading} />
            </ModalFormContent>
        </ModalFormContainer>
    );
};

export default AddModal;
