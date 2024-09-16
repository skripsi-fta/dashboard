import {
    managementDoctorProfileListValidation,
    type ManagementDoctorProfileList
} from '@/infrastructure/models/management/doctorprofile';
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
}: FormProps<ManagementDoctorProfileList>) => {
    const { control, handleSubmit } = useForm<ManagementDoctorProfileList>({
        defaultValues,
        mode: 'onChange',
        resolver: zodResolver(managementDoctorProfileListValidation)
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
                                        placeholder='Masukkan Nama Dokter'
                                        error={error}
                                        variant='modal'
                                    />
                                )}
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>
                                Urutkan berdasarkan
                            </p>
                            <Controller
                                control={control}
                                name='sortBy'
                                render={({
                                    field: { ref, ...field },
                                    fieldState: { error }
                                }) => (
                                    <CustomSelectComponent
                                        {...field}
                                        placeholder='Urutkan berdasarkan'
                                        data={[
                                            {
                                                label: 'Rating',
                                                value: 'rating'
                                            },
                                            {
                                                label: 'Total Rating',
                                                value: 'totalRating'
                                            },
                                            {
                                                label: 'Harga Konsultasi',
                                                value: 'consulePrice'
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
