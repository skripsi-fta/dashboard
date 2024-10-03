'use client';

import { cn } from '@/lib/utils';
import DashboardContent from '@/presentation/layout/dashboard/content';
import DashboardHeader from '@/presentation/layout/dashboard/header';
import { Button } from '@/presentation/ui/button';
import { useState } from 'react';
import ScheduleRegulerManagementComponent from './reguler/Component';
import CalendarSchedule from './components/CalendarSchedule';
import ScheduleFixedManagementComponent from './fixed/Component';

const ScheduleManagementComponent = () => {
    const [stepper, setStepper] = useState<'reguler' | 'fixed'>('fixed');

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    return (
        <>
            <DashboardContent>
                <DashboardHeader title='Jadwal Dokter' />

                <div className='flex flex-row items-center gap-8'>
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

            <div className='flex w-full flex-1 flex-col-reverse gap-8 lg:flex-row'>
                <div className='min-w-0 lg:flex-[7] xl:flex-[8]'>
                    {stepper === 'reguler' && (
                        <ScheduleRegulerManagementComponent />
                    )}
                    {stepper === 'fixed' && (
                        <ScheduleFixedManagementComponent />
                    )}
                </div>
                <div className='min-w-0 lg:flex-[5] xl:flex-[4]'>
                    <CalendarSchedule
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />
                </div>
            </div>
        </>
    );
};

export default ScheduleManagementComponent;
