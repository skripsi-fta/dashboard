'use client';

import useDashboard from '@/contexts/DashboardContext';
import dayjsUtils from '@/lib/dayjs';
import { useEffect, useState } from 'react';

export default function Page() {
    const { userData } = useDashboard();

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className='flex h-full flex-col items-center justify-center'>
                <div className='flex max-w-[400px] flex-col items-center gap-4 rounded-lg bg-white p-4 px-8 shadow-lg'>
                    <p className='text-xl font-bold'>Hi, {userData?.name}</p>
                    <p className='text-base font-semibold'>
                        {dayjsUtils(time).format(
                            'dddd, DD MMMM YYYY, h:mm:ss A'
                        )}
                    </p>
                </div>
            </div>
        </>
    );
}
