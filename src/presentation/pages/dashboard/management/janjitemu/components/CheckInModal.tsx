import {
    type ManagementAppointment,
    managementAppointmentCheckInValidation
} from '@/infrastructure/models/management/janjitemu';
import { ManagementAppointmentAPI } from '@/infrastructure/usecase/management/janjitemu/ManagementAppointmentAPI';
import CustomButtonComponent from '@/presentation/components/CustomButton';
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
import { CircleCheck } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

interface CheckInModalProps {
    refetch: () => void;
    defaultValues: ManagementAppointment.Request.CheckIn;
    data: ManagementAppointment.Response.Data;
}

const CheckInModal = ({ refetch, defaultValues, data }: CheckInModalProps) => {
    const [stepper, setStepper] = useState<number>(0);

    const { control, handleSubmit } =
        useForm<ManagementAppointment.Request.CheckIn>({
            defaultValues,
            mode: 'onChange',
            resolver: zodResolver(managementAppointmentCheckInValidation)
        });

    const { closeModal } = useModal();

    const api = new ManagementAppointmentAPI();

    const {
        data: responseData,
        mutate: update,
        isLoading
    } = useMutation({
        mutationFn: (data: ManagementAppointment.Request.CheckIn) =>
            api.createCheckIn(data),
        onSuccess: () => {
            toast.success('Check-in sukses');
            refetch();
            setStepper(() => 1);
        },
        onError: (res: AxiosError<{ message: string }>) => {
            toast.error(res.response?.data?.message ?? 'Check-in error');
        }
    });

    return (
        <>
            {stepper === 0 && (
                <ModalFormContainer
                    formProps={{ onSubmit: handleSubmit((e) => update(e)) }}
                >
                    <ModalFormContent>
                        <ModalFormFields>
                            <div className='flex flex-col gap-2'>
                                <p className='font-semibold text-[#666666]'>
                                    Booking Code
                                </p>
                                <Controller
                                    control={control}
                                    name='bookingCode'
                                    render={({
                                        field,
                                        fieldState: { error }
                                    }) => (
                                        <TextFieldInput
                                            {...field}
                                            error={error}
                                            variant='modal'
                                            readOnly
                                            onFocus={(e) => e.target.blur()}
                                        />
                                    )}
                                />
                            </div>
                        </ModalFormFields>
                        <ModalFormFooter type='Check In' loading={isLoading} />
                    </ModalFormContent>
                </ModalFormContainer>
            )}

            {stepper === 1 && (
                <div className='flex flex-col items-center justify-center gap-4'>
                    <CircleCheck color='#171CA1' size={128} />
                    <p className='text-center text-2xl font-bold'>
                        Check In Berhasil
                    </p>
                    <div className='flex flex-col items-center justify-center text-center'>
                        <p className='text-lg'>Nomor Antrian</p>
                        <p className='text-3xl font-bold'>
                            {responseData?.data.globalQueue ?? 0}
                        </p>
                    </div>

                    <CustomButtonComponent
                        className='w-full flex-1 capitalize'
                        variant={'addButton'}
                        onClick={() => closeModal()}
                    >
                        Selesai
                    </CustomButtonComponent>
                </div>
            )}
        </>
    );
};

export default CheckInModal;
