import type {
    ManagementFixedScheduleDoctor,
    ManagementFixedScheduleListValidation
} from '@/infrastructure/models/management/schedule/fixed';
import { ManagementScheduleAPI } from '@/infrastructure/usecase/management/schedule/ManagementScheduleAPI';
import { DataTable } from '@/presentation/components/DataTable';
import DashboardActions from '@/presentation/layout/dashboard/actions';
import DashboardContent from '@/presentation/layout/dashboard/content';
import DashboardHeader from '@/presentation/layout/dashboard/header';
import { useModal } from '@/providers/ModalProvider';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'sonner';
import AddModal from './components/AddModal';
import FilterModal from './components/FilterModal';
import dayjsUtils from '@/lib/dayjs';
import { Button } from '@/presentation/ui/button';
import { Pencil } from 'lucide-react';
import EditModal from './components/EditModal';
import NoticeModal from './components/NoticeModal';

const ScheduleFixedManagementComponent = () => {
    const columns: ColumnDef<ManagementFixedScheduleDoctor.Response.Data>[] = [
        {
            accessorKey: 'no',
            size: 75,
            header: 'ID'
        },
        {
            accessorKey: 'day',
            size: 200,
            header: 'Hari'
        },
        {
            accessorKey: 'doctor',
            size: 250,
            header: 'Dokter',
            cell: ({ row: { original } }) => original?.doctor.name || ''
        },
        {
            accessorKey: 'room',
            size: 250,
            header: 'Ruangan',
            cell: ({ row: { original } }) => original?.room.name || ''
        },
        {
            accessorKey: 'startTime',
            size: 200,
            header: 'Jam Mulai'
        },
        {
            accessorKey: 'endTime',
            size: 200,
            header: 'Jam Selesai'
        },
        {
            accessorKey: 'capacity',
            size: 150,
            header: 'Kuota'
        },
        {
            accessorKey: 'updatedAt',
            size: 200,
            header: 'Terakhir Sinkron',
            cell: ({ row: { original } }) =>
                dayjsUtils(original.syncDate).format('DD-MM-YYYY HH:mm:ss')
        },
        {
            header: 'Action',
            size: 150,
            cell: ({ row: { original } }) => {
                return (
                    <div className='flex flex-row items-center'>
                        <Button
                            variant={'ghost'}
                            onClick={() =>
                                openModal(
                                    <EditModal
                                        defaultValues={{
                                            capacity: original.capacity,
                                            day: original.day,
                                            doctorId:
                                                original.doctor.id.toString(),
                                            endTime: original.endTime,
                                            id: original.id.toString(),
                                            isOverrideSchedule: false,
                                            roomId: original.room.id.toString(),
                                            startTime: original.startTime
                                        }}
                                        refetch={refetch}
                                    />,
                                    { title: 'Edit Jadwal Tetap' }
                                )
                            }
                        >
                            <Pencil className='text-primaryblue' />
                        </Button>

                        {/* TODO: Implement delete fixed schedule in the backend too */}
                        {/* <Button
                            variant={'ghost'}
                            onClick={() =>
                                openModal(
                                    <DeleteModal
                                        refetch={refetch}
                                        data={original}
                                    />,
                                    {
                                        closeButtonVisible: false
                                    }
                                )
                            }
                        >
                            <Trash2 className='text-red-600' />
                        </Button> */}
                    </div>
                );
            }
        }
    ];

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5
    });

    const [filterValues, setFilterValues] =
        useState<ManagementFixedScheduleListValidation>({
            day: '',
            doctorId: '',
            endTime: '',
            roomId: '',
            startTime: ''
        });

    const api = new ManagementScheduleAPI();

    const { data, isLoading, refetch } = useQuery({
        queryFn: () =>
            api.getFixedScheduleList({
                ...filterValues,
                pageSize: pagination.pageSize,
                pageNumber: pagination.pageIndex + 1
            }),
        queryKey: [
            'fixedschedule-list-management',
            filterValues,
            pagination.pageIndex,
            pagination.pageSize
        ],
        onError: () => {
            toast.error('Get fixed schedule error');
        }
    });

    const { openModal, closeModal } = useModal();

    const onSubmitFilter = (e: ManagementFixedScheduleListValidation) => {
        setFilterValues(() => e);
        setPagination(() => ({ pageIndex: 0, pageSize: 5 }));
        closeModal();
    };

    const onResetFilter = () => {
        setFilterValues(() => ({
            day: '',
            doctorId: '',
            endTime: '',
            roomId: '',
            startTime: ''
        }));

        setPagination(() => ({ pageIndex: 0, pageSize: 5 }));
        closeModal();
    };

    const handleOpenDialogAdd = () => {
        openModal(<AddModal refetch={refetch} />, {
            title: 'Tambah Jadwal Tetap'
        });
    };

    const handleOpenDialogFilter = () => {
        openModal(
            <FilterModal
                onSubmit={onSubmitFilter}
                onCancel={onResetFilter}
                defaultValues={filterValues}
            />,
            {
                title: 'Filter Jadwal Tetap'
            }
        );
    };

    return (
        <>
            <DashboardContent>
                <DashboardHeader title='Jadwal Tetap' />
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

export default ScheduleFixedManagementComponent;
