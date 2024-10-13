'use client';

import DashboardContent from '@/presentation/layout/dashboard/content';
import DashboardHeader from '@/presentation/layout/dashboard/header';
import CalendarSchedule from './components/CalendarSchedule';
import DashboardActions from '@/presentation/layout/dashboard/actions';
import type {
    ManagementRegulerScheduleDoctor,
    ManagementRegulerScheduleListValidation
} from '@/infrastructure/models/management/schedule/reguler';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';
import { useState } from 'react';
import { ManagementScheduleAPI } from '@/infrastructure/usecase/management/schedule/ManagementScheduleAPI';
import dayjsUtils from '@/lib/dayjs';
import useDashboard from '@/contexts/DashboardContext';
import { useQuery } from 'react-query';
import { toast } from 'sonner';
import type { Profile } from '@/infrastructure/models/auth/profile';
import { DataTable } from '@/presentation/components/DataTable';
import { Eye, MapPin, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useModal } from '@/providers/ModalProvider';
import FilterModal from './components/FilterModal';

const ScheduleDoctorPage = () => {
    const columns: ColumnDef<ManagementRegulerScheduleDoctor.Response.Data>[] =
        [
            {
                accessorKey: 'no',
                size: 50,
                header: 'ID'
            },
            {
                accessorKey: 'date',
                size: 150,
                header: 'Tanggal'
            },
            {
                accessorKey: 'startTime',
                size: 125,
                header: 'Jam Mulai'
            },
            {
                accessorKey: 'endTime',
                size: 125,
                header: 'Jam Akhir'
            },
            {
                accessorKey: 'ruangan',
                size: 150,
                header: 'Ruangan',
                cell: ({ row: { original } }) => (
                    <div className='flex flex-row items-center gap-2'>
                        <MapPin className='text-primaryblue' size={22} />
                        <p className='font-semibold text-primaryblue'>
                            {original?.room?.name}
                        </p>
                    </div>
                )
            },
            {
                accessorKey: 'status',
                size: 120,
                header: 'Status',
                cell: ({ row: { original } }) => {
                    const startDate = dayjsUtils(
                        `${original.date} ${original.startTime}`
                    );

                    const endDate = dayjsUtils(
                        `${original.date} ${original.endTime}`
                    );

                    const dateNow = dayjsUtils();

                    let isActive = false;

                    if (
                        dateNow.isBefore(endDate) &&
                        dateNow.isAfter(startDate)
                    ) {
                        isActive = true;
                    }

                    if (original.status === 'ready' && isActive) {
                        return (
                            <p className='font-semibold text-primaryblue'>
                                Berjalan
                            </p>
                        );
                    } else {
                        return (
                            <div className='flex w-full flex-row items-center justify-between'>
                                <p
                                    className={cn(
                                        'font-semibold capitalize',
                                        original.status === 'in review' &&
                                            'text-[#EC7525]',
                                        original.status === 'cancelled' &&
                                            'text-red-500',
                                        original.status === 'changed' &&
                                            'text-green-400',
                                        original.status === 'completed' &&
                                            'text-primary'
                                    )}
                                >
                                    {original.status}
                                </p>

                                {original.status === 'ready' ? (
                                    <Pencil
                                        size={22}
                                        className='cursor-pointer'
                                    />
                                ) : (
                                    <Eye size={22} className='cursor-pointer' />
                                )}
                            </div>
                        );
                    }
                }
            }
        ];

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5
    });

    const api = new ManagementScheduleAPI();

    const { userData } = useDashboard();

    const doctorData = userData as Profile.DoctorRole;

    const [filterValues, setFilterValues] =
        useState<ManagementRegulerScheduleListValidation>({
            date: '',
            doctorId: doctorData!.doctor.id.toString(),
            endDate: dayjsUtils().endOf('month').format('YYYY-MM-DD'),
            endTime: '',
            roomId: '',
            startDate: dayjsUtils().startOf('month').format('YYYY-MM-DD'),
            startTime: '',
            status: ''
        });

    const { data, isLoading, refetch } = useQuery({
        queryFn: () =>
            api.getScheduleList({
                ...filterValues,
                pageSize: pagination.pageSize,
                pageNumber: pagination.pageIndex + 1
            }),
        queryKey: [
            'schedule-list-management',
            filterValues,
            pagination.pageIndex,
            pagination.pageSize,
            doctorData?.doctor.id
        ],
        onError: () => {
            toast.error('Get schedule error');
        },
        enabled: !!doctorData.doctor
    });

    const { openModal, closeModal } = useModal();

    const onSubmitFilter = (e: ManagementRegulerScheduleListValidation) => {
        setFilterValues(() => e);
        setPagination(() => ({ pageIndex: 0, pageSize: 5 }));
        closeModal();
    };

    const onResetFilter = () => {
        setFilterValues(() => ({
            date: '',
            doctorId: doctorData!.doctor.id.toString(),
            endDate: dayjsUtils().endOf('month').format('YYYY-MM-DD'),
            endTime: '',
            roomId: '',
            startDate: dayjsUtils().startOf('month').format('YYYY-MM-DD'),
            startTime: '',
            status: ''
        }));

        setPagination(() => ({ pageIndex: 0, pageSize: 5 }));
        closeModal();
    };

    const handleOpenDialogFilter = () => {
        openModal(
            <FilterModal
                defaultValues={filterValues}
                onSubmit={onSubmitFilter}
                onCancel={onResetFilter}
            />,
            { title: 'Filter Jadwal' }
        );
    };

    return (
        <>
            <div className='flex w-full flex-1 flex-col-reverse gap-8 lg:flex-row'>
                <div className='min-w-0 lg:flex-[7] xl:flex-[8]'>
                    <DashboardContent>
                        <DashboardHeader title='Jadwal Dokter'>
                            <DashboardActions
                                filterButtonProps={{
                                    label: 'Filter Jadwal',
                                    loading: false,
                                    onClick: handleOpenDialogFilter
                                }}
                            />
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
                </div>

                <div className='min-w-0 lg:flex-[5] xl:flex-[4]'>
                    <CalendarSchedule />
                </div>
            </div>
        </>
    );
};

export default ScheduleDoctorPage;
