import type {
    ManagementReport,
    ReportPharmacyCashierValidation
} from '@/infrastructure/models/management/report';
import { ManagementReportAPI } from '@/infrastructure/usecase/management/report/ManagementReportAPI';
import dayjsUtils from '@/lib/dayjs';
import { cn } from '@/lib/utils';
import CustomButtonComponent from '@/presentation/components/CustomButton';
import Spinner from '@/presentation/components/Spinner';
import { useModal } from '@/providers/ModalProvider';
import { monthDropdownData } from '@/shared/constant';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import FilterModalPharmacyCashier from '../Component/ModalFilterCashierPharmacy';
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from '@/presentation/ui/chart';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Pie,
    PieChart,
    XAxis,
    YAxis
} from 'recharts';
import { toast } from 'sonner';
import { DataTable } from '@/presentation/components/DataTable';

const PharmacyReportComponent = () => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });

    const [filterValues, setFilterValues] =
        useState<ReportPharmacyCashierValidation>({
            endDate: dayjsUtils()
                .endOf('month')
                .add(30, 'days')
                .format('YYYY-MM-DD'),
            startDate: dayjsUtils().format('YYYY-MM-DD'),
            month: (dayjsUtils().month() + 1).toString().padStart(2, '0'),
            // weekly, monthly, yearly or empty
            type: 'monthly',
            year: dayjsUtils().year().toString()
        });

    const { openModal, closeModal } = useModal();

    const managementReportAPI = new ManagementReportAPI();

    const { data: dataSummary, isLoading: isLoadingSummary } = useQuery({
        queryKey: ['pharmacy-summary', filterValues, 'pharmacy'],
        queryFn: () => managementReportAPI.getPharmacySummary(filterValues),
        onError: () => {
            toast.error('Get pharmacy report error');
        }
    });

    const { data: dataList, isLoading: isLoadingList } = useQuery({
        queryKey: ['pharmacy-summary', filterValues, pagination, 'pharmacy'],
        queryFn: () =>
            managementReportAPI.getPharmacyData({
                ...filterValues,
                pageSize: pagination.pageSize,
                pageNumber: pagination.pageIndex + 1
            }),
        onError: () => {
            toast.error('Get pharmacy report error');
        }
    });

    const onSubmitFilter = (e: ReportPharmacyCashierValidation) => {
        setFilterValues(() => e);
        setPagination(() => ({ pageIndex: 0, pageSize: 5 }));
        closeModal();
    };

    const onResetFilter = () => {
        setFilterValues(() => ({
            endDate: dayjsUtils()
                .endOf('month')
                .add(30, 'days')
                .format('YYYY-MM-DD'),
            startDate: dayjsUtils().format('YYYY-MM-DD'),
            month: (dayjsUtils().month() + 1).toString().padStart(2, '0'),
            // weekly, monthly, yearly or range
            type: 'monthly',
            year: dayjsUtils().year().toString()
        }));

        setPagination(() => ({ pageIndex: 0, pageSize: 5 }));
        closeModal();
    };

    const handleOpenDialogFilter = () => {
        openModal(
            <FilterModalPharmacyCashier
                defaultValues={filterValues}
                onSubmit={onSubmitFilter}
                onCancel={onResetFilter}
            />,
            { title: 'Filter Jadwal' }
        );
    };

    const pieChartConfig = {
        bawah: {
            label: 'Waktu menunggu di bawah rata - rata',
            color: '#3366CC'
        },
        atas: {
            label: 'Waktu menunggu di atas rata - rata',
            color: '#FF872E'
        }
    };

    const columns: ColumnDef<ManagementReport.Response.Data>[] = [
        {
            accessorKey: 'no',
            size: 75,
            header: 'ID'
        },
        {
            accessorKey: 'patientName',
            size: 150,
            header: 'Nama Pasien'
        },
        {
            accessorKey: 'doctorName',
            size: 150,
            header: 'Dokter'
        },
        {
            accessorKey: 'specializationName',
            size: 150,
            header: 'Spesialis'
        },
        {
            accessorKey: 'roomName',
            size: 150,
            header: 'Ruangan'
        },
        {
            accessorKey: 'scheduleTime',
            size: 150,
            header: 'Jadwal Janji Temu'
        },
        {
            accessorKey: 'startTime',
            size: 150,
            header: 'Waktu Mulai Farmasi'
        },
        {
            accessorKey: 'endTime',
            size: 150,
            header: 'Waktu Selesai Farmasi'
        }
    ];

    return (
        <>
            <div className='flex flex-col gap-6'>
                <div className='flex flex-row items-center gap-4'>
                    <p className='text-2xl font-semibold capitalize text-[#343C6A]'>
                        Menunjukan data untuk{' '}
                        {filterValues.type === 'range'
                            ? `${filterValues.startDate} - ${filterValues.endDate}`
                            : filterValues.type === 'weekly'
                              ? `${filterValues.startDate} (weekly)`
                              : `${monthDropdownData.find((d) => d.value === filterValues.month)?.label}  ${filterValues.year} (${filterValues.type})`}
                    </p>

                    <CustomButtonComponent
                        variant={'filterButton'}
                        className={cn(
                            'h-[40px] w-full justify-start md:w-[150px]'
                        )}
                        onClick={handleOpenDialogFilter}
                    >
                        <Search className='mr-2 size-6' />
                        Filter
                    </CustomButtonComponent>
                </div>

                {isLoadingSummary ? (
                    <Spinner color='black' size={72} />
                ) : (
                    <>
                        {!dataSummary?.summaryData ? (
                            <p className='text-center text-2xl text-red-500'>
                                Data tidak ditemukan
                            </p>
                        ) : (
                            <>
                                <div className='flex flex-col gap-3'>
                                    <p className='text-2xl font-semibold text-[#343C6A]'>
                                        Performa Antrian Farmasi
                                    </p>
                                    <div className='flex w-full flex-col justify-between gap-4 rounded-[16px] bg-white p-6 md:flex-row'>
                                        <div className='flex flex-1 flex-col gap-2'>
                                            <p className='text-3xl font-semibold text-[#343C6A]'>
                                                {
                                                    dataSummary.summaryData
                                                        .avgWaitTime
                                                }
                                            </p>
                                            <p className='text-xl font-semibold text-[#888888]'>
                                                Rata-rata Waktu Menunggu Antrian
                                            </p>
                                        </div>

                                        <div className='flex flex-1 flex-col gap-2'>
                                            <p className='text-3xl font-semibold text-[#343C6A]'>
                                                {
                                                    dataSummary.summaryData
                                                        .maxWaitTime
                                                }
                                            </p>
                                            <p className='text-xl font-semibold text-[#888888]'>
                                                Maksimal Waktu Tunggu
                                            </p>
                                        </div>

                                        <div className='flex flex-1 flex-col gap-2'>
                                            <p className='text-3xl font-semibold text-[#343C6A]'>
                                                {
                                                    dataSummary.summaryData
                                                        .minWaitTime
                                                }
                                            </p>
                                            <p className='text-xl font-semibold text-[#888888]'>
                                                Minimal Waktu Tunggu
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-row items-center gap-4'>
                                    <div className='flex h-full flex-1 flex-col gap-3 rounded-[16px] bg-white p-6'>
                                        <p className='text-xl font-semibold text-[#343C6A] md:text-2xl'>
                                            Rata-rata Waktu Menunggu Farmasi
                                            Tiap Jam (dalam menit)
                                        </p>
                                        <ChartContainer
                                            config={{
                                                count: {
                                                    label: 'Waktu Menunggu',
                                                    color: '#3B41E3'
                                                }
                                            }}
                                        >
                                            <BarChart
                                                accessibilityLayer
                                                data={dataSummary.dataBar}
                                            >
                                                <CartesianGrid
                                                    vertical={false}
                                                />

                                                <XAxis
                                                    dataKey='minute'
                                                    tickLine={false}
                                                    tickMargin={10}
                                                    axisLine={false}
                                                />

                                                <YAxis />

                                                <ChartTooltip
                                                    content={
                                                        <ChartTooltipContent />
                                                    }
                                                />

                                                <ChartLegend
                                                    content={
                                                        <ChartLegendContent />
                                                    }
                                                />

                                                <Bar
                                                    dataKey='count'
                                                    fill='#3B41E3'
                                                    radius={2}
                                                />
                                            </BarChart>
                                        </ChartContainer>
                                    </div>
                                    <div className='flex h-full flex-1 flex-col gap-3 rounded-[16px] bg-white p-6'>
                                        <p className='text-xl font-semibold text-[#343C6A] md:text-2xl'>
                                            Kategori Waktu Menunggu Farmasi
                                        </p>

                                        <ChartContainer config={pieChartConfig}>
                                            <PieChart>
                                                <Pie
                                                    data={[
                                                        {
                                                            kategori: 'atas',
                                                            count: dataSummary.aboveAverage,
                                                            fill: '#FF872E'
                                                        },
                                                        {
                                                            kategori: 'bawah',
                                                            count: dataSummary.belowAverage,
                                                            fill: '#3366CC'
                                                        }
                                                    ]}
                                                    nameKey={'kategori'}
                                                    dataKey='count'
                                                    label
                                                ></Pie>
                                                <ChartTooltip
                                                    content={
                                                        <ChartTooltipContent
                                                            hideLabel
                                                        />
                                                    }
                                                />

                                                <ChartLegend
                                                    content={
                                                        <ChartLegendContent nameKey='kategori' />
                                                    }
                                                    className='-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center'
                                                />
                                            </PieChart>
                                        </ChartContainer>
                                    </div>
                                </div>

                                <div className='flex flex-col gap-4 rounded-[16px] bg-white p-6'>
                                    <p className='text-xl font-semibold text-[#343C6A] md:text-2xl'>
                                        Laporan
                                    </p>

                                    <DataTable
                                        columns={columns}
                                        data={dataList?.data ?? []}
                                        totalData={dataList?.totalRows ?? 0}
                                        tableProps={{
                                            className:
                                                'my-2 overflow-auto text-[15px] text-black'
                                        }}
                                        tableHeaderProps={{
                                            className: 'text-black'
                                        }}
                                        tableRowHeaderProps={{
                                            className: 'border-none text-black '
                                        }}
                                        tableRowProps={{
                                            className: 'border-b-0'
                                        }}
                                        initialState={{
                                            columnVisibility: { diff: true }
                                        }}
                                        paginationProps={pagination}
                                        setPagination={setPagination}
                                        isLoading={isLoadingList}
                                    />
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default PharmacyReportComponent;
