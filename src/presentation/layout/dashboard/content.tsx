import { cn } from '@/lib/utils';
import type { HTMLAttributes, ReactNode } from 'react';

interface DashboardContentType {
    children: ReactNode;
    className?: string;
    props?: HTMLAttributes<HTMLDivElement>;
}

const DashboardContent = ({
    children,
    className,
    props
}: DashboardContentType) => {
    return (
        <div
            {...props}
            className={cn(
                'flex flex-col gap-8 rounded-lg bg-white p-6 shadow-md md:px-8',
                className
            )}
        >
            {children}
        </div>
    );
};

export default DashboardContent;
