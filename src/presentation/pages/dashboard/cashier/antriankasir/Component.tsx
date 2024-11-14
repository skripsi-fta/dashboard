'use client';

import type { ManagementCashier } from '@/infrastructure/models/management/cashier';
import { ManagementCashierAPI } from '@/infrastructure/usecase/management/cashier/ManagementCashierAPI';
import CustomButtonComponent from '@/presentation/components/CustomButton';
import { DataTable } from '@/presentation/components/DataTable';
import DashboardContent from '@/presentation/layout/dashboard/content';
import { useModal } from '@/providers/ModalProvider';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'sonner';
import PaymentPatientModal from './components/PaymentPatientModal';

const QueueCashierPage = () => {

    const columns: ColumnDef<ManagementCashier.Response.Data>[] = [
        {
            accessorKey: 'cashierQueue.queueNumber',
            size: 35,
            header: 'No Antrian'
        },
        {
            accessorKey: 'patient.name',
            size: 100,
            header: 'Nama Pasein'
        },
        {
            accessorKey: 'consultationFee',
            size: 75,
            header: 'Biaya Konsultasi'
        },
        {
            accessorKey: 'pharmacyFee',
            size: 75,
            header: 'Biaya Apotek'
        },
        {
            accessorKey: 'row',
            accessorFn: (row) => String(Number(row.consultationFee) + Number(row.pharmacyFee)),
            size: 75,
            header: 'Total Biaya'
        },
        {
            accessorKey: 'action',
            size: 150,
            header: 'Aksi',
            cell: ({ row: { original } }) => {
                return (
                    <CustomButtonComponent
                        className='w-[125px] rounded-[10px] bg-primaryblue font-bold text-white hover:bg-primaryblue/70'
                        onClick={() => {
                            openPaymentModal(original);
                        }}
                    >
                        Payment
                    </CustomButtonComponent>
                );
            }
        }
    ];

    const { openModal } = useModal();

    const openPaymentModal = (data: ManagementCashier.Response.Data) => {
        openModal(<PaymentPatientModal data={data} refetch={refetch} refetch2={refetchDetailData}/>, { title: 'Payment Checkout' });
    };

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5
    });

    const api = new ManagementCashierAPI();

    const { data, isLoading, refetch } = useQuery({
        queryFn: () =>
            api.getList({
                    pageSize: pagination.pageSize,
                    pageNumber: pagination.pageIndex + 1
                }
            ),
        queryKey: [
            'cashier-queue-list-management',
            pagination.pageIndex,
            pagination.pageSize
        ],
        onError: () => {
            toast.error('Get pasient error');
        }
    });

    const { data: detailData, isLoading: loadingDetailData, refetch: refetchDetailData } = useQuery({
        queryFn: () => api.getDetailQueue(),
        queryKey: ['cashier-queue-detail'],
        onError: () => {
            toast.error('Get detail error');
        }
    });

    return (
        <>
            <div className='flex flex-row justify-between'>
                <h1 className='text-xl text-gray-500'>Rangkuman Terkini</h1>
            </div>
            <div className="flex flex-wrap items-center gap-2">
                <div className='gap-8 rounded-lg bg-white p-6 shadow-md md:px-8'>
                    <h2 className='text-xl font-semibold'>Total Antrian</h2>
                    <p className='text-center text-xl font-semibold text-primaryblue'>{detailData?.data.total}</p>
                </div>
                <div className='gap-8 rounded-lg bg-white p-6 shadow-md md:px-8'>
                    <h2 className='text-xl font-semibold'>Antrian Menunggu</h2>
                    <p className='text-center text-xl font-semibold text-primaryblue'>{detailData?.data.totalwaiting}</p>
                </div>
                <div className='gap-8 rounded-lg bg-white p-6 shadow-md md:px-8'>
                    <h2 className='text-xl font-semibold'>Antrian Selesai</h2>
                    <p className='text-center text-xl font-semibold  text-primaryblue'>{detailData?.data.totalfinished}</p>
                </div>
            </div>
            <div className='flex'>
                <h1 className='text-xl text-gray-500'>Detail Antrian</h1>
            </div>
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

export default QueueCashierPage;
