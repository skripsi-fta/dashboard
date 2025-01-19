import {
    managementRegulerScheduleListValidation,
    type ManagementRegulerScheduleListValidation
} from '@/infrastructure/models/management/schedule/reguler';
import { ManagementDoctorProfileAPI } from '@/infrastructure/usecase/management/doctorprofile/ManagementDoctorProfileAPI';
import { ManagementRuanganAPI } from '@/infrastructure/usecase/management/ruangan/ManagementRuanganAPI';
import CustomSelectComponent from '@/presentation/components/CustomSelect';
import CustomSelectInput from '@/presentation/components/CustomSelectInput';
import DatePickerSingleInput from '@/presentation/components/DatePickerSingleInput';
import TextFieldInput from '@/presentation/components/TextfieldInput';
import {
    ModalFormContainer,
    ModalFormContent,
    ModalFormFields,
    ModalFormFooter,
    type FormProps
} from '@/presentation/layout/modal-form';
import { scheduleStatusData } from '@/shared/constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

const FilterModal = ({
    onSubmit,
    defaultValues,
    onCancel
}: FormProps<ManagementRegulerScheduleListValidation>) => {
    const { control, handleSubmit } =
        useForm<ManagementRegulerScheduleListValidation>({
            defaultValues,
            mode: 'onChange',
            resolver: zodResolver(managementRegulerScheduleListValidation)
        });

    const roomAPI = new ManagementRuanganAPI();

    const {
        data: roomData,
        isLoading: roomLoading,
        isError: roomError
    } = useQuery({
        queryKey: ['room-dropdown-data'],
        queryFn: () => roomAPI.getDropdown()
    });

    return (
        <ModalFormContainer formProps={{ onSubmit: handleSubmit(onSubmit) }}>
            <ModalFormContent>
                <ModalFormFields>
                    <div className='flex w-full flex-row justify-center gap-4'>
                        <DatePickerSingleInput
                            control={control}
                            name='startDate'
                            label='Tanggal Mulai'
                        />

                        <DatePickerSingleInput
                            control={control}
                            name='endDate'
                            label='Tanggal Akhir'
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <p className='font-semibold text-[#666666]'>Waktu</p>
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
                                    loading={roomLoading || roomError}
                                    noDataNotice='Ruangan tidak ditemukan'
                                    error={error}
                                />
                            )}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <p className='font-semibold text-[#666666]'>
                            Status Jadwal
                        </p>
                        <Controller
                            control={control}
                            name='status'
                            render={({
                                field: { ref, ...field },
                                fieldState: { error }
                            }) => (
                                <CustomSelectComponent
                                    {...field}
                                    placeholder='Pilih Status'
                                    data={scheduleStatusData}
                                    error={error}
                                />
                            )}
                        />
                    </div>
                </ModalFormFields>
                <ModalFormFooter type='filter' onCancel={onCancel} />
            </ModalFormContent>
        </ModalFormContainer>
    );
};

export default FilterModal;
