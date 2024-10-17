import {
    managementAppointmentListValidation,
    type ManagementAppointmentList
} from '@/infrastructure/models/management/janjitemu';
import CustomSelectComponent from '@/presentation/components/CustomSelect';
import TextFieldInput from '@/presentation/components/TextfieldInput';
import {
    ModalFormContainer,
    ModalFormContent,
    ModalFormFields,
    ModalFormFooter,
    type FormProps
} from '@/presentation/layout/modal-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

const FilterModal = ({
    onSubmit,
    defaultValues,
    onCancel
}: FormProps<ManagementAppointmentList>) => {
    const { control, handleSubmit } = useForm<ManagementAppointmentList>({
        defaultValues,
        mode: 'onChange',
        resolver: zodResolver(managementAppointmentListValidation)
    });

    return (
        <>
            <ModalFormContainer
                formProps={{ onSubmit: handleSubmit(onSubmit) }}
            >
                <ModalFormContent>
                    <ModalFormFields>
                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>Kode Booking</p>
                            <Controller
                                control={control}
                                name='bookingCode'
                                render={({ field, fieldState: { error } }) => (
                                    <TextFieldInput
                                        {...field}
                                        placeholder='Masukkan Kode Booking'
                                        error={error}
                                        variant='modal'
                                    />
                                )}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>Status Janji Temu</p>
                            <Controller
                                control={control}
                                name='appointmentStatus'
                                render={({ field, fieldState: { error } }) => (
                                    <CustomSelectComponent
                                        {...field}
                                        placeholder='Pilih Status Janji Temu'
                                        data={[
                                            {
                                                label: 'Terjadwal',
                                                value: 'scheduled'
                                            },
                                            {
                                                label: 'Check-in',
                                                value: 'checkin'
                                            },
                                            {
                                                label: 'Antrian Dokter',
                                                value: 'doctor queue'
                                            },
                                            {
                                                label: 'Antrian Farmasi',
                                                value: 'pharmacy queue'
                                            },
                                            {
                                                label: 'Antrian Kasir',
                                                value: 'cashier queue'
                                            },
                                            {
                                                label: 'Selesai',
                                                value: 'done'
                                            },
                                            {
                                                label: 'Dibatalkan',
                                                value: 'cancel'
                                            },
                                        ]}
                                        error={error}
                                    />
                                )}
                            />
                        </div>
                    </ModalFormFields>
                    <ModalFormFooter type='filter' onCancel={onCancel} />
                </ModalFormContent>
            </ModalFormContainer>
        </>
    );
};

export default FilterModal;
