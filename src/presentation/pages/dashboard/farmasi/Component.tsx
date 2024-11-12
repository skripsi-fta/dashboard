'use client';
import { PharmacyQueue, PharmacyQueueUpdate, pharmacyQueueUpdateValidation } from "@/infrastructure/models/pharmacy";
import { PharmacyQueueAPI } from "@/infrastructure/usecase/pharmacy/PharmacyQueueAPI";
import CustomButtonComponent from "@/presentation/components/CustomButton";
import { DataTable } from "@/presentation/components/DataTable";
import Spinner from "@/presentation/components/Spinner";
import TextFieldInput from "@/presentation/components/TextfieldInput";
import DashboardContent from "@/presentation/layout/dashboard/content"
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { AxiosError } from "axios";
import { MapPin } from 'lucide-react';
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const PharmacyQueuePage = () => {
    const api = new PharmacyQueueAPI();

    const [detail, setDetail] = useState<PharmacyQueue.Response.Data | null>(null);

    const { control, handleSubmit } = useForm<PharmacyQueueUpdate>({
        defaultValues: { pharmacyFee: 0, appointmentId: 0 },
        resolver: zodResolver(pharmacyQueueUpdateValidation)
    });

    const {
        mutate: updateQueue,
    } = useMutation({
        mutationFn: (data: PharmacyQueue.Request.Update) =>
            api.updatePharmacyQueue(data),
        onSuccess: () => {
            toast.success('Antrian berhasil diselesaikan');
            refetch();
            refetch2();
            setDetail(() => null);
        },
        onError: (res: AxiosError<{ message: string }>) => {
            toast.error(res.response?.data?.message ?? 'Selesaikan antrian error');
        }
    });

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5
    });

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['list-pharmacy-queue', pagination],
        queryFn: () =>
            api.getPharmacyQueueList({
                pageSize: pagination.pageSize,
                pageNumber: pagination.pageIndex + 1,
            }),
        onError: () => {
            toast.error('Get list pharmacy error');
        }
    });

    const {
        data: detailQueue,
        isLoading: loadingDetailQueue,
        isError: errorDetailQueue,
        refetch: refetch2
    } = useQuery({
        queryKey: [
            'detail-pharmacy-queue',
        ],
        queryFn: () => api.getCurrentPharmacyQueue(),
        onError: () => {
            toast.error('Get detail count pharmacy queue error');
        }
    });

    const columns: ColumnDef<PharmacyQueue.Response.Data>[] = [
        {
            accessorKey: 'pharmacyQueue.queueNumber',
            size: 80,
            header: 'No. Antrian',
            cell: ({ row: { original } }) => {
                return (
                    <p className="font-semibold text-primaryblue">
                        {original.pharmacyQueue.queueNumber}
                    </p>
                );
            }
        },
        {
            accessorKey: 'patient.name',
            size: 200,
            header: 'Nama Pasien'
        },
        {
            accessorKey: 'action',
            size: 100,
            header: 'Aksi',
            cell: ({ row: { original } }) => {
                return (
                    <CustomButtonComponent
                        className='w-[125px] rounded-[10px] bg-primaryblue font-bold text-white hover:bg-primaryblue/70'
                        onClick={() => {
                            setDetail(() => original)
                        }}
                    >
                        Update
                    </CustomButtonComponent>
                );
            }
        },
    ]

    return (
    <>
        <p className="text-xl">Rangkuman Terkini</p>
        {loadingDetailQueue || errorDetailQueue ? (
            <>
                <div className='flex size-full items-center justify-center'>
                    <Spinner size={40} color='#3B41E3' />
                </div>
            </>
        ) : (
            <div className="flex flex-row gap-8">
                <div className="flex w-[250px] flex-col items-center bg-white p-5 rounded-lg">
                    <p className="font-semibold">Total Antrian Farmasi</p>
                    <p className="text-2xl font-semibold text-primaryblue">{detailQueue?.data.total}</p>
                </div>

                <div className="flex w-[250px] flex-col items-center bg-white p-5 rounded-lg">
                    <p className="font-semibold">Antrian Menunggu</p>
                    <p className="text-2xl font-semibold text-primaryblue">{detailQueue?.data.totalWaiting}</p>
                </div>

                <div className="flex w-[250px] flex-col items-center bg-white p-5 rounded-lg">
                    <p className="font-semibold">Antrian Selesai</p>
                    <p className="text-2xl font-semibold text-primaryblue">{detailQueue?.data.totalFinished}</p>
                </div>
            </div>
        )}

        <div className="flex w-full flex-1 flex-col-reverse gap-8 lg:flex-row">
            <div className="min-w-0 lg:flex-[4] xl:flex-[3]">
                <p className="text-xl mb-5">Antrian Saat Ini</p>
                <div className="flex flex-col items-center bg-white w-[100%] pt-7 pb-7 pl-10 pr-10 rounded-lg gap-2">
                    <p className="font-semibold text-xl">Antrian Dipanggil</p>
                    {detail && (
                        <>
                            <p className="text-7xl font-semibold text-[#171CA1]">{detail.pharmacyQueue.queueNumber}</p>
                            <p className="font-medium">{detail.patient.name}</p>
                            <div className="flex gap-2">
                                <MapPin className='text-primaryblue'/>
                                <p className="font-medium text-primaryblue">{detail.schedule.room.name}</p>
                            </div>
                            <div className="flex items-center bg-[#B6B8F5] pt-1 pb-1 pl-5 pr-5 rounded-lg">
                                <p className="font-semibold text-white">dr. {detail.schedule.doctor.name}</p>
                            </div>
                            <div className="flex flex-col w-[100%]">
                                <p className="font-bold text-[#666666] mb-1">Resep</p>
                                {detail.medicalRecord.prescription && detail.medicalRecord.prescription.length > 0 ? (
                                    detail.medicalRecord.prescription.map((prescription, index) => (
                                        <TextFieldInput
                                            key={index}
                                            variant='modal'
                                            readOnly
                                            value={prescription}
                                            className="cursor-default mb-2"
                                        />
                                    ))
                                ) : (
                                    <p className="mb-1 text-[#666666]">Tidak ada resep</p>
                                )}
                            </div>
                            <form onSubmit={
                                handleSubmit((data) => {
                                const updatedData = {
                                    ...data,
                                    appointmentId: detail?.id ?? 0,
                                };
                                updateQueue(updatedData);
                            })} className="w-full">
                                <div className="flex flex-col w-[100%] gap-2">
                                    <p className="font-bold text-[#666666]">Biaya Obat</p>
                                    <Controller
                                        control={control}
                                        name='pharmacyFee'
                                        render={({ field, fieldState: { error } }) => (
                                            <TextFieldInput
                                                {...field}
                                                placeholder='Masukkan Biaya Obat'
                                                error={error}
                                                variant='modal'
                                                type='number'
                                            />
                                        )}
                                    />
                                </div>
                                <div className="w-full flex justify-center mt-5">
                                    <CustomButtonComponent
                                        className='w-[150px] rounded-[32px] bg-primaryblue font-semibold text-white hover:bg-primaryblue/70'
                                        type="submit"
                                    >
                                        Tandai Selesai
                                    </CustomButtonComponent>
                                </div>
                            </form>
                        </>
                    )}
                    {!detail && (
                        <p className="text-5xl">--</p>
                    )}
                </div>
            </div>

            <div className="min-w-0 lg:flex-[7] xl:flex-[8]">
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
            </div>
        </div>

    </>
    )
}

export default PharmacyQueuePage;
