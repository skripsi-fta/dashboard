import { Dialog, DialogContent } from '@/presentation/ui/dialog';
import React, {
    createContext,
    useContext,
    useState,
    type ReactNode
} from 'react';

interface DialogParams {
    title: string;
    disableClickOutside?: boolean;
}

interface DialogContextType {
    openModal: (_content: ReactNode, _params: DialogParams) => void;
    closeModal: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: React.FC<{ children: ReactNode }> = ({
    children
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const [content, setContent] = useState<ReactNode | null>(null);

    const [dialogParams, setDialogParams] = useState<
        DialogParams | undefined
    >();

    const [loaded, setLoaded] = useState<boolean>(false);

    const openModal = (dialogContent: ReactNode, params: DialogParams) => {
        setContent(() => dialogContent);
        setIsOpen(() => true);

        setDialogParams(() => params);

        setLoaded(() => true);
    };

    const closeModal = () => {
        setIsOpen(() => false);
        setContent(() => null);
        setLoaded(() => false);
    };

    return (
        <DialogContext.Provider value={{ openModal, closeModal }}>
            {children}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent
                    onInteractOutside={(e) => {
                        if (dialogParams?.disableClickOutside) {
                            e.preventDefault();
                        }
                    }}
                >
                    {loaded && (
                        <div className='flex flex-col gap-4'>
                            <h3 className='text-2xl font-bold'>
                                {dialogParams?.title}
                            </h3>
                            {content}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </DialogContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(DialogContext);

    if (context === undefined) {
        throw new Error('useModal must be used within a DialogProvider');
    }
    return context;
};
