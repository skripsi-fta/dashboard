import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    type?: 'modal' | 'normal';
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ type = 'normal', className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    '',
                    type === 'modal'
                        ? 'flex min-h-[80px] w-full rounded-[16px] border-2 border-[#ECEEFF] px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground hover:border-[#DDE0FF] focus:border-[#DDE0FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                        : 'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Textarea.displayName = 'Textarea';

export { Textarea };
