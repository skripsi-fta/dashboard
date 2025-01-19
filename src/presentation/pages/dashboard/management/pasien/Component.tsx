'use client';

import type {
    ManagementPatient,
    ManagementPatientListValidation
} from '@/infrastructure/models/management/pasien';
import { ManagementPasienAPI } from '@/infrastructure/usecase/management/pasien/ManagementPasienAPI';
import dayjsUtils from '@/lib/dayjs';
import { DataTable } from '@/presentation/components/DataTable';
import DashboardActions from '@/presentation/layout/dashboard/actions';
import DashboardContent from '@/presentation/layout/dashboard/content';
import DashboardHeader from '@/presentation/layout/dashboard/header';
import { useModal } from '@/providers/ModalProvider';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'sonner';
import FilterModal from './components/FilterModal';
import AddModal from './components/AddModal';
import { identityType } from '@/shared/constant';
import { Button } from '@/presentation/ui/button';
import { Pencil } from 'lucide-react';
import EditModal from './components/EditModal';
import { useRouter, useSearchParams } from 'next/navigation';

const PasienManagementComponent = () => {
    const columns: ColumnDef<ManagementPatient.Response.Data>[] = [
        {
            accessorKey: 'no',
            size: 75,
            header: 'ID'
        },
        {
            accessorKey: 'name',
            size: 300,
            header: 'Nama'
        },
        {
            accessorKey: 'address',
            size: 300,
            header: 'Alamat'
        },
        {
            accessorKey: 'dateOfBirth',
            size: 250,
            header: 'Tanggal Lahir',
            cell: ({ row: { original } }) => {
                return (
                    <>{dayjsUtils(original.dateOfBirth).format('DD-MM-YYYY')}</>
                );
            }
        },
        {
            accessorKey: 'gender',
            size: 200,
            header: 'Jenis Kelamin'
        },
        {
            accessorKey: 'idType',
            size: 200,
            header: 'Tipe Identitas',
            cell: ({ row: { original } }) => (
                <>{identityType[original.idType]}</>
            )
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
                                            id: original.id,
                                            address: original.address,
                                            dateOfBirth: original.dateOfBirth,
                                            gender: original.gender,
                                            idNumber: original.idNumber,
                                            idType: original.idType,
                                            name: original.name
                                        }}
                                        refetch={refetch}
                                    />,
                                    {
                                        title: 'Edit Pasien'
                                    }
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
        useState<ManagementPatientListValidation>({
            gender: '',
            idNumber: '',
            idType: '',
            name: ''
        });

    const api = new ManagementPasienAPI();

    const { data, isLoading, refetch } = useQuery({
        queryFn: () =>
            api.getList({
                ...filterValues,
                pageSize: pagination.pageSize,
                pageNumber: pagination.pageIndex + 1
            }),
        queryKey: [
            'pasien-list-management',
            filterValues,
            pagination.pageIndex,
            pagination.pageSize
        ],
        onError: () => {
            toast.error('Get pasien error');
        }
    });

    const { openModal, closeModal } = useModal();

    const onSubmitFilter = (e: ManagementPatientListValidation) => {
        setFilterValues(() => e);
        setPagination(() => ({ pageIndex: 0, pageSize: 5 }));
        closeModal();
    };

    const onResetFilter = () => {
        setFilterValues(() => ({
            gender: '',
            idNumber: '',
            idType: '',
            name: ''
        }));
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
                title: 'Filter Pasien'
            }
        );
    };

    const handleOpenDialogAdd = () => {
        openModal(<AddModal refetch={refetch} />, { title: 'Tambah Pasien' });
    };

    const searchParams = useSearchParams();

    const action = searchParams.get('action');

    const router = useRouter();

    useEffect(() => {
        if (action && action === 'add') {
            handleOpenDialogAdd();
            router.replace('/dashboard/management/pasien');
        }
    }, [action]);

    return (
        <>
            <DashboardContent>
                <DashboardHeader title='Daftar Pasien' />
                <DashboardActions
                    filterButtonProps={{
                        label: 'Filter Pasien',
                        loading: isLoading,
                        onClick: handleOpenDialogFilter
                    }}
                    addButtonProps={{
                        label: 'Tambah Pasien',
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

export default PasienManagementComponent;
