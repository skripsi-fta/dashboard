import { ManagementScheduleAPI } from '@/infrastructure/usecase/management/schedule/ManagementScheduleAPI';
import dayjsUtils from '@/lib/dayjs';
import { cn } from '@/lib/utils';
import Spinner from '@/presentation/components/Spinner';
import { MapPin } from 'lucide-react';
import { useQuery } from 'react-query';

interface DetailModal {
    scheduleId: number;
}

const DetailModal = ({ scheduleId }: DetailModal) => {
    const managementScheduleAPI = new ManagementScheduleAPI();

    const { data, isLoading } = useQuery({
        queryKey: ['schedule-detail', scheduleId],
        queryFn: () => managementScheduleAPI.getScheduleById({ id: scheduleId })
    });

    if (isLoading && !data) {
        return <Spinner size={40} color='black' />;
    }

    const scheduleData = data?.data;

    return (
        <>
            <div className='flex flex-col gap-4'>
                <div className='mb-2 flex flex-col gap-2'>
                    <div className='flex flex-row justify-between'>
                        <p className='font-bold'>
                            {dayjsUtils(scheduleData?.schedule.date).format(
                                'dddd, DD MMMM YYYY'
                            )}
                        </p>
                        <div className='flex flex-row items-center gap-2'>
                            <MapPin className='text-primaryblue' size={18} />
                            <p className='font-semibold text-primaryblue'>
                                {scheduleData?.schedule.room.name}
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex flex-row font-medium'>
                            <p className='w-[150px]'>Jadwal</p>
                            <p>
                                : {scheduleData?.schedule.startTime} -{' '}
                                {scheduleData?.schedule.endTime}
                            </p>
                        </div>
                        <div className='flex flex-row font-medium'>
                            <p className='w-[150px]'>Status</p>
                            <p
                                className={cn(
                                    'capitalize',
                                    scheduleData?.schedule.status ===
                                        'cancelled' && 'text-red-500',
                                    scheduleData?.schedule.status ===
                                        'in review' && 'text-[#EC7525]',
                                    scheduleData?.schedule.status ===
                                        'changed' && 'text-green-400'
                                )}
                            >
                                : {scheduleData?.schedule.status}
                            </p>
                        </div>
                    </div>
                </div>

                {(scheduleData?.schedule.status === 'in review' ||
                    scheduleData?.schedule.status === 'changed') && (
                    <>
                        <p className='text-center font-semibold capitalize'>
                            {scheduleData.schedule.status === 'in review'
                                ? 'Diajukan perubahan jadwal ke'
                                : 'Jadwal diubah ke'}
                        </p>

                        {scheduleData.proposedSchedule && (
                            <div className='mb-2 flex flex-col gap-2'>
                                <div className='flex flex-row justify-between'>
                                    <p className='font-bold'>
                                        {dayjsUtils(
                                            scheduleData?.proposedSchedule?.date
                                        ).format('dddd, DD MMMM YYYY')}
                                    </p>
                                    {scheduleData?.proposedSchedule?.room && (
                                        <div className='flex flex-row items-center gap-2'>
                                            <MapPin
                                                className='text-primaryblue'
                                                size={18}
                                            />
                                            <p className='font-semibold text-primaryblue'>
                                                {
                                                    scheduleData
                                                        ?.proposedSchedule.room
                                                        .name
                                                }
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className='flex flex-col'>
                                    <div className='flex flex-row font-medium'>
                                        <p className='w-[150px]'>Jadwal</p>
                                        <p>
                                            :{' '}
                                            {
                                                scheduleData?.proposedSchedule
                                                    ?.startTime
                                            }{' '}
                                            -{' '}
                                            {
                                                scheduleData?.proposedSchedule
                                                    ?.endTime
                                            }
                                        </p>
                                    </div>
                                    <div className='flex flex-row font-medium'>
                                        <p className='w-[150px]'>Status</p>
                                        <p
                                            className={cn(
                                                'capitalize',
                                                scheduleData?.proposedSchedule
                                                    .status === 'cancelled' &&
                                                    'text-red-500',
                                                scheduleData?.proposedSchedule
                                                    .status === 'in review' &&
                                                    'text-[#EC7525]',
                                                scheduleData?.proposedSchedule
                                                    .status === 'changed' &&
                                                    'text-green-400'
                                            )}
                                        >
                                            :{' '}
                                            {
                                                scheduleData?.proposedSchedule
                                                    .status
                                            }
                                        </p>
                                    </div>
                                    {scheduleData.proposedSchedule?.notes && (
                                        <div className='flex flex-row font-medium'>
                                            <p className='w-[150px]'>Notes</p>
                                            <p>
                                                :{' '}
                                                {
                                                    scheduleData
                                                        ?.proposedSchedule
                                                        .notes
                                                }
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default DetailModal;
