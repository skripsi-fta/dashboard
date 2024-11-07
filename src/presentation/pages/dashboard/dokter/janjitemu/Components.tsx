'use client';

import useDashboard from '@/contexts/DashboardContext';
import type { DoctorAppointment } from '@/infrastructure/models/doctor/janjitemu';
import { DoctorAppointmentAPI } from '@/infrastructure/usecase/doctor/janjitemu/DoctorAppointmentAPI';
import dayjsUtils from '@/lib/dayjs';
import CustomButtonComponent from '@/presentation/components/CustomButton';
import { DataTable } from '@/presentation/components/DataTable';
import Spinner from '@/presentation/components/Spinner';
import DashboardContent from '@/presentation/layout/dashboard/content';
import DashboardHeader from '@/presentation/layout/dashboard/header';
import { useModal } from '@/providers/ModalProvider';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';
import CheckPatientModal from './components/CheckPatientModal';
import { DoctorScheduleAPI } from '@/infrastructure/usecase/doctor/schedule/DoctorScheduleAPI';
import type { DoctorSchedule } from '@/infrastructure/models/doctor/schedule';
import { cn } from '@/lib/utils';

const ScheduleAppointmentPage = () => {
    const { userData } = useDashboard();

    const todayDate = dayjsUtils().format('DD-MM-YYYY HH:mm');

    const api = new DoctorAppointmentAPI();

    const scheduleAPi = new DoctorScheduleAPI();

    const { openModal } = useModal();

    const {
        data: detailAppointment,
        isLoading: loadingDetailAppointment,
        isError: errorDetailAppointment,
        refetch: refetch2
    } = useQuery({
        queryKey: [
            'detail-appointment-doctor',
            userData?.doctor?.id,
            todayDate
        ],
        queryFn: () => api.getDetail(),
        onError: () => {
            toast.error('Get appointment error');
        }
    });

    const { mutate: finishSchedule, isLoading: loadingFinishSchedule } =
        useMutation({
            mutationFn: (data: DoctorSchedule.Request.Finish) =>
                scheduleAPi.finishSchedule(data),
            onSuccess: () => {
                toast.success('Schedule selesai');
                refetch();
                refetch2();
            },
            onError: () => {
                toast.error('Schedule gagal diselesaikan');
            }
        });

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5
    });

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['list-appointment-doctor', pagination, userData?.doctor?.id],
        queryFn: () =>
            api.getList({
                pageSize: pagination.pageSize,
                pageNumber: pagination.pageIndex + 1,
                scheduleId: Number(detailAppointment?.scheduleId)
            }),
        onError: () => {
            toast.error('Get list appointment error');
        },
        enabled: Boolean(
            !loadingDetailAppointment &&
                !errorDetailAppointment &&
                detailAppointment
        )
    });

    const openCheckPatientModal = (
        data: DoctorAppointment.Response.ListData
    ) => {
        openModal(
            <CheckPatientModal
                refetch={refetch}
                data={data}
                refetch2={refetch2}
            />,
            {
                title: data.patient.name,
                closeButtonVisible: false,
                disableClickOutside: true
            }
        );
    };

    const columns: ColumnDef<DoctorAppointment.Response.ListData>[] = [
        {
            accessorKey: 'antrian',
            size: 100,
            header: 'Nomor Antrian',
            cell: ({ row: { original } }) => {
                return <p>{original.doctorQueue.queueNumber}</p>;
            }
        },
        {
            accessorKey: 'bookingCode',
            size: 100,
            header: 'Kode Booking'
        },
        {
            accessorKey: 'patientName',
            size: 150,
            header: 'Nama Pasien',
            cell: ({ row: { original } }) => {
                return <p>{original.patient.name}</p>;
            }
        },
        {
            accessorKey: 'dateOfBirth',
            size: 175,
            header: 'Tanggal Lahir',
            cell: ({ row: { original } }) => {
                return (
                    <p>
                        {dayjsUtils(
                            original.patient.dateOfBirth,
                            'YYYY-MM-DD'
                        ).format('DD MMMM YYYY')}
                    </p>
                );
            }
        },
        {
            accessorKey: 'illness',
            size: 150,
            header: 'Keluhan',
            cell: ({ row: { original } }) => {
                return <p>{original.medicalRecord.illness}</p>;
            }
        },
        {
            accessorKey: 'action',
            size: 150,
            header: 'Aksi',
            cell: ({ row: { original } }) => {
                return (
                    <CustomButtonComponent
                        className='w-[125px] rounded-[10px] bg-primaryblue font-bold text-white hover:bg-primaryblue/70'
                        onClick={() => {
                            openCheckPatientModal(original);
                        }}
                    >
                        Mulai Periksa
                    </CustomButtonComponent>
                );
            }
        }
    ];

    return (
        <>
            <DashboardContent>
                <DashboardHeader title='Janji Temu Anda'>
                    {detailAppointment?.canFinish && (
                        <CustomButtonComponent
                            variant={'filterButton'}
                            className={cn(
                                'h-[45px] w-full justify-start md:w-fit'
                            )}
                            loading={loadingFinishSchedule}
                            disabled={loadingFinishSchedule}
                            onClick={() => {
                                if (
                                    detailAppointment.canFinish &&
                                    !loadingFinishSchedule
                                ) {
                                    finishSchedule({
                                        scheduleId: detailAppointment.scheduleId
                                    });
                                }
                            }}
                        >
                            Selesaikan Jadwal
                        </CustomButtonComponent>
                    )}
                </DashboardHeader>
                {loadingDetailAppointment || errorDetailAppointment ? (
                    <>
                        <div className='flex size-full items-center justify-center'>
                            <Spinner size={40} color='#3B41E3' />
                        </div>
                    </>
                ) : (
                    <>
                        {detailAppointment ? (
                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
                                <div className='flex flex-row items-center gap-8'>
                                    <div className='flex flex-col gap-1'>
                                        <p className='text-base font-semibold text-[#666666]'>
                                            {
                                                detailAppointment
                                                    ?.scheduleDetail?.startTime
                                            }{' '}
                                            -{' '}
                                            {
                                                detailAppointment
                                                    ?.scheduleDetail?.endTime
                                            }
                                        </p>
                                        <p className='text-lg font-semibold'>
                                            Jumlah Pasien
                                        </p>
                                    </div>
                                    <p className='text-center text-4xl font-semibold text-primaryblue'>
                                        {detailAppointment?.total}
                                    </p>
                                </div>
                                <div className='flex flex-row items-center gap-8'>
                                    <div className='flex flex-col gap-1'>
                                        <p className='text-base font-semibold text-[#666666]'>
                                            Menunggu
                                        </p>
                                        <p className='text-lg font-semibold'>
                                            Diperiksa
                                        </p>
                                    </div>
                                    <p className='text-center text-4xl font-semibold text-primaryblue'>
                                        {detailAppointment?.totalWaiting}
                                    </p>
                                </div>
                                <div className='flex flex-row items-center gap-8'>
                                    <div className='flex flex-col gap-1'>
                                        <p className='text-base font-semibold text-[#666666]'>
                                            Selesai
                                        </p>
                                        <p className='text-lg font-semibold'>
                                            Diperiksa
                                        </p>
                                    </div>
                                    <p className='text-center text-4xl font-semibold text-primaryblue'>
                                        {detailAppointment?.totalFinished}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className='mt-[-24px] flex flex-col items-center justify-center gap-2'>
                                <svg
                                    width='65'
                                    height='54'
                                    viewBox='0 0 65 54'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                    xmlnsXlink='http://www.w3.org/1999/xlink'
                                >
                                    <rect
                                        width='65'
                                        height='54'
                                        fill='url(#pattern0_930_3425)'
                                    />
                                    <defs>
                                        <pattern
                                            id='pattern0_930_3425'
                                            patternContentUnits='objectBoundingBox'
                                            width='1'
                                            height='1'
                                        >
                                            <use
                                                xlinkHref='#image0_930_3425'
                                                transform='matrix(0.00289855 0 0 0.003489 0 -0.000670961)'
                                            />
                                        </pattern>
                                        <image
                                            id='image0_930_3425'
                                            width='345'
                                            height='287'
                                            xlinkHref='data:image/png;base64,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'
                                        />
                                    </defs>
                                </svg>

                                <p className='text-center text-xl font-medium text-[#666666]'>
                                    Tidak Ada Jadwal Hari Ini
                                </p>
                            </div>
                        )}
                    </>
                )}
            </DashboardContent>

            {detailAppointment && (
                <DashboardContent>
                    <DashboardHeader title='Daftar Janji Temu Anda'>
                        <div className='flex flex-row items-center gap-8'>
                            <div className='flex flex-col gap-1'>
                                <p className='text-base font-semibold text-[#666666]'>
                                    Nomor Antrian
                                </p>
                                <p className='text-lg font-semibold'>
                                    Sekarang
                                </p>
                            </div>
                            <p className='text-center text-4xl font-semibold text-primaryblue'>
                                {detailAppointment?.currentQueueNumber}
                            </p>
                        </div>
                    </DashboardHeader>

                    <DataTable
                        columns={columns}
                        data={data?.data ?? []}
                        totalData={data?.totalRows ?? 0}
                        tableProps={{
                            className:
                                'my-2 overflow-auto text-[15px] text-black w-full'
                        }}
                        tableHeaderProps={{ className: 'text-black' }}
                        tableRowHeaderProps={{
                            className: 'border-none text-black '
                        }}
                        tableRowProps={{ className: 'border-b-0' }}
                        initialState={{ columnVisibility: { diff: true } }}
                        paginationProps={pagination}
                        setPagination={setPagination}
                        isLoading={isLoading}
                    />
                </DashboardContent>
            )}
        </>
    );
};

export default ScheduleAppointmentPage;
