import {
    managementDoctorProfileEditValidation,
    type ManagementDoctorProfile
} from '@/infrastructure/models/management/doctorprofile';
import { ManagementDoctorProfileAPI } from '@/infrastructure/usecase/management/doctorprofile/ManagementDoctorProfileAPI';
import { ManagementSpecializationAPI } from '@/infrastructure/usecase/management/spesialisasidokter/ManagementSpecializationAPI';
import CustomSelectComponent from '@/presentation/components/CustomSelect';
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
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

interface EditModalProps {
    refetch: () => void;
    defaultValues: ManagementDoctorProfile.Request.Update;
}

const EditModal = ({ refetch, defaultValues }: EditModalProps) => {
    const { control, handleSubmit } =
        useForm<ManagementDoctorProfile.Request.Update>({
            defaultValues,
            mode: 'onChange',
            resolver: zodResolver(managementDoctorProfileEditValidation)
        });

    const { closeModal } = useModal();

    const api = new ManagementDoctorProfileAPI();

    const specializationAPI = new ManagementSpecializationAPI();

    const { data, isLoading: isLoadingDropdown } = useQuery({
        queryKey: ['dropdown-specialization-docter'],
        queryFn: () => specializationAPI.getDropdown(),
        onError: (res: AxiosError<{ message: string }>) => {
            toast.error('Dropdown spesialisasi error');
        }
    });

    const { mutate: update, isLoading } = useMutation({
        mutationFn: (data: ManagementDoctorProfile.Request.Update) =>
            api.updateDoctor(data),
        onSuccess: () => {
            toast.success('Edit dokter sukses');
            closeModal();
            refetch();
        },
        onError: (res: AxiosError<{ message: string }>) => {
            toast.error(res.response?.data?.message ?? 'Edit dokter error');
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
                formProps={{ onSubmit: handleSubmit((e) => update(e)) }}
            >
                <ModalFormContent>
                    <ModalFormFields>
                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>Foto</p>
                            <Controller
                                control={control}
                                name='image'
                                render={({ field: { onChange }, fieldState: { error } }) => (
                                    <>
                                        <div className='flex items-center gap-3'>
                                            {(file || defaultValues.photoPath) && (
                                                <img
                                                    src={file ? file : `http://localhost:8080/v1/storage?path=${defaultValues.photoPath}`}
                                                    className='w-[150px] h-[150px]'
                                                />
                                            )}
                                            <Input
                                                type='file'
                                                accept='image/jpeg'
                                                onChange={(e) =>
                                                    handleChange(e, onChange)
                                                }
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
                                Deskripsi Dokter
                            </p>
                            <Controller
                                control={control}
                                name='profile'
                                render={({ field, fieldState: { error } }) => (
                                    <TextFieldInput
                                        {...field}
                                        placeholder='Masukkan Deskripsi Dokter'
                                        error={error}
                                        variant='modal'
                                    />
                                )}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>
                                Harga Konsultasi
                            </p>
                            <Controller
                                control={control}
                                name='consulePrice'
                                render={({ field, fieldState: { error } }) => (
                                    <TextFieldInput
                                        {...field}
                                        placeholder='Masukkan Deskripsi Dokter'
                                        error={error}
                                        type='number'
                                        min={1}
                                        variant='modal'
                                    />
                                )}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>
                                Spesialisasi Dokter
                            </p>
                            <Controller
                                control={control}
                                name='specializationId'
                                render={({
                                    field: { ref, ...field },
                                    fieldState: { error }
                                }) => (
                                    <CustomSelectComponent
                                        {...field}
                                        placeholder='Pilih Spesialisasi'
                                        data={data?.data ?? []}
                                        error={error}
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
