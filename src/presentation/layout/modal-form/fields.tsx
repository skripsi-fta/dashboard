import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';

interface ModalFormFieldsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ModalFormFields = forwardRef<HTMLDivElement, ModalFormFieldsProps>(
    ({ children, className, ...rest }, ref) => (
        <div
            ref={ref}
            className={cn('flex flex-col gap-4', className)}
            {...rest}
        >
            {children}
        </div>
    )
);

ModalFormFields.displayName = 'div';
