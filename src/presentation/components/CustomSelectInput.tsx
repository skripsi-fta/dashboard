import type { FieldError } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import CustomButtonComponent from './CustomButton';
import { cn } from '@/lib/utils';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '../ui/command';
import { Check } from 'lucide-react';

interface CustomSelectComponentProps {
    placeholder: string;
    data: { label: string; value: string }[];
    loading?: boolean;
    onChange: (_e: string) => void;
    value: string;
    error?: FieldError | undefined;
    disabled?: boolean;
    noDataNotice: string;
}

const CustomSelectInput = ({
    placeholder,
    data,
    loading,
    onChange,
    value,
    error,
    disabled,
    noDataNotice
}: CustomSelectComponentProps) => {
    const selectedLabel =
        data.find((d) => d.value === value)?.label ?? placeholder;

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
            <PopoverTrigger asChild disabled={disabled}>
                <div
                    className={cn(
                        'flex flex-col gap-2',
                        disabled && 'opacity-80'
                    )}
                >
                    <CustomButtonComponent
                        variant='blank'
                        role='combobox'
                        className={cn(
                            'h-[50px] w-full items-center justify-start rounded-[32px] border-2 border-[#ECEEFF] text-start font-normal hover:border-[#DDE0FF] focus:border-[#DDE0FF] ',
                            !!error?.message && 'border-red-500',
                            !value && 'text-muted-foreground'
                        )}
                        loading={loading}
                        disabled={disabled}
                    >
                        {selectedLabel ?? placeholder}
                    </CustomButtonComponent>
                    {!!error?.message && (
                        <p className='mt-1 text-xs font-bold text-red-500'>
                            {error.message}
                        </p>
                    )}
                </div>
            </PopoverTrigger>

            <PopoverContent className='p-0'>
                <Command disablePointerSelection={disabled}>
                    <CommandInput placeholder={placeholder} />
                    <CommandList>
                        <CommandEmpty>{noDataNotice}</CommandEmpty>
                        <CommandGroup>
                            {data.map((d) => (
                                <CommandItem
                                    value={d.label}
                                    key={d.value}
                                    onSelect={() => {
                                        onChange(d.value);
                                    }}
                                    disabled={disabled}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 size-4',
                                            d.value === value
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        )}
                                    />
                                    {d.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default CustomSelectInput;
