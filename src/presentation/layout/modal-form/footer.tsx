import CustomButtonComponent from '@/presentation/components/CustomButton';
import { useModal } from '@/providers/ModalProvider';

interface FormFooterType {
    onCancel?: () => void;
    type: 'filter' | 'add' | 'edit';
    loading?: boolean;
}

export const ModalFormFooter = ({
    type,
    loading,
    onCancel
}: FormFooterType) => {
    const { closeModal } = useModal();

    return (
        <div className='flex w-full flex-row gap-4'>
            <CustomButtonComponent
                className='w-full flex-1 text-black'
                variant={'ghost'}
                onClick={onCancel ?? closeModal}
            >
                {type === 'filter' ? 'Hapus Filter' : 'Cancel'}
            </CustomButtonComponent>

            <CustomButtonComponent
                className='w-full flex-1 capitalize'
                variant={'addButton'}
                disabled={loading}
                loading={loading}
                type='submit'
            >
                {type === 'filter' ? 'Terapkan' : `${type} Data`}
            </CustomButtonComponent>
        </div>
    );
};
