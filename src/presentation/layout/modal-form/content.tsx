import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';

interface ModalFormContainerProps
    extends React.HTMLAttributes<HTMLDivElement> {}

export const ModalFormContent = forwardRef<
    HTMLDivElement,
    ModalFormContainerProps
>(({ children, className, ...rest }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-6', className)} {...rest}>
        {children}
    </div>
));

ModalFormContent.displayName = 'div';
