import {
    managementFixedScheduleUpdateValidation,
    type ManagementFixedScheduleUpdate,
    type ManagementFixedScheduleDoctor
} from '@/infrastructure/models/management/schedule/fixed';
import { ManagementDoctorProfileAPI } from '@/infrastructure/usecase/management/doctorprofile/ManagementDoctorProfileAPI';
import { ManagementRuanganAPI } from '@/infrastructure/usecase/management/ruangan/ManagementRuanganAPI';
import { ManagementScheduleAPI } from '@/infrastructure/usecase/management/schedule/ManagementScheduleAPI';
import CustomSelectComponent from '@/presentation/components/CustomSelect';
import CustomSelectInput from '@/presentation/components/CustomSelectInput';
import TextFieldInput from '@/presentation/components/TextfieldInput';
import {
    ModalFormContainer,
    ModalFormContent,
    ModalFormFields,
    ModalFormFooter
} from '@/presentation/layout/modal-form';
import { Checkbox } from '@/presentation/ui/checkbox';
import { Label } from '@/presentation/ui/label';
import { useModal } from '@/providers/ModalProvider';
import { dayDropdownData } from '@/shared/constant';
import { zodResolver } from '@hookform/resolvers/zod';
import type { AxiosError } from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';
import NoticeModal from './NoticeModal';

interface EditModalProps {
    refetch: () => void;
    defaultValues: ManagementFixedScheduleUpdate;
}

const EditModal = ({ refetch, defaultValues }: EditModalProps) => {
    const { control, handleSubmit, trigger } =
        useForm<ManagementFixedScheduleUpdate>({
            defaultValues,
            mode: 'onChange',
            resolver: zodResolver(managementFixedScheduleUpdateValidation)
        });

    const api = new ManagementScheduleAPI();

    const doctorAPI = new ManagementDoctorProfileAPI();

    const roomAPI = new ManagementRuanganAPI();

    const { closeModal, openModal } = useModal();

    const { mutate: edit, isLoading } = useMutation({
        mutationFn: (data: ManagementFixedScheduleDoctor.Request.Update) =>
            api.updateFixedSchedule(data),
        onSuccess: (data) => {
            closeModal();

            console.log(data);

            if (
                data.data.skippedSchedule &&
                data.data.skippedSchedule.length !== 0
            ) {
                console.log(data.data);
                openModal(
                    <NoticeModal
                        title='Sukses Mengubah Jadwal'
                        body={`${data.data.skippedSchedule.length} Jadwal tidak terbuat karena saat hari tersebut ada jadwal dengan ruangan dan jam yang sama`}
                        list={data.data?.skippedSchedule ?? []}
                        listChange={data.data?.changedSchedule ?? []}
                    />,
                    {}
                );
            } else {
                toast.success('Sukses mengubah jadwal');
            }

            refetch();
        },
        onError: (res: AxiosError<{ message: string }>) => {
            toast.error(
                res.response?.data.message ?? 'Mengubah jadwal tetap error'
            );
        }
    });

    const { data: doctorData, isLoading: doctorLoading } = useQuery({
        queryKey: ['doctor-dropdown-data'],
        queryFn: () => doctorAPI.getDropdown()
    });

    const { data: roomData, isLoading: roomLoading } = useQuery({
        queryKey: ['room-dropdown-data'],
        queryFn: () => roomAPI.getDropdown()
    });

    return (
        <ModalFormContainer
            formProps={{ onSubmit: handleSubmit((e) => edit(e)) }}
        >
            <ModalFormContent>
                <ModalFormFields>
                    <div className='flex flex-col gap-2'>
                        <p className='font-semibold text-[#666666]'>Dokter</p>
                        <Controller
                            control={control}
                            name='doctorId'
                            render={({
                                field: { ref, ...field },
                                fieldState: { error }
                            }) => (
                                <CustomSelectInput
                                    {...field}
                                    placeholder='Pilih Dokter'
                                    data={doctorData?.data ?? []}
                                    loading={doctorLoading}
                                    noDataNotice='Dokter tidak ditemukan'
                                    error={error}
                                    disabled
                                />
                            )}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='font-semibold text-[#666666]'>Ruangan</p>
                        <Controller
                            control={control}
                            name='roomId'
                            render={({
                                field: { ref, ...field },
                                fieldState: { error }
                            }) => (
                                <CustomSelectInput
                                    {...field}
                                    placeholder='Pilih Ruangan'
                                    data={roomData?.data ?? []}
                                    loading={roomLoading}
                                    noDataNotice='Ruangan tidak ditemukan'
                                    error={error}
                                />
                            )}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='font-semibold text-[#666666]'>Waktu</p>
                        <div className='flex w-full flex-row justify-center gap-4'>
                            <Controller
                                control={control}
                                name='startTime'
                                render={({
                                    field: { ref, ...field },
                                    fieldState: { error }
                                }) => (
                                    <TextFieldInput
                                        {...field}
                                        placeholder='Waktu Mulai'
                                        error={error}
                                        variant='modal'
                                        type='time'
                                        fullWidth
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name='endTime'
                                render={({
                                    field: { ref, ...field },
                                    fieldState: { error }
                                }) => (
                                    <TextFieldInput
                                        {...field}
                                        placeholder='Waktu Selsai'
                                        error={error}
                                        variant='modal'
                                        type='time'
                                        fullWidth
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <p className='font-semibold text-[#666666]'>
                            Kapasitas
                        </p>
                        <Controller
                            control={control}
                            name='capacity'
                            render={({ field, fieldState: { error } }) => (
                                <TextFieldInput
                                    {...field}
                                    placeholder='Masukkan Kapasitas'
                                    error={error}
                                    variant='modal'
                                    type='number'
                                />
                            )}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <p className='font-semibold text-[#666666]'>Hari</p>
                        <Controller
                            control={control}
                            name='day'
                            render={({
                                field: { ref, ...field },
                                fieldState: { error }
                            }) => (
                                <CustomSelectComponent
                                    {...field}
                                    placeholder='Pilih Hari'
                                    data={dayDropdownData}
                                    error={error}
                                />
                            )}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <p className='font-semibold text-[#666666]'>
                            Mengganti Semua Jadwal
                        </p>
                        <Controller
                            control={control}
                            name='isOverrideSchedule'
                            render={({ field: { onChange, value } }) => (
                                <div className='flex flex-row items-center gap-4'>
                                    <Checkbox
                                        id='checkbox'
                                        checked={value}
                                        onCheckedChange={(e) => {
                                            onChange(e);
                                            trigger();
                                        }}
                                        className='size-[18px]'
                                    />
                                    <Label
                                        htmlFor='checkbox'
                                        className='text-[16px]'
                                    >
                                        Ganti Semua Jadwal
                                    </Label>
                                </div>
                            )}
                        />
                        <p className='mt-2 text-justify text-sm font-medium text-red-400'>
                            Ketika aktif, semua jadwal yang sudah terbuat akan
                            terubah sesuai dengan perubahan dari jam, kapasitas
                            dan hari yang diinput dan semua pasien akan
                            terdaftarkan secara otomatis ke jadwal tersebut.
                            <br />
                            Ketika tidak aktif, perubahan yang terbaru akan
                            terbuat di jadwal yang akan datang (bukan jadwal
                            yang lama)
                        </p>
                    </div>
                </ModalFormFields>
                <ModalFormFooter type='edit' loading={isLoading} />
            </ModalFormContent>
        </ModalFormContainer>
    );
};

export default EditModal;
