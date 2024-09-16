import {
    managementDoctorProfileCreateValidation,
    type ManagementDoctorProfile,
    type ManagementDoctorProfileCreateValidation
} from '@/infrastructure/models/management/doctorprofile';
import { ManagementDoctorProfileAPI } from '@/infrastructure/usecase/management/doctorprofile/ManagementDoctorProfileAPI';
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
                role: 'DOCTOR'
            },
            mode: 'onChange',
            resolver: zodResolver(managementDoctorProfileCreateValidation)
        });

    const { closeModal } = useModal();

    const api = new ManagementDoctorProfileAPI();

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

    return (
        <>
            <ModalFormContainer
                formProps={{ onSubmit: handleSubmit((e) => create(e)) }}
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
                    </ModalFormFields>
                    <ModalFormFooter type='add' loading={isLoading} />
                </ModalFormContent>
            </ModalFormContainer>
        </>
    );
};

export default AddModal;
