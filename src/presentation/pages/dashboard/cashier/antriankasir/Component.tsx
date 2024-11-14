'use client';

import type { ManagementCashier } from '@/infrastructure/models/management/cashier';
import { ManagementCashierAPI } from '@/infrastructure/usecase/cashier/ManagementCashierAPI';
import CustomButtonComponent from '@/presentation/components/CustomButton';
import { DataTable } from '@/presentation/components/DataTable';
import DashboardContent from '@/presentation/layout/dashboard/content';
import { useModal } from '@/providers/ModalProvider';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'sonner';
import PaymentPatientModal from './components/PaymentPatientModal';
import { formatRupiah } from '@/lib/utils';
import Spinner from '@/presentation/components/Spinner';

const QueueCashierPage = () => {
    const columns: ColumnDef<ManagementCashier.Response.Data>[] = [
        {
            accessorKey: 'cashierQueue.queueNumber',
            size: 80,
            header: 'No. Antrian'
        },
        {
            accessorKey: 'patient.name',
            size: 150,
            header: 'Nama Pasien'
        },
        {
            accessorKey: 'schedule.doctor.consulePrice',
            size: 150,
            header: 'Biaya Konsultasi',
            cell: ({ row: { original } }) =>
                formatRupiah(original.schedule.doctor.consulePrice)
        },
        {
            accessorKey: 'pharmacyFee',
            size: 150,
            header: 'Biaya Apotek',
            cell: ({ row: { original } }) => formatRupiah(original.pharmacyFee)
        },
        {
            size: 150,
            header: 'Total Biaya',
            cell: ({ row: { original } }) =>
                formatRupiah(
                    Number(
                        Number(original.pharmacyFee) +
                            original.schedule.doctor.consulePrice
                    )
                )
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
        openModal(
            <PaymentPatientModal
                data={data}
                refetch={refetch}
                refetch2={refetchDetailData}
            />,
            { title: 'Pembayaran Pasien' }
        );
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
            }),
        queryKey: [
            'cashier-queue-list-management',
            pagination.pageIndex,
            pagination.pageSize
        ],
        onError: () => {
            toast.error('Get pasient error');
        }
    });

    const {
        data: detailData,
        isLoading: loadingDetailData,
        isError: errorDetailData,
        refetch: refetchDetailData
    } = useQuery({
        queryFn: () => api.getDetailQueue(),
        queryKey: ['cashier-queue-detail'],
        onError: () => {
            toast.error('Get detail error');
        }
    });

    return (
        <>
            <div className='flex flex-row justify-between'>
                <h1 className='text-xl'>Rangkuman Terkini</h1>
            </div>

            {loadingDetailData || errorDetailData ? (
                <>
                    <div className='flex size-full items-center justify-center'>
                        <Spinner size={40} color='#3B41E3' />
                    </div>
                </>
            ) : (
                <div className='flex w-full flex-col-reverse gap-8 lg:flex-row'>
                    <div className='flex w-full flex-col items-center gap-2 rounded-lg bg-white p-5 lg:w-[250px]'>
                        <p className='text-lg font-semibold'>
                            Total Antrian Kasir
                        </p>
                        <p className='text-2xl font-semibold text-primaryblue'>
                            {detailData?.data.total}
                        </p>
                    </div>

                    <div className='flex w-full flex-col items-center gap-2 rounded-lg bg-white p-5 lg:w-[250px]'>
                        <p className='text-lg font-semibold'>
                            Antrian Menunggu
                        </p>
                        <p className='text-2xl font-semibold text-primaryblue'>
                            {detailData?.data.totalwaiting}
                        </p>
                    </div>

                    <div className='flex w-full flex-col items-center gap-2 rounded-lg bg-white p-5 lg:w-[250px]'>
                        <p className='text-lg font-semibold'>Antrian Selesai</p>
                        <p className='text-2xl font-semibold text-primaryblue'>
                            {detailData?.data.totalfinished}
                        </p>
                    </div>
                </div>
            )}

            <h1 className='text-xl'>Detail Antrian</h1>

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
