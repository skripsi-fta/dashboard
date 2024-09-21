import {
    managementRuanganListValidation,
    type ManagementRuanganList
} from '@/infrastructure/models/management/ruangan';
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
}: FormProps<ManagementRuanganList>) => {
    const { control, handleSubmit } = useForm<ManagementRuanganList>({
        defaultValues,
        mode: 'onChange',
        resolver: zodResolver(managementRuanganListValidation)
    });

    return (
        <>
            <ModalFormContainer
                formProps={{ onSubmit: handleSubmit(onSubmit) }}
            >
                <ModalFormContent>
                    <ModalFormFields>
                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>Nama Ruangan</p>
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
                    </ModalFormFields>
                    <ModalFormFooter type='filter' onCancel={onCancel} />
                </ModalFormContent>
            </ModalFormContainer>
        </>
    );
};

export default FilterModal;
