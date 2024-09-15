import type { ManagementStaff } from '@/infrastructure/models/management/staff';
import { ManagementStaffAPI } from '@/infrastructure/usecase/management/staff/ManagementStaffAPI';
import CustomButtonComponent from '@/presentation/components/CustomButton';
import { useModal } from '@/providers/ModalProvider';
import type { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

interface DeleteModalProps {
    refetch: () => void;
    data: ManagementStaff.Response.Data;
}

const DeleteModal = ({ data, refetch }: DeleteModalProps) => {
    const api = new ManagementStaffAPI();

    const { closeModal } = useModal();

    const { mutate, isLoading } = useMutation({
        mutationFn: () => api.deleteStaff(data.id),
        onSuccess: () => {
            toast.success('Hapus staff sukses');
            closeModal();
            refetch();
        },
        onError: (res: AxiosError<{ message: string }>) => {
            toast.error(res.response?.data?.message ?? 'Hapus staff error');
        }
    });

    return (
        <>
            <div className='flex flex-col gap-4'>
                <p className='text-xl font-semibold text-center'>
                    Apakah anda yakin ingin menghapus staff
                    <span className='font-bold'> {data.name}</span>?
                </p>
                <p className='text-center'>
                    Akun yang dihapus tidak bisa dikembalikan!
                </p>

                <div className='flex w-full flex-row gap-4'>
                    <CustomButtonComponent
                        className='w-full flex-1 text-black'
                        variant={'ghost'}
                        onClick={closeModal}
                    >
                        Batal
                    </CustomButtonComponent>

                    <CustomButtonComponent
                        className='w-full flex-1 capitalize'
                        variant={'addButton'}
                        disabled={isLoading}
                        loading={isLoading}
                        type='button'
                        onClick={() => mutate()}
                    >
                        Hapus
                    </CustomButtonComponent>
                </div>
            </div>
        </>
    );
};

export default DeleteModal;
