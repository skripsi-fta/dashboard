import type { ComponentProps, PropsWithChildren } from 'react';

export const ModalFormContainer = ({
    children,
    formProps
}: PropsWithChildren & { formProps?: ComponentProps<'form'> }) => {
    return (
        <div className='flex size-full flex-col my-2 overflow-y-auto h-full max-h-full'>
            <form {...formProps}>{children}</form>
        </div>
    );
};
