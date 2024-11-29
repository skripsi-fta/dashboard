import {
    managementDoctorProfileCreateValidation,
    type ManagementDoctorProfile,
    type ManagementDoctorProfileCreateValidation
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

interface AddModalProps {
    refetch: () => void;
}

const AddModal = ({ refetch }: AddModalProps) => {
    const { control, handleSubmit } =
        useForm<ManagementDoctorProfileCreateValidation>({
            defaultValues: {
                consulePrice: 0,
                email: '',
                name: '',
                password: '',
                profile: '',
                username: '',
                role: 'DOCTOR',
                specializationId: '',
                image: undefined
            },
            mode: 'onChange',
            resolver: zodResolver(managementDoctorProfileCreateValidation)
        });

    const { closeModal } = useModal();

    const specializationAPI = new ManagementSpecializationAPI();

    const api = new ManagementDoctorProfileAPI();

    const { data, isLoading: isLoadingDropdown } = useQuery({
        queryKey: ['dropdown-specialization-docter'],
        queryFn: () => specializationAPI.getDropdown(),
        onError: (res: AxiosError<{ message: string }>) => {
            toast.error('Dropdown spesialisasi error');
        }
    });

    const { mutate: create, isLoading } = useMutation({
        mutationFn: (data: ManagementDoctorProfile.Request.Create) =>
            api.createDoctor(data),
        onSuccess: () => {
            toast.success('Sukses membuat dokter');
            closeModal();
            refetch();
        },
        onError: (res: AxiosError<{ message: string }>) => {
            toast.error(res.response?.data?.message ?? 'Membuat dokter error');
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
                                                accept='image/jpeg'
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
                                Email
                            </p>
                            <Controller
                                control={control}
                                name='email'
                                render={({ field, fieldState: { error } }) => (
                                    <TextFieldInput
                                        {...field}
                                        placeholder='Masukkan email'
                                        error={error}
                                        variant='modal'
                                    />
                                )}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>
                                Username
                            </p>
                            <Controller
                                control={control}
                                name='username'
                                render={({ field, fieldState: { error } }) => (
                                    <TextFieldInput
                                        {...field}
                                        placeholder='Masukkan Username'
                                        error={error}
                                        variant='modal'
                                    />
                                )}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>
                                Password
                            </p>
                            <Controller
                                control={control}
                                name='password'
                                render={({ field, fieldState: { error } }) => (
                                    <TextFieldInput
                                        {...field}
                                        placeholder='Masukkan Password'
                                        error={error}
                                        variant='modal'
                                        type='password'
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
                    <ModalFormFooter type='add' loading={isLoading} />
                </ModalFormContent>
            </ModalFormContainer>
        </>
    );
};

export default AddModal;
