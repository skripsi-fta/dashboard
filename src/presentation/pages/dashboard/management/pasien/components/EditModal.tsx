import {
    managementPatientUpdateValidation,
    type ManagementPatientUpdate,
    type ManagementPatient
} from '@/infrastructure/models/management/pasien';
import { ManagementPasienAPI } from '@/infrastructure/usecase/management/pasien/ManagementPasienAPI';
import CustomSelectComponent from '@/presentation/components/CustomSelect';
import DatePickerSingleInput from '@/presentation/components/DatePickerSingleInput';
import TextFieldInput from '@/presentation/components/TextfieldInput';
import {
    ModalFormContainer,
    ModalFormContent,
    ModalFormFields,
    ModalFormFooter
} from '@/presentation/layout/modal-form';
import { useModal } from '@/providers/ModalProvider';
import { identityTypeModal } from '@/shared/constant';
import { zodResolver } from '@hookform/resolvers/zod';
import type { AxiosError } from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

interface EditModalProps {
    refetch: () => void;
    defaultValues: ManagementPatientUpdate;
}

const EditModal = ({ defaultValues, refetch }: EditModalProps) => {
    const { control, handleSubmit } = useForm<ManagementPatientUpdate>({
        defaultValues,
        mode: 'onChange',
        resolver: zodResolver(managementPatientUpdateValidation)
    });

    const api = new ManagementPasienAPI();

    const { closeModal } = useModal();

    const { mutate: update, isLoading } = useMutation({
        mutationFn: (data: ManagementPatient.Request.Update) =>
            api.update(data),
        onSuccess: () => {
            toast.success('Sukses update pasien');
            closeModal();
            refetch();
        },
        onError: (res: AxiosError<{ message: string }>) => {
            toast.error(res.response?.data.message ?? 'Update pasien error');
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
                                Jenis Kelamin
                            </p>
                            <Controller
                                control={control}
                                name='gender'
                                render={({
                                    field: { ref, ...field },
                                    fieldState: { error }
                                }) => (
                                    <CustomSelectComponent
                                        {...field}
                                        placeholder='Pilih Jenis Kelamin'
                                        data={[
                                            {
                                                label: 'Laki - Laki',
                                                value: 'MALE'
                                            },
                                            {
                                                label: 'Perempuan',
                                                value: 'FEMALE'
                                            }
                                        ]}
                                        error={error}
                                    />
                                )}
                            />
                        </div>

                        <DatePickerSingleInput
                            control={control}
                            name='dateOfBirth'
                            label='Tanggal Lahir'
                        />

                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>
                                Alamat
                            </p>
                            <Controller
                                control={control}
                                name='address'
                                render={({ field, fieldState: { error } }) => (
                                    <TextFieldInput
                                        {...field}
                                        placeholder='Masukkan alamat'
                                        error={error}
                                        variant='modal'
                                    />
                                )}
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>
                                Tipe Identitas
                            </p>
                            <Controller
                                control={control}
                                name='idType'
                                render={({
                                    field: { ref, ...field },
                                    fieldState: { error }
                                }) => (
                                    <CustomSelectComponent
                                        {...field}
                                        placeholder='Pilih Tipe Identitas'
                                        data={identityTypeModal}
                                        error={error}
                                    />
                                )}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>
                                Nomor Identitas
                            </p>
                            <Controller
                                control={control}
                                name='idNumber'
                                render={({ field, fieldState: { error } }) => (
                                    <TextFieldInput
                                        {...field}
                                        placeholder='Masukkan Nomor Identitas'
                                        error={error}
                                        variant='modal'
                                        type='number'
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
