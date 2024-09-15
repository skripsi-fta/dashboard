/* eslint-disable react/display-name */
'use client';

import { Input } from '@/presentation/ui/input';
import { Label } from '@/presentation/ui/label';
import { cn } from '@/lib/utils';
import { forwardRef, type InputHTMLAttributes, useState } from 'react';
import type { FieldError } from 'react-hook-form';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

interface TextFieldInputType extends InputHTMLAttributes<HTMLInputElement> {
    type?: 'text' | 'password' | 'file';
    label?: string;
    error?: FieldError | undefined;
    variant?: 'normal' | 'modal' | 'login';
}

const TextFieldInput = forwardRef<HTMLInputElement, TextFieldInputType>(
    ({ error, label, type = 'text', variant = 'normal', ...props }, ref) => {
        const [showPassword, setShowPassword] = useState<boolean>(false);

        const variants = {
            normal: '',
            modal: 'h-[50px] rounded-[32px] border-2 border-[#ECEEFF] hover:border-[#DDE0FF] focus:border-[#DDE0FF]',
            login: 'h-[60px] rounded-[16px] border-transparent text-base shadow-[0px_2px_16px_rgba(20,20,20,0.1)] placeholder:text-[#66666] focus:border-[rgba(20,20,20,0.1)]'
        };

        return (
            <>
                <div className='flex flex-col gap-2'>
                    {label && (
                        <Label className='text-lg font-semibold'>{label}</Label>
                    )}
                    <div className='relative'>
                        <Input
                            {...props}
                            ref={ref}
                            type={
                                type === 'password'
                                    ? showPassword
                                        ? 'text'
                                        : 'password'
                                    : type
                            }
                            id={label}
                            className={cn(
                                'w-full rounded-[4px] bg-white text-black',
                                !!error?.message && 'border-red-500',
                                props.className,
                                variants[variant]
                            )}
                        />
                        {type !== 'password' ? (
                            <>
                                {!!error?.message && (
                                    <AlertCircle
                                        className='absolute right-0 top-[30%] mx-4 flex'
                                        color='red'
                                        size={24}
                                    />
                                )}
                            </>
                        ) : (
                            <>
                                <button
                                    className='absolute inset-y-0 right-0 flex items-center px-4 text-gray-600'
                                    onClick={() =>
                                        setShowPassword((state) => !state)
                                    }
                                    type='button'
                                >
                                    {!showPassword ? (
                                        <EyeOff size={24} />
                                    ) : (
                                        <Eye size={24} />
                                    )}
                                </button>
                            </>
                        )}
                    </div>
                    {!!error?.message && (
                        <p className='mt-1 text-xs font-bold text-red-500'>
                            {error.message}
                        </p>
                    )}
                </div>
            </>
        );
    }
);

export default TextFieldInput;
