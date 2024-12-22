import {
    checkInAppointmentDoctorValidation,
    type CheckInAppointmentDoctorValidation,
    type DoctorAppointment
} from '@/infrastructure/models/doctor/janjitemu';
import { DoctorAppointmentAPI } from '@/infrastructure/usecase/doctor/janjitemu/DoctorAppointmentAPI';
import dayjsUtils from '@/lib/dayjs';
import { cn } from '@/lib/utils';
import CustomButtonComponent from '@/presentation/components/CustomButton';
import TextFieldInput from '@/presentation/components/TextfieldInput';
import {
    ModalFormContainer,
    ModalFormContent,
    ModalFormFields,
    ModalFormFooter
} from '@/presentation/layout/modal-form';
import { Textarea } from '@/presentation/ui/textarea';
import { useModal } from '@/providers/ModalProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import type { AxiosError } from 'axios';
import { X } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

interface CheckPatientModalType {
    data: DoctorAppointment.Response.ListData;
    refetch2: () => void;
    refetch: () => void;
}

const CheckPatientModal = ({
    data,
    refetch,
    refetch2
}: CheckPatientModalType) => {
    const api = new DoctorAppointmentAPI();

    const { closeModal } = useModal();

    const { control, handleSubmit, watch, setValue } =
        useForm<CheckInAppointmentDoctorValidation>({
            defaultValues: {
                appointmentId: data.id,
                diagnosis: '',
                notes: '',
                resepDokter: ['']
            },
            mode: 'onChange',
            resolver: zodResolver(checkInAppointmentDoctorValidation)
        });

    const resepDokter = watch('resepDokter');

    const { mutate: change, isLoading } = useMutation({
        mutationFn: (data: DoctorAppointment.Request.CheckIn) =>
            api.checkIn(data),
        onSuccess: () => {
            toast.success('Sukses memeriksa pasien');
            refetch();
            refetch2();
            closeModal();
        },
        onError: (res: AxiosError<{ message: string }>) => {
            toast.error(
                res.response?.data.message ?? 'Check Appointment Gagal'
            );
        }
    });

    return (
        <>
            <ModalFormContainer
                formProps={{ onSubmit: handleSubmit((e) => change(e)) }}
            >
                <ModalFormContent>
                    <ModalFormFields>
                        <div className='flex w-full flex-row gap-2'>
                            <div className='flex flex-1 flex-col gap-2'>
                                <p className='text-base font-bold text-[#666666]'>
                                    Kode Booking
                                </p>
                                <p className='text-lg font-bold'>
                                    {data.bookingCode}
                                </p>
                            </div>
                            <div className='flex flex-1 flex-col gap-2'>
                                <p className='text-base font-bold text-[#666666]'>
                                    Tanggal Lahir
                                </p>
                                <p className='text-lg font-bold'>
                                    {dayjsUtils(
                                        data.patient.dateOfBirth,
                                        'YYYY-MM-DD'
                                    ).format('DD MMMM YYYY')}
                                </p>
                            </div>
                        </div>

                        <div className='flex flex-1 flex-col gap-2'>
                            <p className='text-base font-bold text-[#666666]'>
                                Keluhan
                            </p>
                            <p className='text-lg font-bold'>
                                {data.medicalRecord.illness}
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>
                                Diagnosis
                            </p>
                            <Controller
                                control={control}
                                name='diagnosis'
                                render={({ field, fieldState: { error } }) => (
                                    <div
                                        className={cn(
                                            'flex flex-1 flex-col gap-2'
                                        )}
                                    >
                                        <Textarea
                                            {...field}
                                            className={cn(
                                                '',
                                                !!error?.message &&
                                                    'border-red-500'
                                            )}
                                            type='modal'
                                            placeholder='Masukkan Diagnosis'
                                        />
                                        {!!error?.message && (
                                            <p className='mt-1 text-xs font-bold text-red-500'>
                                                {error.message}
                                            </p>
                                        )}
                                    </div>
                                )}
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>
                                Resep
                            </p>

                            {resepDokter.map((d, i) => (
                                <div
                                    key={i}
                                    className='flex w-full flex-row items-center'
                                >
                                    <TextFieldInput
                                        placeholder='Masukkan Resep'
                                        variant='modal'
                                        fullWidth
                                        className='flex-1'
                                        type='text'
                                        value={d}
                                        onChange={(e) => {
                                            setValue(
                                                'resepDokter',
                                                resepDokter.map((d, index) =>
                                                    i === index
                                                        ? e.target.value
                                                        : d
                                                )
                                            );
                                        }}
                                    />
                                    <X
                                        className={cn(
                                            'w-[50px] text-primaryblue',
                                            resepDokter.length === 1
                                                ? 'cursor-not-allowed opacity-70'
                                                : 'cursor-pointer'
                                        )}
                                        onClick={() => {
                                            if (resepDokter.length !== 1) {
                                                setValue(
                                                    'resepDokter',
                                                    resepDokter.filter(
                                                        (d, index) =>
                                                            index !== i
                                                    )
                                                );
                                            }
                                        }}
                                    />
                                </div>
                            ))}

                            <CustomButtonComponent
                                variant={'addButton'}
                                onClick={() => {
                                    setValue('resepDokter', [
                                        ...resepDokter,
                                        ''
                                    ]);
                                }}
                            >
                                Tambah Resep
                            </CustomButtonComponent>
                            {/* <Controller
                                control={control}
                                name='resepDokter'
                                render={({ field, fieldState: { error } }) => (
                                    <TextFieldInput
                                        {...field}
                                        placeholder='Masukkan Catatan'
                                        error={error}
                                        variant='modal'
                                        type='text'
                                    />
                                )}
                            /> */}
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-[#666666]'>
                                Catatan
                            </p>
                            <Controller
                                control={control}
                                name='notes'
                                render={({ field, fieldState: { error } }) => (
                                    <TextFieldInput
                                        {...field}
                                        placeholder='Masukkan Catatan'
                                        error={error}
                                        variant='modal'
                                        type='text'
                                    />
                                )}
                            />
                        </div>
                    </ModalFormFields>
                    <ModalFormFooter
                        type='Selesai Diperiksa'
                        loading={isLoading}
                    />
                </ModalFormContent>
            </ModalFormContainer>
        </>
    );
};

export default CheckPatientModal;
