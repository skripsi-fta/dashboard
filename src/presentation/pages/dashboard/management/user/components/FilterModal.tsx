import {
    managementStaffListValidation,
    type ManagementStaffListValidation
} from '@/infrastructure/models/management/staff';
import CustomSelectComponent from '@/presentation/components/CustomSelect';
import TextFieldInput from '@/presentation/components/TextfieldInput';
import {
    ModalFormContainer,
    ModalFormContent,
    ModalFormFields,
    ModalFormFooter,
    type FormProps
} from '@/presentation/layout/modal-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

const FilterModal = ({
    onSubmit,
    defaultValues,
    onCancel
}: FormProps<ManagementStaffListValidation>) => {
    const { control, handleSubmit } = useForm<ManagementStaffListValidation>({
        defaultValues,
        mode: 'onChange',
        resolver: zodResolver(managementStaffListValidation)
    });

    return (
        <>
            <ModalFormContainer
                formProps={{ onSubmit: handleSubmit(onSubmit) }}
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
                                                label: 'Dokter',
                                                value: 'DOCTOR'
                                            },
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
                                            {
                                                label: 'Monitoring',
                                                value: 'MONITORING'
                                            }
                                        ]}
                                        error={error}
                                    />
                                )}
                            />
                        </div>
                    </ModalFormFields>
                    <ModalFormFooter type='filter' onCancel={onCancel} />
                </ModalFormContent>
            </ModalFormContainer>
        </>
    );
};

export default FilterModal;
