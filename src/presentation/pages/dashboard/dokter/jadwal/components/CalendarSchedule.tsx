import { useCallback, useState } from 'react';
import dayjsUtils from '@/lib/dayjs';
import { cn } from '@/lib/utils';
import DashboardContent from '@/presentation/layout/dashboard/content';
import { Button, buttonVariants } from '@/presentation/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/presentation/ui/select';
import { ChevronLeft, ChevronRight, Loader2, MapPin } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import { DayPicker } from 'react-day-picker';
import { useQuery } from 'react-query';
import { ManagementScheduleAPI } from '@/infrastructure/usecase/management/schedule/ManagementScheduleAPI';
import useDashboard from '@/contexts/DashboardContext';
import type { Profile } from '@/infrastructure/models/auth/profile';

export default function CalendarSchedule() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const today = new Date();

    const modifiers = {
        today: today,
        selected: selectedDate
    };

    const modifiersStyles = {
        today: {
            fontWeight: 'bold',
            fontSize: '120%',
            color: 'white',
            border: '2px solid #3B41E3'
        },
        selected: {
            backgroundColor: '#3B41E3',
            color: 'white',
            border: '2px solid #3B41E3'
        }
    };

    const handleDayClick = useCallback(
        (day: Date) => {
            setSelectedDate(day);
        },
        [setSelectedDate]
    );

    const api = new ManagementScheduleAPI();

    const { userData } = useDashboard();

    const doctorData = userData as Profile.DoctorRole;

    const { data, isLoading } = useQuery({
        queryKey: [
            'schedule-calendar-list-doctor',
            dayjsUtils(selectedDate).format('DD-MM-YYYY'),
            doctorData?.doctor.id
        ],
        queryFn: () =>
            api.getScheduleList({
                date: dayjsUtils(selectedDate).format('YYYY-MM-DD'),
                doctorId: doctorData!.doctor.id.toString(),
                endTime: '',
                roomId: '',
                startTime: '',
                pageNumber: 1,
                pageSize: 1000,
                status: 'ready',
                startDate: '',
                endDate: ''
            }),
        enabled: !!doctorData.doctor
    });

    return (
        <DashboardContent props={{ className: 'min-h-full h-full' }}>
            <DayPicker
                selected={selectedDate}
                onDayClick={handleDayClick}
                showOutsideDays={true}
                className={cn('p-3')}
                ISOWeek
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
                classNames={{
                    months: 'flex w-full flex-col space-y-4 flex-1',
                    month: 'space-y-4 w-full flex flex-col',
                    table: 'w-full h-full border-collapse space-y-1',
                    head_row: '',
                    row: 'w-full mt-2',
                    month_caption:
                        'flex justify-center pt-1 relative items-center',
                    caption_label: 'text-sm font-medium',
                    nav: 'space-x-1 flex items-center flex-row justify-between',
                    button_previous: cn(
                        buttonVariants({ variant: 'blank' }),
                        'size-8 bg-transparent p-0 hover:opacity-100'
                    ),
                    button_next: cn(
                        buttonVariants({ variant: 'blank' }),
                        'size-8 bg-transparent p-0 hover:opacity-100'
                    ),
                    weekdays:
                        'flex w-full justify-between flex-1 items-center justify-center',
                    weekday:
                        'text-muted-foreground rounded-md font-normal text-[0.8rem] flex items-center justify-center flex-1',
                    week: 'flex w-full mt-4 flex-[1]',
                    day: 'flex items-center justify-center flex-[1] h-9 text-center text-sm p-0 relative rounded-md [&:has([aria-selected].range_end)]:rounded-r-md [&:has([aria-selected].outside)]:bg-[#3B41E3]/50 [&:has([aria-selected])]:bg-[#3B41E3] first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                    day_button: cn(
                        buttonVariants({ variant: 'ghost' }),
                        'rounded-0 size-full p-0 font-normal hover:bg-[#3B41E3] hover:text-white aria-selected:opacity-100'
                    ),
                    range_end: 'range_end',
                    selected:
                        'rounded-0 flex items-center justify-center bg-[#3B41E3] text-primary-foreground hover:bg-[#3B41E3] hover:text-primary-foreground focus:bg-[#3B41E3] focus:text-primary-foreground',
                    today: 'bg-[#3B41E3]/20 text-[#3B41E3] font-bold',
                    outside:
                        'outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
                    disabled: 'text-muted-foreground opacity-50',
                    range_middle:
                        'aria-selected:bg-accent aria-selected:text-accent-foreground',
                    hidden: 'invisible'
                }}
                components={{
                    Nav: ({ nextMonth, onPreviousClick, onNextClick }) => {
                        const currentDate = dayjsUtils(nextMonth)
                            .subtract(1, 'month')
                            .format('MMMM YYYY');

                        return (
                            <div className='flex flex-row items-center justify-between'>
                                <Button
                                    className='m-0 p-0'
                                    variant={'blank'}
                                    onClick={onPreviousClick}
                                >
                                    <ChevronLeft
                                        className='size-8'
                                        color='#3B41E3'
                                    />
                                </Button>

                                <p className='text-lg font-semibold'>
                                    {currentDate}
                                </p>

                                <Button
                                    className='m-0 p-0'
                                    variant={'blank'}
                                    onClick={onNextClick}
                                >
                                    <ChevronRight
                                        className='size-8'
                                        color='#3B41E3'
                                    />
                                </Button>
                            </div>
                        );
                    },
                    Chevron: ({ orientation }) => {
                        return orientation === 'left' ? (
                            <ChevronLeft className='size-8' color='#3B41E3' />
                        ) : (
                            <ChevronRight className='size-8' color='#3B41E3' />
                        );
                    },
                    DropdownNav: ({ children, ...props }) => (
                        <div {...props} className='flex w-full flex-row gap-4'>
                            {children}
                        </div>
                    ),
                    Dropdown: ({ value, onChange, options = [] }) => {
                        const handleChange = (value: string) => {
                            onChange?.({
                                target: { value }
                            } as React.ChangeEvent<HTMLSelectElement>);
                        };

                        const selectedLabel =
                            options.find((d) => d.value === value)?.label ?? '';

                        return (
                            <Select
                                value={value?.toString()}
                                onValueChange={handleChange}
                            >
                                <SelectTrigger className='flex-1'>
                                    <SelectValue>{selectedLabel}</SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {options.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={`${option.value}`}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        );
                    }
                }}
                captionLayout='dropdown'
                mode='single'
                autoFocus
            />

            <div className='flex flex-col gap-4'>
                <div className='flex flex-row items-center justify-between'>
                    <p className='text-xl font-bold'>Jadwal</p>
                    <p className='text-foreground/70'>
                        {dayjsUtils(selectedDate).format('DD MMM YYYY')}
                    </p>
                </div>
                <div className='flex flex-col gap-2'>
                    {isLoading ? (
                        <Loader2 className='mx-auto size-6 animate-spin' />
                    ) : (
                        <>
                            {data?.data.length === 0 ? (
                                <>
                                    <p className='text-center font-bold'>
                                        Tidak Ada Jadwal
                                    </p>
                                </>
                            ) : (
                                <>
                                    {data?.data.map((d) => (
                                        <div
                                            className='flex flex-row items-center justify-between p-4 shadow-xl'
                                            key={d.id}
                                        >
                                            <div className='flex flex-col gap-3'>
                                                <div className='flex flex-row items-center gap-2'>
                                                    <MapPin color='#3B41E3' />
                                                    <p className='font-bold text-[#3B41E3]'>
                                                        {d.room.name}
                                                    </p>
                                                </div>

                                                <p className='font-bold'>
                                                    {d.doctor.name}
                                                </p>
                                            </div>

                                            <p>
                                                {d.startTime} - {d.endTime}
                                            </p>
                                        </div>
                                    ))}
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </DashboardContent>
    );
}
