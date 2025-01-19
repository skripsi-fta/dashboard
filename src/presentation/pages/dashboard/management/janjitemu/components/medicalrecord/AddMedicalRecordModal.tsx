import {
    type ManagementMedicalRecord,
    managementMedicalRecordCreateValidation
} from '@/infrastructure/models/management/medicalrecord';
import { ManagementMedicalRecordAPI } from '@/infrastructure/usecase/management/medicalrecord/ManagementMedicalRecordAPI';
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

interface AddMedicalRecordModalProps {
    refetch: () => void;
    defaultValues: ManagementMedicalRecord.Request.Create;
}

const AddMedicalRecordModal = ({
    refetch,
    defaultValues
}: AddMedicalRecordModalProps) => {
    const { control, handleSubmit } =
        useForm<ManagementMedicalRecord.Request.Create>({
            defaultValues,
            mode: 'onChange',
            resolver: zodResolver(managementMedicalRecordCreateValidation)
        });

    const { closeModal } = useModal();

    const api = new ManagementMedicalRecordAPI();

    const { mutate: update, isLoading } = useMutation({
        mutationFn: (data: ManagementMedicalRecord.Request.Create) =>
            api.create(data),
        onSuccess: () => {
            toast.success('Sukses membuat medical record');
            closeModal();
            refetch();
        },
        onError: (res: AxiosError<{ message: string }>) => {
            toast.error(
                res.response?.data?.message ?? 'Membuat medical record error'
            );
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
                            <p className='font-semibold text-[#666666]'>
                                Tinggi Badan
                            </p>
                            <Controller
                                control={control}
                                name='height'
                                render={({ field, fieldState: { error } }) => (
                                    <TextFieldInput
                                        {...field}
                                        placeholder='Masukkan Tinggi Badan'
                                        error={error}
                                        variant='modal'
                                    />
                                )}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>
                                Berat Badan
                            </p>
                            <Controller
                                control={control}
                                name='weight'
                                render={({ field, fieldState: { error } }) => (
                                    <TextFieldInput
                                        {...field}
                                        placeholder='Masukkan Berat Badan'
                                        error={error}
                                        variant='modal'
                                    />
                                )}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>
                                Tekanan Sistolik
                            </p>
                            <Controller
                                control={control}
                                name='systolic'
                                render={({ field, fieldState: { error } }) => (
                                    <TextFieldInput
                                        {...field}
                                        placeholder='Masukkan Tekanan Sistolik'
                                        error={error}
                                        variant='modal'
                                    />
                                )}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>
                                Tekanan Diastolik
                            </p>
                            <Controller
                                control={control}
                                name='diastolic'
                                render={({ field, fieldState: { error } }) => (
                                    <TextFieldInput
                                        {...field}
                                        placeholder='Masukkan Tekanan Diastolik'
                                        error={error}
                                        variant='modal'
                                    />
                                )}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>
                                Suhu Badan
                            </p>
                            <Controller
                                control={control}
                                name='temperature'
                                render={({ field, fieldState: { error } }) => (
                                    <TextFieldInput
                                        {...field}
                                        placeholder='Masukkan Suhu Badan'
                                        error={error}
                                        variant='modal'
                                    />
                                )}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>
                                Keluhan
                            </p>
                            <Controller
                                control={control}
                                name='illness'
                                render={({ field, fieldState: { error } }) => (
                                    <TextFieldInput
                                        {...field}
                                        placeholder='Masukkan Keluhan'
                                        error={error}
                                        variant='modal'
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

export default AddMedicalRecordModal;
