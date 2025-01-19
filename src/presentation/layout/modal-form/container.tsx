import type { ComponentProps, PropsWithChildren } from 'react';

export const ModalFormContainer = ({
    children,
    formProps
}: PropsWithChildren & { formProps?: ComponentProps<'form'> }) => {
    return (
        <div className='my-2 flex size-full h-full max-h-full flex-col overflow-y-auto'>
            <form {...formProps}>{children}</form>
        </div>
    );
};
