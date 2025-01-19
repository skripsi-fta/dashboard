'use client';

import type {
    ManagementSpesialisasiDokter,
    ManagementSpesialisasiDokterList
} from '@/infrastructure/models/management/spesialisasidokter';
import { ManagementSpecializationAPI } from '@/infrastructure/usecase/management/spesialisasidokter/ManagementSpecializationAPI';
import { DataTable } from '@/presentation/components/DataTable';
import DashboardActions from '@/presentation/layout/dashboard/actions';
import DashboardContent from '@/presentation/layout/dashboard/content';
import DashboardHeader from '@/presentation/layout/dashboard/header';
import { useModal } from '@/providers/ModalProvider';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import FilterModal from './components/FilterModal';
import AddModal from './components/AddModal';
import { Switch } from '@/presentation/ui/switch';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';
import { Button } from '@/presentation/ui/button';
import EditModal from './components/EditModal';
import { Pencil } from 'lucide-react';

const SpesialisasiDokterPage = () => {
    const api = new ManagementSpecializationAPI();

    const { mutate: switchStatus, isLoading: isLoadingSwitch } = useMutation({
        mutationFn: (id: number) => api.switch({ id }),
        onSuccess: () => {
            refetch();
        },
        onError: (res: AxiosError<{ message: string }>) => {
            toast.error(
                res.response?.data?.message ??
                    'Toggle status spesialisasi dokter error'
            );
        }
    });

    const columns: ColumnDef<ManagementSpesialisasiDokter.Response.Data>[] = [
        {
            accessorKey: 'no',
            size: 75,
            header: 'ID'
        },
        {
            accessorKey: 'photoPath',
            minSize: 200,
            header: 'Photo',
            cell: ({ row: { original } }) => {
                return (
                    <>
                        <div className='flex items-center gap-2'>
                            <img
                                src={`${process.env.NEXT_PUBLIC_API_URL}/storage?path=${original.photoPath}`}
                                className='h-[40px] w-auto'
                                alt='logo-spesialisasi'
                            />
                        </div>
                    </>
                );
            }
        },
        {
            accessorKey: 'name',
            minSize: 200,
            header: 'Nama'
        },
        {
            accessorKey: 'description',
            minSize: 250,
            header: 'Deskripsi Spesialisasi'
        },
        {
            accessorKey: 'doctorCount',
            minSize: 200,
            header: 'Jumlah Dokter',
            cell: ({ row: { original } }) => {
                return <>{original.doctorCount} Dokter</>;
            }
        },
        {
            accessorKey: 'isActive',
            minSize: 200,
            header: 'Status',
            cell: ({ row: { original } }) => {
                return (
                    <>
                        <div className='flex items-center gap-2'>
                            <Switch
                                disabled={isLoadingSwitch}
                                checked={Boolean(original.isActive)}
                                onCheckedChange={() =>
                                    switchStatus(original.id)
                                }
                                className='data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-400'
                            />
                            <p>{original.isActive ? 'Aktif' : 'Tidak Aktif'}</p>
                        </div>
                    </>
                );
            }
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
        useState<ManagementSpesialisasiDokterList>({
            description: '',
            name: ''
        });

    const { openModal, closeModal } = useModal();

    const onSubmitFilter = (e: ManagementSpesialisasiDokterList) => {
        setFilterValues(() => e);
        setPagination(() => ({ pageIndex: 0, pageSize: 5 }));
        closeModal();
    };

    const onResetFilter = () => {
        setFilterValues(() => ({ name: '', description: '' }));
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
                title: 'Filter Spesialisasi Dokter'
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
            'specialization-list-management',
            filterValues,
            pagination.pageIndex,
            pagination.pageSize
        ],
        onError: () => {
            toast.error('Get spesialisasi dokter error');
        }
    });

    const handleOpenDialogAdd = () => {
        openModal(<AddModal refetch={refetch} />, {
            title: 'Tambah Spesialisasi Dokter'
        });
    };

    return (
        <>
            <DashboardContent>
                <DashboardHeader title='Daftar Spesialisasi' />
                <DashboardActions
                    filterButtonProps={{
                        label: 'Filter Spesialisasi',
                        loading: isLoading,
                        onClick: handleOpenDialogFilter
                    }}
                    addButtonProps={{
                        label: 'Tambah Spesialisasi',
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

export default SpesialisasiDokterPage;
