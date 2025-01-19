import {
    managementStaffUpdateValidation,
    type ManagementStaff,
    type ManagementStaffUpdate
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

interface EditModalProps {
    refetch: () => void;
    defaultValues: ManagementStaffUpdate;
}

const EditModal = ({ refetch, defaultValues }: EditModalProps) => {
    const { control, handleSubmit } = useForm<ManagementStaffUpdate>({
        defaultValues,
        mode: 'onChange',
        resolver: zodResolver(managementStaffUpdateValidation)
    });

    const api = new ManagementStaffAPI();

    const { closeModal } = useModal();

    const { mutate: update, isLoading } = useMutation({
        mutationFn: (data: ManagementStaff.Request.Update) =>
            api.updateStaff(data),
        onSuccess: () => {
            toast.success('Edit staff sukses');
            closeModal();
            refetch();
        },
        onError: (res: AxiosError<{ message: string }>) => {
            toast.error(res.response?.data?.message ?? 'Edit staff error');
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
                                            },
                                            { label: 'Dokter', value: 'DOCTOR' }
                                        ]}
                                        disabled={true}
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
