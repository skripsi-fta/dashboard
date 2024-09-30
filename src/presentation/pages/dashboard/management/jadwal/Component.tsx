'use client';

import { cn } from '@/lib/utils';
import DashboardContent from '@/presentation/layout/dashboard/content';
import DashboardHeader from '@/presentation/layout/dashboard/header';
import { Button } from '@/presentation/ui/button';
import { useState } from 'react';
import ScheduleRegulerManagementComponent from './reguler/Component';
import CalendarSchedule from './components/CalendarSchedule';

const ScheduleManagementComponent = () => {
    const [stepper, setStepper] = useState<'reguler' | 'fixed'>('reguler');

    return (
        <>
            <DashboardContent>
                <DashboardHeader title='Jadwal Dokter' />

                <div className='flex flex-row gap-8 items-center'>
                    <Button
                        variant={'ghost'}
                        onClick={() => setStepper(() => 'reguler')}
                        className={cn(
                            'hover:bg-primaryblue hover:text-white',
                            stepper === 'reguler' && 'bg-primaryblue text-white'
                        )}
                    >
                        Jadwal Reguler
                    </Button>
                    <Button
                        variant={'ghost'}
                        onClick={() => setStepper(() => 'fixed')}
                        className={cn(
                            'hover:bg-primaryblue hover:text-white',
                            stepper === 'fixed' && 'bg-primaryblue text-white'
                        )}
                    >
                        Jadwal Tetap
                    </Button>
                </div>
            </DashboardContent>

            <div className='flex min-w-full flex-col gap-8 lg:flex-row'>
                <div className='lg:flex-[7] xl:flex-[8]'>
                    {stepper === 'reguler' && (
                        <ScheduleRegulerManagementComponent />
                    )}
                </div>
                <div className='lg:flex-[5] xl:flex-[4]'>
                    <CalendarSchedule />
                </div>
            </div>
        </>
    );
};

export default ScheduleManagementComponent;
