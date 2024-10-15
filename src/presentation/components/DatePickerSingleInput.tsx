import type { DayPickerProps } from 'react-day-picker';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
    useController,
    type Control,
    type FieldPath,
    type FieldValues,
    type UseFormTrigger
} from 'react-hook-form';
import { Calendar } from '../ui/calendar';
import dayjsUtils from '@/lib/dayjs';
import { Button } from '../ui/button';

interface DatePickerSingle {
    dateComponentProps?: DayPickerProps;
    name?: string;
    label?: string;
    placeholder?: string;
    disablePast?: boolean;
}

interface Props<T extends FieldValues = FieldValues> extends DatePickerSingle {
    control: Control<T>;
    trigger?: UseFormTrigger<T>;
}

const DatePickerSingleInput = <
    T extends FieldValues,
    TName extends FieldPath<T> = FieldPath<T>
>({
    control,
    trigger,
    dateComponentProps,
    name,
    label,
    placeholder,
    disablePast = false
}: Props<T>) => {
    const dateControl = useController<T, TName>({
        control,
        name: name as TName
    });

    const dateErrorMsg = dateControl.fieldState.error?.message;

    const disableOptions = disablePast ? { before: new Date() } : undefined;

    return (
        <Popover
            modal={true}
            onOpenChange={(open) => {
                setTimeout(() => {
                    if (!open) {
                        document.body.style.pointerEvents = '';
                    }
                }, 1000);
            }}
        >
            <PopoverTrigger asChild>
                <div className='flex flex-1 flex-col gap-2'>
                    {label && (
                        <p className='font-semibold text-[#666666]'>{label}</p>
                    )}
                    <Button
                        variant={'outline'}
                        type='button'
                        className='flex h-[50px] flex-row items-center justify-start rounded-[32px] border-2 border-[#ECEEFF] text-start text-muted-foreground hover:border-[#DDE0FF] hover:text-muted-foreground focus:border-[#DDE0FF] focus:text-muted-foreground'
                    >
                        {dateControl.field.value ? (
                            <p>
                                {dayjsUtils(
                                    dateControl.field.value,
                                    'YYYY-MM-DD'
                                ).format('DD-MM-YYYY')}
                            </p>
                        ) : (
                            <span>
                                {placeholder ? placeholder : 'Pilih Tanggal'}
                            </span>
                        )}
                    </Button>
                    {dateErrorMsg && (
                        <p className='mt-1 text-xs font-bold text-red-500'>
                            {dateErrorMsg}
                        </p>
                    )}
                </div>
            </PopoverTrigger>
            <PopoverContent className='flex w-auto flex-row gap-2 p-0'>
                <Calendar
                    {...dateComponentProps}
                    mode='single'
                    selected={dayjsUtils(
                        dateControl.field.value,
                        'YYYY-MM-DD'
                    ).toDate()}
                    onSelect={(e) => {
                        dateControl.field.onChange(
                            dayjsUtils(e).format('YYYY-MM-DD')
                        );
                        trigger?.(name as TName);
                    }}
                    disabled={disableOptions}
                    autoFocus
                />
            </PopoverContent>
        </Popover>
    );
};

export default DatePickerSingleInput;
