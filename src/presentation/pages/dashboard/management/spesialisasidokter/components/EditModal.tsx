import {
    managementSpesialisasiDokterUpdateValidation,
    type ManagementSpesialisasiDokter,
    type ManagementSpesialisasiDokterUpdate
} from '@/infrastructure/models/management/spesialisasidokter';
import { ManagementSpecializationAPI } from '@/infrastructure/usecase/management/spesialisasidokter/ManagementSpecializationAPI';
import TextFieldInput from '@/presentation/components/TextfieldInput';
import { ModalFormContainer, ModalFormContent, ModalFormFields, ModalFormFooter } from '@/presentation/layout/modal-form';
import { useModal } from '@/providers/ModalProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import type { AxiosError } from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

interface EditModal {
    refetch: () => void;
    defaultValues: ManagementSpesialisasiDokter.Request.Update;
}

const EditModal = ({ defaultValues, refetch }: EditModal) => {
    const { control, handleSubmit } =
        useForm<ManagementSpesialisasiDokterUpdate>({
            defaultValues,
            mode: 'onChange',
            resolver: zodResolver(managementSpesialisasiDokterUpdateValidation)
        });

    const { closeModal } = useModal();

    const api = new ManagementSpecializationAPI();

    const { mutate: update, isLoading } = useMutation({
        mutationFn: (data: ManagementSpesialisasiDokter.Request.Update) =>
            api.update(data),
        onSuccess: () => {
            toast.success('Sukses update spesialisasi dokter');
            closeModal();
            refetch();
        },
        onError: (res: AxiosError<{ message: string }>) => {
            toast.error(
                res.response?.data?.message ??
                    'Update spesialisasi dokter error'
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
                            <p className='font-semibold text-[#666666]'>Nama</p>
                            <Controller
                                control={control}
                                name='name'
                                render={({ field, fieldState: { error } }) => (
                                    <TextFieldInput
                                        {...field}
                                        placeholder='Masukkan Nama'
                                        error={error}
                                        variant='modal'
                                    />
                                )}
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>
                                Deskripsi
                            </p>
                            <Controller
                                control={control}
                                name='description'
                                render={({ field, fieldState: { error } }) => (
                                    <TextFieldInput
                                        {...field}
                                        placeholder='Masukkan Deskripsi'
                                        error={error}
                                        variant='modal'
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
