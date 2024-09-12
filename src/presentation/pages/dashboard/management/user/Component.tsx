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

const ManagementUserPage = () => {
    const columns: ColumnDef<ManagementStaff.Response.Data>[] = [
        {
            accessorKey: 'id',
            size: 75,
            header: 'ID'
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
            cell: () => {
                return (
                    <div className='flex flex-row items-center'>
                        <Button variant={'ghost'}>
                            <Pencil className='text-primaryblue' />
                        </Button>

                        <Button variant={'ghost'}>
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

    const [filterValues] = useState<ManagementStaffListValidation>({
        email: '',
        name: '',
        role: ''
    });

    const api = new ManagementStaffAPI();

    const { data, isLoading } = useQuery({
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
        ]
    });

    console.log(data);

    const { openModal } = useModal();

    const handleOpenDialog = () => {
        openModal(<>modal tambah user</>, {
            title: 'Tambah User',
            disableClickOutside: true
        });
    };

    return (
        <>
            <DashboardContent>
                <DashboardHeader title='Daftar User' />
                <DashboardActions
                    filterButtonProps={{
                        label: 'Filter User',
                        onClick: () => console.log('filter')
                    }}
                    addButtonProps={{
                        label: 'Tambah User',
                        onClick: handleOpenDialog
                    }}
                />
            </DashboardContent>

            <DashboardContent>
                <DataTable
                    columns={columns}
                    data={data?.data ?? []}
                    totalData={data?.totalData ?? 0}
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
