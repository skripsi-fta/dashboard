'use client';

import useDashboard from '@/contexts/DashboardContext';
import http from '@/lib/axios';
import dayjsUtils from '@/lib/dayjs';
import { Button } from '@/presentation/ui/button';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';

export default function Page() {
    const { userData } = useDashboard();

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const { mutate } = useMutation({
        mutationFn: async () => {
            const data = await http.get('/auth/profile');

            console.log(data.data);
        }
    });

    return (
        <>
            <div className='flex h-full flex-col items-center justify-center'>
                <div className='flex max-w-[400px] flex-col items-center gap-4 rounded-lg bg-white p-4 px-8 shadow-lg'>
                    <p className='text-xl font-bold'>Hi, {userData?.name}</p>
                    <p className='text-lg font-semibold'>
                        Today is {dayjsUtils(time).format('dddd')}
                    </p>
                    <p className='text-base font-semibold'>
                        {dayjsUtils(time).format('DD MMMM YYYY, h:mm:ss A')}
                    </p>

                    <Button onClick={() => mutate()}>tes</Button>
                </div>
            </div>
        </>
    );
}
