'use client';

import type {
    ManagementStaff,
    ManagementStaffListValidation
} from '@/infrastructure/models/management/staff';
import { ManagementStaffAPI } from '@/infrastructure/usecase/management/staff/ManagementStaffAPI';
import { DataTable } from '@/presentation/components/DataTable';
import DashboardActions from '@/presentation/layout/dashboard/actions';
import DashboardContent from '@/presentation/layout/dashboard/content';
import DashboardHeader from '@/presentation/layout/dashboard/header';
import { Button } from '@/presentation/ui/button';
import { useModal } from '@/providers/ModalProvider';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import FilterModal from './components/FilterModal';
import AddModal from './components/AddModal';
import EditModal from './components/EditModal';
import DeleteModal from './components/DeleteModal';
import { toast } from 'sonner';

const ManagementUserPage = () => {
    const columns: ColumnDef<ManagementStaff.Response.Data>[] = [
        {
            accessorKey: 'no',
            size: 75,
            header: 'ID'
        },
        {
            accessorKey: 'username',
            size: 200,
            header: 'Username'
        },
        {
            accessorKey: 'name',
            size: 300,
            header: 'Name'
        },
        {
            accessorKey: 'email',
            size: 300,
            header: 'Email'
        },
        {
            accessorKey: 'role',
            size: 200,
            header: 'Role'
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
                                            email: original.email,
                                            id: original.id,
                                            name: original.name,
                                            role: original.role as any,
                                            username: original.username
                                        }}
                                        refetch={refetch}
                                    />,
                                    { title: 'Edit Staff' }
                                )
                            }
                        >
                            <Pencil className='text-primaryblue' />
                        </Button>

                        <Button
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
                        </Button>
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
        useState<ManagementStaffListValidation>({
            email: '',
            name: '',
            role: ''
        });

    const api = new ManagementStaffAPI();

    const { data, isLoading, refetch } = useQuery({
        queryFn: () =>
            api.getList({
                ...filterValues,
                pageSize: pagination.pageSize,
                pageNumber: pagination.pageIndex + 1
            }),
        queryKey: [
            'staff-list-management',
            filterValues,
            pagination.pageIndex,
            pagination.pageSize
        ],
        onError: () => {
            toast.error('Get staff error');
        }
    });

    const { openModal, closeModal } = useModal();

    const onSubmitFilter = (e: ManagementStaffListValidation) => {
        setFilterValues(() => e);
        setPagination(() => ({ pageIndex: 0, pageSize: 5 }));
        closeModal();
    };

    const onResetFilter = () => {
        setFilterValues(() => ({ email: '', name: '', role: '' }));
        setPagination(() => ({ pageIndex: 0, pageSize: 5 }));
        closeModal();
    };

    const handleOpenDialogFilter = () => {
        openModal(
            <FilterModal
                onSubmit={onSubmitFilter}
                defaultValues={filterValues}
                onCancel={onResetFilter}
            />,
            {
                title: 'Filter Staff'
            }
        );
    };

    const handleOpenDialogAdd = () => {
        openModal(<AddModal refetch={refetch} />, { title: 'Tambah Staff' });
    };

    return (
        <>
            <DashboardContent>
                <DashboardHeader title='Daftar Staff' />
                <DashboardActions
                    filterButtonProps={{
                        label: 'Filter Staff',
                        loading: isLoading,
                        onClick: handleOpenDialogFilter
                    }}
                    addButtonProps={{
                        label: 'Tambah Staff',
                        onClick: handleOpenDialogAdd
                    }}
                />
            </DashboardContent>

            <DashboardContent>
                <DataTable
                    columns={columns}
                    data={data?.data ?? []}
                    totalData={data?.totalRows ?? 0}
                    tableProps={{
                        className: 'my-2 overflow-auto text-[15px] text-black'
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

export default ManagementUserPage;
