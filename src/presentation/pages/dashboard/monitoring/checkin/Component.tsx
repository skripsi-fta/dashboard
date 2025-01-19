'use client';

import type { ManagementAppointment } from '@/infrastructure/models/management/janjitemu';
import { ManagementAppointmentAPI } from '@/infrastructure/usecase/management/janjitemu/ManagementAppointmentAPI';
import { cn } from '@/lib/utils';
import CustomButtonComponent from '@/presentation/components/CustomButton';
import Spinner from '@/presentation/components/Spinner';
import WebcamCanvas from '@/presentation/components/Webcam';
import DashboardContent from '@/presentation/layout/dashboard/content';
import DashboardHeader from '@/presentation/layout/dashboard/header';
import type { AxiosError } from 'axios';
import jsQR from 'jsqr';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

const CheckInPage = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const divRef = useRef<HTMLDivElement | null>(null);

    const goFullScreen = () => {
        if (divRef.current) {
            if (divRef.current.requestFullscreen) {
                divRef.current.requestFullscreen();
            } else if ((divRef.current as any).webkitRequestFullscreen) {
                (divRef.current as any).webkitRequestFullscreen();
            } else if ((divRef.current as any).msRequestFullscreen) {
                (divRef.current as any).msRequestFullscreen();
            }
        }
    };

    const [qrData, setQrData] = useState<string>('');

    const [successMessage, setSuccessMessage] = useState<string>('');

    const [errorMessage, setErrorMessage] = useState<string>('');

    const api = new ManagementAppointmentAPI();

    const {
        data: responseData,
        mutate: checkIn,
        isLoading
    } = useMutation({
        mutationFn: (data: ManagementAppointment.Request.CheckIn) =>
            api.createCheckIn(data),
        onSuccess: () => {
            toast.success('Check-in sukses');
            setSuccessMessage(
                () => `Check In untuk Booking Code ${qrData} Sukses`
            );
        },
        onError: (res: AxiosError<{ message: string }>) => {
            setErrorMessage(
                () => res.response?.data?.message ?? 'Check-in error'
            );
        }
    });

    useEffect(() => {
        if (qrData) {
            checkIn({ bookingCode: qrData });
            setSuccessMessage(() => '');
            setErrorMessage(() => '');
        }
    }, [qrData]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (canvasRef.current) {
                const canvas = canvasRef.current;

                const ctx = canvas.getContext('2d');

                if (ctx) {
                    const imageData = ctx.getImageData(
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );

                    const qrCode = jsQR(
                        imageData.data,
                        canvas.width,
                        canvas.height
                    );

                    if (qrCode) {
                        setQrData((prevQrData) => {
                            if (prevQrData !== qrCode.data) {
                                return qrCode.data;
                            }
                            return prevQrData;
                        });
                    }
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [canvasRef, canvasRef.current]);

    useEffect(() => {
        if (errorMessage) {
            setTimeout(() => {
                setErrorMessage(() => '');
            }, 15000);
        }
    }, [errorMessage]);

    useEffect(() => {
        if (successMessage) {
            setTimeout(() => {
                setSuccessMessage(() => '');
            }, 15000);
        }
    }, [successMessage]);

    return (
        <>
            <div className='flex flex-row-reverse'>
                <CustomButtonComponent onClick={goFullScreen}>
                    Tampilkan secara full screen
                </CustomButtonComponent>
            </div>
            <div ref={divRef} className='flex flex-col gap-4'>
                <DashboardContent className='flex min-h-screen items-center justify-center gap-8'>
                    <DashboardHeader title='Check In Pasien' />

                    <div className='flex items-center justify-center'>
                        <WebcamCanvas
                            canvasRef={canvasRef}
                            className='h-[700px]'
                        />
                    </div>

                    {isLoading && (
                        <div className='flex flex-col gap-4'>
                            <p className='text-2xl font-semibold'>
                                Booking Code detected: {qrData}
                            </p>
                            <Spinner color='black' />
                        </div>
                    )}

                    {successMessage && (
                        <p className='text-2xl font-bold text-green-500'>
                            {successMessage}
                        </p>
                    )}

                    {errorMessage && (
                        <p className='text-2xl font-bold text-red-500'>
                            Booking Code {qrData} <br />
                            Error: {errorMessage}
                        </p>
                    )}
                </DashboardContent>
            </div>
        </>
    );
};

export default CheckInPage;
