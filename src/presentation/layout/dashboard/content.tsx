import type { HTMLAttributes, ReactNode } from 'react';

interface DashboardContentType {
    children: ReactNode;
    props?: HTMLAttributes<HTMLDivElement>;
}

const DashboardContent = ({ children, props }: DashboardContentType) => {
    return (
        <div {...props} className='flex flex-col gap-8 rounded-lg px-4 py-2'>
            {children}
        </div>
    );
};

export default DashboardContent;
