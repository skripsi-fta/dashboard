import { type ManagementRuangan } from '@/infrastructure/models/management/ruangan';
import { ManagementRuanganAPI } from '@/infrastructure/usecase/management/ruangan/ManagementRuanganAPI';
import CustomButtonComponent from '@/presentation/components/CustomButton';
import { useModal } from '@/providers/ModalProvider';
import type { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

interface DeleteModal {
    refetch: () => void;
    data: ManagementRuangan.Response.Data;
}

const DeleteModal = ({ data, refetch }: DeleteModal) => {
    const api = new ManagementRuanganAPI();

    const { closeModal } = useModal();

    const { mutate, isLoading } = useMutation({
        mutationFn: () => api.delete({ id: data.id }),
        onSuccess: () => {
            toast.success('Hapus ruangan sukses');
            closeModal();
            refetch();
        },
        onError: (res: AxiosError<{ message: string }>) => {
            toast.error(res.response?.data?.message ?? 'Hapus ruangan error');
        }
    });

    return (
        <>
            <div className='flex flex-col gap-4'>
                <p className='text-xl font-semibold text-center'>
                    Apakah anda yakin ingin menghapus ruangan
                    <span className='font-bold'> {data.name}</span>?
                </p>
                <p className='text-center'>
                    Ruangan yang dihapus tidak bisa dikembalikan!
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
