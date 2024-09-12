import { type ReactNode } from 'react';

interface DashboardHeaderType {
    children?: ReactNode;
    title: string;
}

const DashboardHeader = ({ children, title }: DashboardHeaderType) => {
    return (
        <div className='flex flex-wrap items-center justify-between gap-2'>
            <p className='text-3xl font-semibold'>{title}</p>
            {children}
        </div>
    );
};

export default DashboardHeader;
