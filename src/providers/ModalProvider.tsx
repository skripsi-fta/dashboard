import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/presentation/ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import React, {
    createContext,
    useContext,
    useState,
    type ReactNode
} from 'react';

interface DialogParams {
    title?: string;
    disableClickOutside?: boolean;
    closeButtonVisible?: boolean;
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
                <VisuallyHidden>
                    <DialogHeader>
                        <DialogTitle>
                            {dialogParams?.title ?? 'header'}
                        </DialogTitle>
                        <DialogDescription>
                            {dialogParams?.title ?? 'header'}
                        </DialogDescription>
                    </DialogHeader>
                </VisuallyHidden>
                <DialogContent
                    onInteractOutside={(e) => {
                        if (dialogParams?.disableClickOutside) {
                            e.preventDefault();
                        }
                    }}
                    closeButtonVisible={dialogParams?.closeButtonVisible}
                    className='max-h-[94vh] w-full md:h-auto flex flex-col'
                >
                    {loaded && (
                        <>
                            {dialogParams?.title && (
                                <h3 className='text-2xl font-bold'>
                                    {dialogParams?.title}
                                </h3>
                            )}
                            <div className='flex-1 overflow-y-auto'>
                                {content}
                            </div>
                        </>
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
