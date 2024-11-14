import type { ManagementCashier } from '@/infrastructure/models/management/cashier';
import { ManagementCashierAPI } from '@/infrastructure/usecase/management/cashier/ManagementCashierAPI';
import { ModalFormContainer, ModalFormContent, ModalFormFooter } from '@/presentation/layout/modal-form';
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


const PaymentPatientModal = ({ data, refetch, refetch2 }: PaymentPatientModalType) => {
    const { control, handleSubmit } = useForm<ManagementCashier.Response.Data>({
        defaultValues: data,
        mode: 'onChange',
    });

    const api = new ManagementCashierAPI();

    const { closeModal } = useModal();

    const { mutate: update, isLoading } = useMutation({
        mutationFn: (data: ManagementCashier.Request.Payment) =>
            api.payment(data),
        onSuccess: () => {
            toast.success('Sukses');
            closeModal();
            refetch();
            refetch2();
        },
        onError: (res: AxiosError<{ message: string }>) => {
            toast.error(res.response?.data.message ?? 'Update pasien error');
        }
    });

    console.log(data);
    return (
        <>
        <ModalFormContainer
            formProps={{ onSubmit: handleSubmit((e) => update({ bookingId: data.id })) }}
        >
            <ModalFormContent>
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-row gap-2'>
                        <div className='flex-1 flex-col gap-2'>
                            <p className='text-base font-bold text-[#666666]'>
                                Kode Booking
                            </p>
                            <p className='text-lg font-bold'>
                                {data.bookingCode}
                            </p>
                            <p className='text-base font-bold text-[#666666]'>
                                Nama Pasien
                            </p>
                            <p className='text-lg font-bold'>
                                {data.patient.name}
                            </p>
                            <p className='text-base font-bold text-[#666666]'>
                                Ruangan
                            </p>
                            <p className='text-lg font-bold'>
                                {data.schedule.room.name}
                            </p>
                        </div>
                        <div className='flex-1 flex-col gap-2'>
                            <p className='text-base font-bold text-[#666666]'>
                                Nama Dokter
                            </p>
                            <p className='text-lg font-bold'>
                                {data.schedule.doctor.name}
                            </p>
                            <p className='text-base font-bold text-[#666666]'>
                                Poli
                            </p>
                            <p className='text-lg font-bold'>
                                {data.schedule.doctor.specialization.name}
                            </p>
                            <p className='text-base font-bold text-[#666666]'>
                                Tanggal
                            </p>
                            <p className='text-lg font-bold'>
                                {data.schedule.date}
                            </p>
                        </div>
                    </div>
                    <div className='w-full border-t border-gray-300 my-2'></div>
                    <div className='flex w-full flex-col gap-2'>
                        <p className='text-base font-bold text-[#666666]'>
                            Detail Transaksi
                        </p>
                        <p className='text-lg'>
                                Biaya Konsultasi: <b>Rp. {Number(data.consultationFee)},00</b>
                        </p>
                        <p className='text-lg'>
                                Biaya Pharmasi: <b>Rp. {Number(data.pharmacyFee)},00</b>
                        </p>
                        <p className='text-lg'>
                                Total Pembayaran: <b>Rp. {Number(data.consultationFee) + Number(data.pharmacyFee)},00</b>
                        </p>
                    </div>
                    <ModalFormFooter type='Payment' loading={isLoading} />
                </div>
            </ModalFormContent>
        </ModalFormContainer>
        </>
    );
};

export default PaymentPatientModal;