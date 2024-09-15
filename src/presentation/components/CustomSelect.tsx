import { Loader2 } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../ui/select';
import type { FieldError } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface CustomSelectComponentProps {
    placeholder: string;
    data: { label: string; value: string }[];
    loading?: boolean;
    onChange: (_e: string) => void;
    value: string;
    error?: FieldError | undefined;
    disabled?: boolean;
}

const CustomSelectComponent = ({
    placeholder,
    data,
    loading,
    onChange,
    value,
    error,
    disabled
}: CustomSelectComponentProps) => {
    return (
        <>
            <div className='flex flex-col gap-2'>
                <Select
                    onValueChange={onChange}
                    defaultValue={value}
                    disabled={disabled}
                >
                    <SelectTrigger
                        className={cn(
                            'w-full h-[50px] rounded-[32px] border-2 border-[#ECEEFF] hover:border-[#DDE0FF] focus:border-[#DDE0FF] ',
                            !!error?.message && 'border-red-500',
                            !value && 'text-muted-foreground'
                        )}
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2 className='mx-auto size-6 animate-spin' />
                        ) : (
                            <SelectValue placeholder={placeholder} />
                        )}
                    </SelectTrigger>
                    <SelectContent>
                        {data.map((d, index) => (
                            <SelectItem
                                value={d.value}
                                key={`${d.value}-${index}`}
                            >
                                {d.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {!!error?.message && (
                    <p className='mt-1 text-xs font-bold text-red-500'>
                        {error.message}
                    </p>
                )}
            </div>
        </>
    );
};

export default CustomSelectComponent;
