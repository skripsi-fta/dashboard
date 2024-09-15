import {
    managementStaffCreateValidation,
    type ManagementStaff,
    type ManagementStaffCreate
} from '@/infrastructure/models/management/staff';
import { ManagementStaffAPI } from '@/infrastructure/usecase/management/staff/ManagementStaffAPI';
import CustomSelectComponent from '@/presentation/components/CustomSelect';
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
    const { control, handleSubmit } = useForm<ManagementStaffCreate>({
        defaultValues: {
            email: '',
            name: '',
            role: 'PHARMACIST',
            password: '',
            username: ''
        },
        mode: 'onChange',
        resolver: zodResolver(managementStaffCreateValidation)
    });

    const api = new ManagementStaffAPI();

    const { closeModal } = useModal();

    const { mutate: create, isLoading } = useMutation({
        mutationFn: (data: ManagementStaff.Request.Create) =>
            api.createStaff(data),
        onSuccess: () => {
            toast.success('Sukses membuat akun staff');
            closeModal();
            refetch();
        },
        onError: (res: AxiosError<{ message: string }>) => {
            toast.error(res.response?.data.message ?? 'Membuat staff error');
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
                            <p className='font-semibold text-[#666666]'>Role</p>
                            <Controller
                                control={control}
                                name='role'
                                render={({
                                    field: { ref, ...field },
                                    fieldState: { error }
                                }) => (
                                    <CustomSelectComponent
                                        {...field}
                                        placeholder='Pilih Role'
                                        data={[
                                            {
                                                label: 'Farmasi',
                                                value: 'PHARMACIST'
                                            },
                                            {
                                                label: 'Kasir',
                                                value: 'CASHIER'
                                            },
                                            {
                                                label: 'Manajemen',
                                                value: 'MANAGEMENT'
                                            }
                                        ]}
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
