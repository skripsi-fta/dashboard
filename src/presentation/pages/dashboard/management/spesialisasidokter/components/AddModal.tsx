import {
    managementSpesialisasiDokterCreateValidation,
    type ManagementSpesialisasiDokter,
    type ManagementSpesialisasiDokterCreate
} from '@/infrastructure/models/management/spesialisasidokter';
import { ManagementSpecializationAPI } from '@/infrastructure/usecase/management/spesialisasidokter/ManagementSpecializationAPI';
import TextFieldInput from '@/presentation/components/TextfieldInput';
import {
    ModalFormContainer,
    ModalFormContent,
    ModalFormFields,
    ModalFormFooter
} from '@/presentation/layout/modal-form';
import { Input } from '@/presentation/ui/input';
import { useModal } from '@/providers/ModalProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import type { AxiosError } from 'axios';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

interface AddModalProps {
    refetch: () => void;
}

const AddModal = ({ refetch }: AddModalProps) => {
    const { control, handleSubmit } =
        useForm<ManagementSpesialisasiDokterCreate>({
            defaultValues: { description: '', name: '', image: undefined },
            mode: 'onChange',
            resolver: zodResolver(managementSpesialisasiDokterCreateValidation)
        });

    const { closeModal } = useModal();

    const api = new ManagementSpecializationAPI();

    const { mutate: create, isLoading } = useMutation({
        mutationFn: (data: ManagementSpesialisasiDokter.Request.Create) =>
            api.create(data),
        onSuccess: () => {
            toast.success('Sukses membuat spesialisasi dokter');
            closeModal();
            refetch();
        },
        onError: (res: AxiosError<{ message: string }>) => {
            toast.error(
                res.response?.data?.message ??
                    'Membuat spesialisasi dokter error'
            );
        }
    });

    const [file, setFile] = useState<string>();
    function handleChange(e: React.ChangeEvent<HTMLInputElement>, onChange: Function) {
        const files = e.target.files;
        if (files) {
            setFile(URL.createObjectURL(files[0]));
            onChange(files[0]);
        }
    }

    return (
        <>
            <ModalFormContainer
                formProps={{ onSubmit: handleSubmit((e) => create(e)) }}
            >
                <ModalFormContent>
                    <ModalFormFields>
                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>Foto</p>
                            <Controller
                                control={control}
                                name='image'
                                render={({ field: { value, onChange, ...fieldProps }, fieldState: { error } }) => (
                                    <>
                                        <div className='flex items-center gap-3'>
                                            {file && (
                                                <img src={file} className='w-[150px] h-[150px]' />
                                            )}
                                            <Input
                                                type='file'
                                                {...fieldProps}
                                                accept='image/*'
                                                onChange={(e) => handleChange(e, onChange)}
                                            />
                                        </div>
                                        {!!error?.message && (
                                            <p className='mt-1 text-xs font-bold text-red-500'>
                                                {error.message}
                                            </p>
                                        )}
                                    </>
                                )}
                            />
                        </div>

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
                    <ModalFormFooter type='add' loading={isLoading} />
                </ModalFormContent>
            </ModalFormContainer>
        </>
    );
};

export default AddModal;
