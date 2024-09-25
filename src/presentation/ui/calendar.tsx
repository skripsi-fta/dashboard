'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker, type DayPickerProps } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/presentation/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/presentation/ui/select';

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}: DayPickerProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn('p-3', className)}
            classNames={{
                months: 'flex flex-col gap-2',
                month: 'space-y-4',
                month_caption: 'flex justify-center pt-1 relative items-center',
                caption_label: 'text-sm font-medium',
                nav: 'space-x-1 flex items-center flex-row justify-between',
                button_previous: cn(
                    buttonVariants({ variant: 'outline' }),
                    ' size-7 bg-transparent p-0 opacity-50 hover:opacity-100'
                ),
                button_next: cn(
                    buttonVariants({ variant: 'outline' }),
                    ' size-7 bg-transparent p-0 opacity-50 hover:opacity-100'
                ),
                table: 'w-full border-collapse space-y-1',
                weekdays: 'flex',
                weekday:
                    'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
                week: 'flex w-full mt-2',
                day: 'h-9 w-9 text-center text-sm p-0 relative rounded-md [&:has([aria-selected].range_end)]:rounded-r-md [&:has([aria-selected].outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                day_button: cn(
                    buttonVariants({ variant: 'ghost' }),
                    'size-9 p-0 font-normal aria-selected:opacity-100 hover:bg-primary hover:text-white'
                ),
                range_end: 'range_end',
                selected:
                    'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
                today: 'bg-accent text-accent-foreground',
                outside:
                    'outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
                disabled: 'text-muted-foreground opacity-50',
                range_middle:
                    'aria-selected:bg-accent aria-selected:text-accent-foreground',
                hidden: 'invisible',
                ...classNames
            }}
            components={{
                Chevron: (props) => {
                    if (props.orientation === 'left') {
                        return <ChevronLeft className='size-4' />;
                    }

                    return <ChevronRight className='size-4' />;
                },
                DropdownNav: ({ children, ...props }) => {
                    return (
                        <div {...props} className='flex flex-row gap-4 w-full'>
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
                        options.find((d) => d.value === value)?.label ?? '';

                    return (
                        <Select
                            value={value?.toString()}
                            onValueChange={(value) => {
                                handleChange(value);
                            }}
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
            // fromYear={currentYear - 100}
            // toYear={currentYear + 100}
            {...props}
        />
    );
}

Calendar.displayName = 'Calendar';

export { Calendar };
