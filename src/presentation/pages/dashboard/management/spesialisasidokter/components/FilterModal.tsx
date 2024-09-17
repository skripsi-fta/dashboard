import {
    managementSpesialisasiDokterListValidation,
    type ManagementSpesialisasiDokterList
} from '@/infrastructure/models/management/spesialisasidokter';
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
}: FormProps<ManagementSpesialisasiDokterList>) => {
    const { control, handleSubmit } = useForm<ManagementSpesialisasiDokterList>(
        {
            defaultValues,
            mode: 'onChange',
            resolver: zodResolver(managementSpesialisasiDokterListValidation)
        }
    );

    return (
        <ModalFormContainer formProps={{ onSubmit: handleSubmit(onSubmit) }}>
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
                <ModalFormFooter type='filter' onCancel={onCancel} />
            </ModalFormContent>
        </ModalFormContainer>
    );
};

export default FilterModal;
