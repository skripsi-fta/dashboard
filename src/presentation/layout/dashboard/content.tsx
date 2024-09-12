import type { HTMLAttributes, ReactNode } from 'react';

interface DashboardContentType {
    children: ReactNode;
    props?: HTMLAttributes<HTMLDivElement>;
}

const DashboardContent = ({ children, props }: DashboardContentType) => {
    return (
        <div
            {...props}
            className='flex flex-col gap-8 rounded-lg bg-white p-8 shadow-md md:px-8'
        >
            {children}
        </div>
    );
};

export default DashboardContent;
