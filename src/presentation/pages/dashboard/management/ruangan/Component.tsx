'use client';

import type {
    ManagementRuangan,
    ManagementRuanganList
} from '@/infrastructure/models/management/ruangan';
import { DataTable } from '@/presentation/components/DataTable';
import DashboardActions from '@/presentation/layout/dashboard/actions';
import DashboardContent from '@/presentation/layout/dashboard/content';
import DashboardHeader from '@/presentation/layout/dashboard/header';
import { useModal } from '@/providers/ModalProvider';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';
import { useState } from 'react';
import { useQuery } from 'react-query';
import FilterModal from './components/FilterModal';
import AddModal from './components/AddModal';
import { Button } from '@/presentation/ui/button';
import EditModal from './components/EditModal';
import { Pencil } from 'lucide-react';
import { ManagementRuanganAPI } from '@/infrastructure/usecase/management/ruangan/ManagementRuanganAPI';

const RuanganPage = () => {
    const api = new ManagementRuanganAPI();

    const columns: ColumnDef<ManagementRuangan.Response.Data>[] = [
        {
            accessorKey: 'no',
            size: 75,
            header: 'ID'
        },
        {
            accessorKey: 'name',
            size: 200,
            header: 'Nama Ruangan'
        },
        {
            header: 'Action',
            size: 100,
            cell: ({ row: { original } }) => {
                return (
                    <div className='flex flex-row items-center'>
                        <Button
                            variant={'ghost'}
                            onClick={() =>
                                openModal(
                                    <EditModal
                                        defaultValues={{
                                            ...original
                                        }}
                                        refetch={refetch}
                                    />,
                                    {}
                                )
                            }
                        >
                            <Pencil className='text-primaryblue' />
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
        useState<ManagementRuanganList>({
            name: ''
        });

    const { openModal, closeModal } = useModal();

    const onSubmitFilter = (e: ManagementRuanganList) => {
        setFilterValues(() => e);
        setPagination(() => ({ pageIndex: 0, pageSize: 5 }));
        closeModal();
    };

    const onResetFilter = () => {
        setFilterValues(() => ({ name: ''}));
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
                title: 'Filter Ruangan'
            }
        );
    };

    const { data, isLoading, refetch } = useQuery({
        queryFn: () =>
            api.getList({
                ...filterValues,
                pageSize: pagination.pageSize,
                pageNumber: pagination.pageIndex + 1
            }),
        queryKey: [
            'ruangan-list-management',
            filterValues,
            pagination.pageIndex,
            pagination.pageSize
        ]
    });

    const handleOpenDialogAdd = () => {
        openModal(<AddModal refetch={refetch} />, {
            title: 'Tambah Ruangan'
        });
    };

    return (
        <>
            <DashboardContent>
                <DashboardHeader title='Daftar Ruangan' />
                <DashboardActions
                    filterButtonProps={{
                        label: 'Filter Ruangan',
                        loading: isLoading,
                        onClick: handleOpenDialogFilter
                    }}
                    addButtonProps={{
                        label: 'Tambah Ruangan',
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

export default RuanganPage;
