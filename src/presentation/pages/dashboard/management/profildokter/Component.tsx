'use client';

import type {
    ManagementDoctorProfile,
    ManagementDoctorProfileList
} from '@/infrastructure/models/management/doctorprofile';
import { ManagementDoctorProfileAPI } from '@/infrastructure/usecase/management/doctorprofile/ManagementDoctorProfileAPI';
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
import { Pencil, Trash2 } from 'lucide-react';
import EditModal from './components/EditModal';
import DeleteModal from './components/DeleteModal';
import { toast } from 'sonner';

const ManagementProfilDokterPage = () => {
    const columns: ColumnDef<ManagementDoctorProfile.Response.Data>[] = [
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
                                className='h-full w-auto'
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
            accessorKey: 'profile',
            minSize: 200,
            header: 'Profil Dokter'
        },
        {
            accessorKey: 'specializationName',
            minSize: 200,
            header: 'Spesialisasi'
        },
        {
            accessorKey: 'specializationDescription',
            minSize: 250,
            header: 'Deskripsi Spesialisasi'
        },
        {
            accessorKey: 'consulePrice',
            minSize: 175,
            header: 'Harga Konsultasi',
            cell: ({ row: { original } }) => {
                return <>Rp{original.consulePrice}</>;
            }
        },
        {
            accessorKey: 'totalRating',
            minSize: 150,
            header: 'Total Rating'
        },
        {
            accessorKey: 'rating',
            minSize: 125,
            header: 'Rating'
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
                                            consulePrice: original.consulePrice,
                                            id: original.id,
                                            name: original.name,
                                            profile: original.profile,
                                            specializationId:
                                                `${original.specializationId}` ??
                                                '',
                                            photoPath: original.photoPath
                                        }}
                                        refetch={refetch}
                                    />,
                                    {
                                        title: 'Update Dokter'
                                    }
                                )
                            }
                        >
                            <Pencil className='text-primaryblue' />
                        </Button>

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

    const api = new ManagementDoctorProfileAPI();

    const [filterValues, setFilterValues] =
        useState<ManagementDoctorProfileList>({
            name: '',
            sortBy: ''
        });

    const { data, isLoading, refetch } = useQuery({
        queryFn: () =>
            api.getList({
                ...filterValues,
                pageSize: pagination.pageSize,
                pageNumber: pagination.pageIndex + 1
            }),
        queryKey: [
            'doctor-profile-list-management',
            filterValues,
            pagination.pageIndex,
            pagination.pageSize
        ],
        onError: () => {
            toast.error('Get profil dokter error');
        }
    });

    const { openModal, closeModal } = useModal();

    const onSubmitFilter = (e: ManagementDoctorProfileList) => {
        setFilterValues(() => e);
        setPagination(() => ({ pageIndex: 0, pageSize: 5 }));
        closeModal();
    };

    const onResetFilter = () => {
        setFilterValues(() => ({ name: '', sortBy: '' }));
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
                title: 'Filter Dokter'
            }
        );
    };

    const handleOpenDialogAdd = () => {
        openModal(<AddModal refetch={refetch} />, { title: 'Tambah Dokter' });
    };

    return (
        <>
            <DashboardContent>
                <DashboardHeader title='Daftar Dokter' />
                <DashboardActions
                    filterButtonProps={{
                        label: 'Filter Dokter',
                        loading: isLoading,
                        onClick: handleOpenDialogFilter
                    }}
                    addButtonProps={{
                        label: 'Tambah Dokter',
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

export default ManagementProfilDokterPage;
