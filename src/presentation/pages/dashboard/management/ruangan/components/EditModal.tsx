import {
    managementRuanganUpdateValidation,
    type ManagementRuangan
} from '@/infrastructure/models/management/ruangan';
import { ManagementRuanganAPI } from '@/infrastructure/usecase/management/ruangan/ManagementRuanganAPI';
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
import { useMutation } from 'react-query';
import { toast } from 'sonner';

interface EditModal {
    refetch: () => void;
    defaultValues: ManagementRuangan.Request.Update;
}

const EditModal = ({ refetch, defaultValues }: EditModal) => {
    const { control, handleSubmit } = useForm<ManagementRuangan.Request.Update>(
        {
            defaultValues,
            mode: 'onChange',
            resolver: zodResolver(managementRuanganUpdateValidation)
        }
    );

    const { closeModal } = useModal();

    const api = new ManagementRuanganAPI();

    const { mutate: update, isLoading } = useMutation({
        mutationFn: (data: ManagementRuangan.Request.Update) =>
            api.update(data),
        onSuccess: () => {
            toast.success('Edit ruangan sukses');
            closeModal();
            refetch();
        },
        onError: (res: AxiosError<{ message: string }>) => {
            toast.error(res.response?.data?.message ?? 'Edit ruangan error');
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
                                        placeholder='Masukkan Nama Ruangan'
                                        error={error}
                                        variant='modal'
                                    />
                                )}
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>
                                Deskripsi Ruangan
                            </p>
                            <Controller
                                control={control}
                                name='detail'
                                render={({ field, fieldState: { error } }) => (
                                    <TextFieldInput
                                        {...field}
                                        placeholder='Masukkan Deskripsi Ruangan'
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
