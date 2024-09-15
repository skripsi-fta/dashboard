'use client';

import {
    userLoginValidation,
    type LoginType,
    type UserLoginForm
} from '@/infrastructure/models/auth/login';
import { Button } from '@/presentation/ui/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthAPI } from '@/infrastructure/usecase/auth';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';
import TextFieldInput from '@/presentation/components/TextfieldInput';

const LoginPage = () => {
    const [mounted, setMounted] = useState<boolean>(false);

    const { control, handleSubmit } = useForm<UserLoginForm>({
        defaultValues: { email: '', password: '' },
        resolver: zodResolver(userLoginValidation)
    });

    const useCase = new AuthAPI();

    const router = useRouter();

    const isLoggedIn = () => {
        const data = JSON.parse(localStorage.getItem('user-data') as string);
        if (data) {
            return true;
        }
        return false;
    };

    useEffect(() => {
        if (isLoggedIn()) {
            router.replace('/dashboard');
            return;
        }

        setMounted(() => true);
    }, []);

    const authenticate = (data: LoginType.Request) => {
        localStorage.setItem(
            'user-data',
            JSON.stringify({ ...data, password: undefined })
        );

        router.push('/dashboard');
    };

    const { mutate: login } = useMutation({
        mutationKey: ['login'],
        mutationFn: (data: LoginType.Request) => useCase.login(data),
        onSuccess: (data) => {
            toast.success('Login Success');
            authenticate(data);
        },
        onError: (err: Error) => {
            toast.error(err.message);
        }
    });

    if (!mounted) return null;

    return (
        <>
            <div className='flex h-screen w-full flex-row'>
                <div
                    className='hidden flex-1 flex-col items-center justify-center p-4 lg:flex'
                    style={{
                        backgroundImage: 'url("/login/bg.png")',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center'
                    }}
                >
                    <div className='flex flex-col gap-4'>
                        <Image
                            src={'/login/doctor.png'}
                            width={250}
                            height={250}
                            sizes='100%'
                            alt='doctor'
                            className='h-auto w-[250px]'
                        />
                        <div className='flex flex-col gap-2 pl-4'>
                            <p className='text-4xl font-semibold text-white'>
                                Log In
                            </p>
                            <p className='text-7xl font-bold text-white'>
                                Dashboard
                            </p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-[1.5] flex-col'>
                    <div className='m-auto flex w-3/4 flex-col gap-10 lg:w-3/5 xl:w-2/5'>
                        <div className='flex flex-col gap-4'>
                            <p className='text-2xl font-bold lg:text-3xl'>
                                Login
                            </p>
                            <p className='text-[#7c7c7c] lg:text-lg'>
                                Please log in to access your account.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit((data) => login(data))}>
                            <div className='flex flex-col gap-8'>
                                <div className='flex flex-col gap-4'>
                                    <p className='text-xl font-bold'>Email</p>
                                    <Controller
                                        control={control}
                                        name='email'
                                        render={({
                                            field,
                                            fieldState: { error }
                                        }) => (
                                            <TextFieldInput
                                                {...field}
                                                variant='login'
                                                placeholder='Enter your email'
                                                error={error}
                                            />
                                        )}
                                    />
                                </div>

                                <div className='flex flex-col gap-4'>
                                    <p className='text-xl font-bold'>
                                        Password
                                    </p>
                                    <Controller
                                        control={control}
                                        name='password'
                                        render={({
                                            field,
                                            fieldState: { error }
                                        }) => (
                                            <TextFieldInput
                                                {...field}
                                                variant='login'
                                                placeholder='Enter your password'
                                                error={error}
                                                type='password'
                                            />
                                        )}
                                    />
                                </div>

                                <Button
                                    className='h-[55px] rounded-[16px] bg-primaryblue text-xl font-bold text-white hover:bg-[#3B41E3]/70'
                                    type='submit'
                                >
                                    Login
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
