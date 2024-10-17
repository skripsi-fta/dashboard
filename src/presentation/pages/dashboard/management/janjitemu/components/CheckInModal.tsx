import { ManagementAppointment, managementAppointmentCheckInValidation } from '@/infrastructure/models/management/janjitemu';
import { ManagementAppointmentAPI } from '@/infrastructure/usecase/management/janjitemu/ManagementAppointmentAPI';
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

interface CheckInModalProps {
    refetch: () => void;
    defaultValues: ManagementAppointment.Request.CheckIn;
}

const CheckInModal = ({ refetch, defaultValues }: CheckInModalProps) => {
    const { control, handleSubmit } =
        useForm<ManagementAppointment.Request.CheckIn>({
            defaultValues,
            mode: 'onChange',
            resolver: zodResolver(managementAppointmentCheckInValidation)
        });

    const { closeModal } = useModal();

    const api = new ManagementAppointmentAPI();

    const { mutate: update, isLoading } = useMutation({
        mutationFn: (data: ManagementAppointment.Request.CheckIn) =>
            api.createCheckIn(data),
        onSuccess: () => {
            toast.success('Check-in sukses');
            closeModal();
            refetch();
        },
        onError: (res: AxiosError<{ message: string }>) => {
            toast.error(res.response?.data?.message ?? 'Check-in error');
        }
    });

    return (
        <>
            <ModalFormContainer
                formProps={{ onSubmit: handleSubmit((e) => update(e)) }}
            >
                <ModalFormContent>
                    <ModalFormFields>
                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>Booking Code</p>
                            <Controller
                                control={control}
                                name='bookingCode'
                                render={({ field, fieldState: { error } }) => (
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
        </>
    );
};

export default CheckInModal;
