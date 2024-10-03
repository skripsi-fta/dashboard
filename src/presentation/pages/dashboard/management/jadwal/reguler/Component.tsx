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
                accessorKey: 'tipe',
                size: 150,
                header: 'Tipe',
                cell: ({ row: { original } }) =>
                    original.type === 'regular'
                        ? 'Jadwal Tetap'
                        : 'Jadwal Reguler'
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
            toast.error('Get pasien error');
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

    return (
        <>
            <DashboardContent>
                <DashboardHeader title='Jadwal Reguler' />

                <DashboardActions
                    filterButtonProps={{
                        label: 'Filter Jadwal',
                        loading: isLoading
                        // onClick: handleOpenDialogFilter
                    }}
                    addButtonProps={{
                        label: 'Tambah Jadwal'
                        // onClick: handleOpenDialogAdd
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
