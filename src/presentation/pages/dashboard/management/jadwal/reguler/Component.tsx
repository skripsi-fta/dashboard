import type {
    ManagementRegulerScheduleDoctor,
    ManagementRegulerScheduleListValidation
} from '@/infrastructure/models/management/schedule/reguler';
import { ManagementScheduleAPI } from '@/infrastructure/usecase/management/schedule/ManagementScheduleAPI';
import dayjsUtils from '@/lib/dayjs';
import { DataTable } from '@/presentation/components/DataTable';
import DashboardActions from '@/presentation/layout/dashboard/actions';
import DashboardContent from '@/presentation/layout/dashboard/content';
import DashboardHeader from '@/presentation/layout/dashboard/header';
import { useModal } from '@/providers/ModalProvider';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'sonner';
import FilterModal from './components/FilterModal';
import { cn } from '@/lib/utils';
import AddModal from './components/AddModal';

const ScheduleRegulerManagementComponent = () => {
    const columns: ColumnDef<ManagementRegulerScheduleDoctor.Response.Data>[] =
        [
            {
                accessorKey: 'no',
                size: 75,
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
                accessorKey: 'doctorName',
                size: 200,
                header: 'Nama Dokter',
                cell: ({ row: { original } }) => original.doctor.name
            },
            {
                accessorKey: 'spesialis',
                size: 200,
                header: 'Spesialis',
                cell: ({ row: { original } }) =>
                    original.doctor.specialization.name
            },
            {
                accessorKey: 'ruangan',
                size: 200,
                header: 'Ruangan',
                cell: ({ row: { original } }) => original?.room?.name
            },
            {
                accessorKey: 'tipe',
                size: 150,
                header: 'Tipe',
                cell: ({ row: { original } }) =>
                    original.type === 'regular'
                        ? 'Jadwal Tetap'
                        : 'Jadwal Reguler'
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
                                            'text-primaryblue'
                                    )}
                                >
                                    {original.status}
                                </p>
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

    const [filterValues, setFilterValues] =
        useState<ManagementRegulerScheduleListValidation>({
            date: '',
            doctorId: '',
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
            pagination.pageSize
        ],
        onError: () => {
            toast.error('Get schedule error');
        }
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
            doctorId: '',
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

    const handleOpenDialogAdd = () => {
        openModal(<AddModal refetch={refetch} />, { title: 'Tambah Jadwal' });
    };

    return (
        <>
            <DashboardContent>
                <DashboardHeader title='Jadwal Reguler' />

                <DashboardActions
                    filterButtonProps={{
                        label: 'Filter Jadwal',
                        loading: isLoading,
                        onClick: handleOpenDialogFilter
                    }}
                    addButtonProps={{
                        label: 'Tambah Jadwal',
                        onClick: handleOpenDialogAdd
                    }}
                />

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
        </>
    );
};

export default ScheduleRegulerManagementComponent;
