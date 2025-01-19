import type { ManagementRegulerScheduleApproval } from '@/infrastructure/models/management/schedule/reguler';
import { ManagementScheduleAPI } from '@/infrastructure/usecase/management/schedule/ManagementScheduleAPI';
import { cn } from '@/lib/utils';
import CustomButtonComponent from '@/presentation/components/CustomButton';
import { useModal } from '@/providers/ModalProvider';
import type { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

interface CancelModal {
    scheduleId: number;
    action: 'reject' | 'approve' | 'cancel';
    refetch: () => void;
}

const CancelModal = ({ action, refetch, scheduleId }: CancelModal) => {
    const managementScheduleAPI = new ManagementScheduleAPI();

    const { closeModal } = useModal();

    const { mutate: cancel, isLoading: loadingCancel } = useMutation({
        mutationFn: (data: ManagementRegulerScheduleApproval) =>
            managementScheduleAPI.approvalSchedule(data),
        onSuccess: () => {
            toast.success('Sukses cancel jadwal');
            closeModal();
            refetch();
        },
        onError: (res: AxiosError<{ message: string }>) => {
            toast.error(res.response?.data.message ?? 'Gagal cancel jadwal');
        }
    });

    return (
        <>
            <div className='flex flex-col items-center gap-6'>
                <p className='mt-4 text-center text-2xl font-bold'>
                    Apakah anda yakin ingin cancel jadwal?
                </p>

                <p className='text-center text-base font-medium'>
                    Semua daftar janji temu dengan pasien akan dibatalkan dan
                    perubahan ini tidak bisa dikembalikan!
                </p>

                <div className='flex w-full flex-row gap-4'>
                    <CustomButtonComponent
                        className='w-full flex-1 text-black'
                        variant={'ghost'}
                        onClick={closeModal}
                    >
                        Tidak
                    </CustomButtonComponent>

                    <CustomButtonComponent
                        className={cn(
                            'w-full flex-1 capitalize',
                            action === 'approve'
                                ? 'bg-green-500 hover:bg-green-500/70'
                                : 'bg-red-500 hover:bg-red-500/70'
                        )}
                        variant={'addButton'}
                        disabled={loadingCancel}
                        loading={loadingCancel}
                        onClick={() =>
                            cancel({ action, id: scheduleId, roomId: 0 })
                        }
                    >
                        Ya
                    </CustomButtonComponent>
                </div>
            </div>
        </>
    );
};

export default CancelModal;
