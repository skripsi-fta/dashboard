import type { ManagementCashier } from '@/infrastructure/models/management/cashier';
import { ManagementCashierAPI } from '@/infrastructure/usecase/cashier/ManagementCashierAPI';
import { formatRupiah } from '@/lib/utils';
import {
    ModalFormContainer,
    ModalFormContent,
    ModalFormFooter
} from '@/presentation/layout/modal-form';
import { useModal } from '@/providers/ModalProvider';
import type { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

interface PaymentPatientModalType {
    data: ManagementCashier.Response.Data;
    refetch: () => void;
    refetch2: () => void;
}

const PaymentPatientModal = ({
    data,
    refetch,
    refetch2
}: PaymentPatientModalType) => {
    const { handleSubmit } = useForm<ManagementCashier.Response.Data>({
        defaultValues: data,
        mode: 'onChange'
    });

    const api = new ManagementCashierAPI();

    const { closeModal } = useModal();

    const { mutate: update, isLoading } = useMutation({
        mutationFn: (data: ManagementCashier.Request.Payment) =>
            api.payment(data),
        onSuccess: () => {
            toast.success('Pembayaran pasien sukses');
            closeModal();
            refetch();
            refetch2();
        },
        onError: (res: AxiosError<{ message: string }>) => {
            toast.error(res.response?.data.message ?? 'Update pasien error');
        }
    });

    return (
        <>
            <ModalFormContainer
                formProps={{
                    onSubmit: handleSubmit((e) =>
                        update({ bookingId: data.id })
                    )
                }}
            >
                <ModalFormContent>
                    <div className='mb-4 flex flex-col gap-2'>
                        <div className='flex flex-row gap-2'>
                            <div className='flex flex-1 flex-col gap-2'>
                                <p className='text-base font-bold text-[#666666]'>
                                    Kode Booking
                                </p>
                                <p className='text-base font-bold'>
                                    {data.bookingCode}
                                </p>
                                <p className='text-base font-bold text-[#666666]'>
                                    Nama Pasien
                                </p>
                                <p className='text-base font-bold'>
                                    {data.patient.name}
                                </p>
                                <p className='text-base font-bold text-[#666666]'>
                                    Ruangan
                                </p>
                                <p className='text-base font-bold'>
                                    {data.schedule.room.name}
                                </p>
                            </div>
                            <div className='flex flex-1 flex-col gap-2'>
                                <p className='text-base font-bold text-[#666666]'>
                                    Nama Dokter
                                </p>
                                <p className='text-base font-bold'>
                                    {data.schedule.doctor.name}
                                </p>
                                <p className='text-base font-bold text-[#666666]'>
                                    Poli
                                </p>
                                <p className='text-base font-bold'>
                                    {data.schedule.doctor.specialization.name}
                                </p>
                                <p className='text-base font-bold text-[#666666]'>
                                    Tanggal
                                </p>
                                <p className='text-base font-bold'>
                                    {data.schedule.date}
                                </p>
                            </div>
                        </div>
                        <div className='my-2 w-full border-t border-gray-300'></div>
                        <div className='flex w-full flex-col gap-2'>
                            <p className='text-lg font-bold text-[#666666]'>
                                Detail Transaksi
                            </p>
                            <p className='text-base'>
                                Biaya Konsultasi:{' '}
                                <b>
                                    {formatRupiah(
                                        data.schedule.doctor.consulePrice
                                    )}
                                </b>
                            </p>
                            <p className='text-base'>
                                Biaya Pharmasi:{' '}
                                <b>{formatRupiah(Number(data.pharmacyFee))}</b>
                            </p>
                            <p className='text-base'>
                                Total Pembayaran:{' '}
                                <b>
                                    {formatRupiah(
                                        Number(
                                            Number(data.pharmacyFee) +
                                                data.schedule.doctor
                                                    .consulePrice
                                        )
                                    )}
                                </b>
                            </p>
                        </div>
                    </div>
                </ModalFormContent>
                <ModalFormFooter type='Payment' loading={isLoading} />
            </ModalFormContainer>
        </>
    );
};

export default PaymentPatientModal;
