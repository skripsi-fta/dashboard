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
            <div className='w-auto flex justify-end'>
                <CustomButtonComponent onClick={goFullScreen}>
                    Tampilkan secara full screen
                </CustomButtonComponent>
            </div>
            <div ref={divRef} className='flex w-full flex-1 flex-col gap-8 lg:flex-row p-3'>
                <div className='flex flex-col gap-10'>
                    <div className='flex w-full flex-col h-[50%] justify-between items-center rounded-lg bg-white p-5 lg:w-[500px]'>
                        <p className='text-2xl font-semibold'>
                            ANTRIAN FARMASI
                        </p>
                        {!livePharmacyQueue?.data && <p className='text-9xl flex items-center h-full font-semibold text-[#171CA1]'>--</p>}
                        {livePharmacyQueue?.data && (
                            <>
                                <p className='text-9xl font-semibold text-[#171CA1]'>
                                    {livePharmacyQueue.data.queueNumber}
                                </p>
                                <p className='text-3xl font-medium text-center'>
                                    {livePharmacyQueue.data.patientName}
                                </p>
                            </>
                        )}
                    </div>
                    <div className='flex w-full flex-col h-[50%] justify-between items-center rounded-lg bg-white p-5 lg:w-[500px]'>
                        <p className='text-2xl font-semibold'>
                            ANTRIAN KASIR
                        </p>
                        {!liveCashierQueue?.data && <p className='text-9xl flex items-center h-full font-semibold text-[#171CA1]'>--</p>}
                        {liveCashierQueue?.data && (
                            <>
                                <p className='text-9xl font-semibold text-[#171CA1]'>
                                    {liveCashierQueue.data.queueNumber}
                                </p>
                                <p className='text-3xl font-medium text-center'>
                                    {liveCashierQueue.data.patientName}
                                </p>
                            </>
                        )}
                    </div>
                </div>

                <div className='flex flex-col rounded-lg bg-white p-5 items-center w-full flex-1 max-h-screen'>
                    <p className='text-2xl font-semibold'>
                        ANTRIAN DOKTER
                    </p>
                    <div className='flex w-full p-3 mt-3'>
                        <p className='text-xl text-[#666666] font-semibold w-[33%] flex justify-center'>POLI</p>
                        <p className='text-xl text-[#666666] font-semibold w-[33%] flex justify-center'>RUANGAN</p>
                        <p className='text-xl text-[#666666] font-semibold w-[33%] flex justify-center'>ANTRIAN</p>
                    </div>
                    <div className='border-b border-[#A1A1A1] w-full mb-3'></div>
                    <div className='overflow-y-auto table-custom-scrollbar w-full'>
                        {liveDoctorQueue?.data.length && (
                            <>
                                {liveDoctorQueue.data.map((d, i) => (
                                    <div
                                        key={i}
                                        className={`flex w-full flex-row h-auto items-center p-3 pl-5 pr-5 rounded-xl ${i % 2 == 0 ? 'bg-[#9497F0] bg-opacity-30' : ''}`}
                                    >
                                        <div className='flex flex-col w-[33%] gap-2'>
                                            <p className='text-2xl font-semibold'>
                                                {d.poli}
                                            </p>
                                            <p className='text-xl'>
                                                dr. {d.doctorName}
                                            </p>
                                        </div>

                                        <div className='flex gap-2 w-[33%] justify-center'>
                                            <MapPin className='text-primaryblue' size={30} />
                                            <p className='font-semibold text-2xl text-primaryblue'>
                                                {d.roomName}
                                            </p>
                                        </div>

                                        <p className='text-4xl font-semibold w-[33%] flex justify-end'>
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
