'use client';

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
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

const CalendarSchedule = () => {
    return (
        <>
            <DashboardContent>
                <DayPicker
                    selected={dayjsUtils().toDate()}
                    showOutsideDays={true}
                    className={cn('p-3')}
                    ISOWeek
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
                        day: 'flex items-center justify-center flex-[1] w-full h-full text-center text-sm p-0 relative rounded-md [&:has([aria-selected].range_end)]:rounded-r-md [&:has([aria-selected].outside)]:bg-accent/50 [&:has([aria-selected])]:bg-red-500 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                        day_button: cn(
                            buttonVariants({ variant: 'ghost' }),
                            'size-9 p-0 font-normal hover:bg-[#3B41E3] hover:text-white aria-selected:opacity-100'
                        ),
                        range_end: 'range_end',
                        selected:
                            'flex items-center justify-center bg-[#3B41E3] text-primary-foreground hover:bg-[#3B41E3] hover:text-primary-foreground focus:bg-[#3B41E3] focus:text-primary-foreground',
                        today: 'bg-accent text-accent-foreground',
                        outside:
                            'outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
                        disabled: 'text-muted-foreground opacity-50',
                        range_middle:
                            'aria-selected:bg-accent aria-selected:text-accent-foreground',
                        hidden: 'invisible'
                    }}
                    components={{
                        Nav: (props) => {
                            const currentDate = dayjsUtils(props.nextMonth)
                                .subtract(1, 'month')
                                .format('MMMM YYYY');

                            return (
                                <div className='flex flex-row items-center justify-between'>
                                    <Button
                                        className='m-0 p-0'
                                        variant={'blank'}
                                        onClick={(e) => {
                                            if (
                                                props &&
                                                e &&
                                                props.onPreviousClick
                                            ) {
                                                props.onPreviousClick(e);
                                            }
                                        }}
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
                                        onClick={(e) => {
                                            if (
                                                props &&
                                                e &&
                                                props.onNextClick
                                            ) {
                                                props.onNextClick(e);
                                            }
                                        }}
                                    >
                                        <ChevronRight
                                            className='size-8'
                                            color='#3B41E3'
                                        />
                                    </Button>
                                </div>
                            );
                        },
                        Chevron: (props) => {
                            if (props.orientation === 'left') {
                                return (
                                    <ChevronLeft
                                        className='size-8'
                                        color='#3B41E3'
                                    />
                                );
                            }

                            return (
                                <ChevronRight
                                    className='size-8'
                                    color='#3B41E3'
                                />
                            );
                        },
                        DropdownNav: ({ children, ...props }) => {
                            return (
                                <div
                                    {...props}
                                    className='flex w-full flex-row gap-4'
                                >
                                    {children}
                                </div>
                            );
                        },
                        Dropdown: ({ value, onChange, options = [] }) => {
                            const handleChange = (value: string) => {
                                const changeEvent = {
                                    target: { value }
                                } as React.ChangeEvent<HTMLSelectElement>;
                                onChange?.(changeEvent);
                            };

                            const selectedLabel =
                                options.find((d) => d.value === value)?.label ??
                                '';

                            return (
                                <Select
                                    value={value?.toString()}
                                    onValueChange={(value) => {
                                        handleChange(value);
                                    }}
                                >
                                    <SelectTrigger className='flex-1'>
                                        <SelectValue>
                                            {selectedLabel}
                                        </SelectValue>
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
                    onSelect={(e) => {
                        console.log(e);
                    }}
                    autoFocus
                />
            </DashboardContent>
        </>
    );
};

export default CalendarSchedule;
