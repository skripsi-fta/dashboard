'use client';
import { ManagementLiveQueueAPI } from '@/infrastructure/usecase/management/antrian/ManagementLiveQueue';
import CustomButtonComponent from '@/presentation/components/CustomButton';
import { MapPin } from 'lucide-react';
import { useRef } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'sonner';

const LiveQueuePage = () => {
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

    const api = new ManagementLiveQueueAPI();

    const {
        data: livePharmacyQueue,
        isLoading: loadingLivePharmacyQueue,
        isError: errorLivePharmacyQueue,
        refetch: refetch
    } = useQuery({
        queryKey: ['live-pharmacy-queue'],
        queryFn: () => api.getLivePharmacyQueue(),
        onError: () => {
            toast.error('Get live pharmacy queue error');
        }
    });

    const {
        data: liveCashierQueue,
        isLoading: loadingLiveCashierQueue,
        isError: errorLiveCashierQueue,
        refetch: refetch2
    } = useQuery({
        queryKey: ['live-cashier-queue'],
        queryFn: () => api.getLiveCashierQueue(),
        onError: () => {
            toast.error('Get live cashier queue error');
        }
    });

    const {
        data: liveDoctorQueue,
        isLoading: loadingLiveDoctorQueue,
        isError: errorLiveDoctorQueue,
        refetch: refetch3
    } = useQuery({
        queryKey: ['live-doctor-queue'],
        queryFn: () => api.getLiveDoctorQueue(),
        onError: () => {
            toast.error('Get live doctor queue error');
        }
    });

    return (
        <>
            <div className='flex w-auto justify-end'>
                <CustomButtonComponent onClick={goFullScreen}>
                    Tampilkan secara full screen
                </CustomButtonComponent>
            </div>
            <div
                ref={divRef}
                className='flex w-full flex-1 flex-col gap-8 p-3 lg:flex-row'
            >
                <div className='flex flex-col gap-10'>
                    <div className='flex h-[50%] w-full flex-col items-center justify-between rounded-lg bg-white p-5 lg:w-[500px]'>
                        <p className='text-2xl font-semibold'>
                            ANTRIAN FARMASI
                        </p>
                        {!livePharmacyQueue?.data && (
                            <p className='flex h-full items-center text-9xl font-semibold text-[#171CA1]'>
                                --
                            </p>
                        )}
                        {livePharmacyQueue?.data && (
                            <>
                                <p className='text-9xl font-semibold text-[#171CA1]'>
                                    {livePharmacyQueue.data.queueNumber}
                                </p>
                                <p className='text-center text-3xl font-medium'>
                                    {livePharmacyQueue.data.patientName}
                                </p>
                            </>
                        )}
                    </div>
                    <div className='flex h-[50%] w-full flex-col items-center justify-between rounded-lg bg-white p-5 lg:w-[500px]'>
                        <p className='text-2xl font-semibold'>ANTRIAN KASIR</p>
                        {!liveCashierQueue?.data && (
                            <p className='flex h-full items-center text-9xl font-semibold text-[#171CA1]'>
                                --
                            </p>
                        )}
                        {liveCashierQueue?.data && (
                            <>
                                <p className='text-9xl font-semibold text-[#171CA1]'>
                                    {liveCashierQueue.data.queueNumber}
                                </p>
                                <p className='text-center text-3xl font-medium'>
                                    {liveCashierQueue.data.patientName}
                                </p>
                            </>
                        )}
                    </div>
                </div>

                <div className='flex max-h-screen w-full flex-1 flex-col items-center rounded-lg bg-white p-5'>
                    <p className='text-2xl font-semibold'>ANTRIAN DOKTER</p>
                    <div className='mt-3 flex w-full p-3'>
                        <p className='flex w-[33%] justify-center text-xl font-semibold text-[#666666]'>
                            POLI
                        </p>
                        <p className='flex w-[33%] justify-center text-xl font-semibold text-[#666666]'>
                            RUANGAN
                        </p>
                        <p className='flex w-[33%] justify-center text-xl font-semibold text-[#666666]'>
                            ANTRIAN
                        </p>
                    </div>
                    <div className='mb-3 w-full border-b border-[#A1A1A1]'></div>
                    <div className='table-custom-scrollbar w-full overflow-y-auto'>
                        {liveDoctorQueue?.data.length && (
                            <>
                                {liveDoctorQueue.data.map((d, i) => (
                                    <div
                                        key={i}
                                        className={`flex h-auto w-full flex-row items-center rounded-xl p-3 px-5 ${i % 2 === 0 ? 'bg-[#9497F0] bg-opacity-30' : ''}`}
                                    >
                                        <div className='flex w-[33%] flex-col gap-2'>
                                            <p className='text-2xl font-semibold'>
                                                {d.poli}
                                            </p>
                                            <p className='text-xl'>
                                                dr. {d.doctorName}
                                            </p>
                                        </div>

                                        <div className='flex w-[33%] justify-center gap-2'>
                                            <MapPin
                                                className='text-primaryblue'
                                                size={30}
                                            />
                                            <p className='text-2xl font-semibold text-primaryblue'>
                                                {d.roomName}
                                            </p>
                                        </div>

                                        <p className='flex w-[33%] justify-end text-4xl font-semibold'>
                                            {d.queueNumber} / {d.totalQueue}
                                        </p>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LiveQueuePage;
