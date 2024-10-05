import { Button } from '@/presentation/ui/button';
import { useModal } from '@/providers/ModalProvider';

interface NoticeModalProps {
    title: string;
    body: string;
    list: string[];
    listChange: string[];
}

const NoticeModal = ({ title, body, list, listChange }: NoticeModalProps) => {
    const { closeModal } = useModal();

    return (
        <>
            <div className='flex flex-col items-center justify-center gap-4 px-8'>
                <p className='text-center text-2xl font-bold text-black'>
                    {title}
                </p>
                <p className='text-center text-lg font-medium'>{body}</p>
                {list.length > 0 && (
                    <>
                        <div className='flex flex-col items-center justify-center gap-2'>
                            <p className='text-lg font-medium'>
                                List Jadwal Yang Tidak Terbuat
                            </p>
                            {list.map((d) => (
                                <p key={d}>{d}</p>
                            ))}
                        </div>
                    </>
                )}

                {listChange.length > 0 && (
                    <>
                        <div className='flex flex-col items-center justify-center gap-2'>
                            <p className='text-lg font-medium'>
                                List Peurbahan Jadwal
                            </p>
                            {listChange.map((d) => (
                                <p key={d}>{d}</p>
                            ))}
                        </div>
                    </>
                )}
                <Button
                    onClick={() => closeModal()}
                    className='w-full'
                    variant='addButton'
                >
                    Close
                </Button>
            </div>
        </>
    );
};

export default NoticeModal;
