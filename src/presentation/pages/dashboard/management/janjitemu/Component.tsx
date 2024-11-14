'use client';

import type {
    ManagementAppointment,
    ManagementAppointmentList
} from '@/infrastructure/models/management/janjitemu';
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
import CheckInModal from './components/CheckInModal';
import { Pencil, MapPinCheckInside, DoorOpenIcon } from 'lucide-react';
import { PlusCircle } from 'lucide-react';
import { ManagementAppointmentAPI } from '@/infrastructure/usecase/management/janjitemu/ManagementAppointmentAPI';
import { toast } from 'sonner';
import AddMedicalRecordModal from './components/medicalrecord/AddMedicalRecordModal';
import EditMedicalRecordModal from './components/medicalrecord/EditMedicalRecordModal';
import { cn } from '@/lib/utils';
import EditModal from './components/EditModal';
import dayjsUtils from '@/lib/dayjs';

const ManagementAppointmentPage = () => {
  const api = new ManagementAppointmentAPI();

    const columns: ColumnDef<ManagementAppointment.Response.Data>[] = [
        {
            accessorKey: 'no',
            size: 75,
            header: 'ID'
        },
        {
            accessorKey: 'bookingCode',
            size: 150,
            header: 'Kode Booking'
        },
        {
            accessorKey: 'date',
            size: 250,
            header: 'Jadwal'
        },
        {
            accessorKey: 'patientName',
            size: 200,
            header: 'Nama Pasien'
        },
        {
            accessorKey: 'doctorName',
            size: 200,
            header: 'Nama Dokter'
        },
        {
            accessorKey: 'roomName',
            size: 200,
            header: 'Nama Ruangan'
        },
        {
            accessorKey: 'appointmentStatus',
            size: 200,
            header: 'Status Janji Temu',
            cell: ({ row: { original } }) => (
                <p
                    className={cn(
                        'font-medium capitalize',
                        original.appointmentStatus === 'checkin' &&
                            'text-yellow-500',
                        original.appointmentStatus === 'doctor queue' &&
                            'text-yellow-500',
                        original.appointmentStatus === 'pharmacy queue' &&
                            'text-yellow-500',
                        original.appointmentStatus === 'cashier queue' &&
                            'text-red-500',
                        original.appointmentStatus === 'done' &&
                            'text-green-500',
                        original.appointmentStatus === 'cancel' &&
                            'text-red-500'
                    )}
                >
                    {original.appointmentStatus}
                </p>
            )
        },
        {
            header: 'Check In',
            size: 100,
            cell: ({ row: { original } }) => {
                return (
                    <div className='flex flex-row items-center'>
                        {original.checkInStatus ? (
                            <Button
                                className='cursor-default hover:bg-transparent'
                                variant={'ghost'}
                            >
                                <MapPinCheckInside className='text-green-500' />
                            </Button>
                        ) : (
                            <Button
                                variant={'ghost'}
                                onClick={() =>
                                    openModal(
                                        <CheckInModal
                                            defaultValues={{
                                                ...original
                                            }}
                                            refetch={refetch}
                                            data={original}
                                        />,
                                        {
                                            title: 'Check In'
                                        }
                                    )
                                }
                            >
                                <DoorOpenIcon className='text-primaryblue' />
                            </Button>
                        )}
                    </div>
                );
            }
        },
        {
            header: 'Medical Record',
            size: 100,
            cell: ({ row: { original } }) => {
                return (
                    <div className='flex flex-row items-center'>
                        {!original.medicalRecord ? (
                            <Button
                                variant={'ghost'}
                                disabled={
                                    original.appointmentStatus !== 'checkin'
                                }
                                onClick={() =>
                                    openModal(
                                        <AddMedicalRecordModal
                                            defaultValues={{
                                                appointmentId: original.id,
                                                patientId: original.patientId,
                                                height: 0,
                                                weight: 0,
                                                systolic: 0,
                                                diastolic: 0,
                                                temperature: 0,
                                                illness: ''
                                            }}
                                            refetch={refetch}
                                        />,
                                        {
                                            title: 'Add Medical Record'
                                        }
                                    )
                                }
                            >
                                <PlusCircle className='text-primaryblue' />
                            </Button>
                        ) : (
                            <Button
                                variant={'ghost'}
                                onClick={() =>
                                    openModal(
                                        <EditMedicalRecordModal
                                            defaultValues={{
                                                id: original.medicalRecord.id,
                                                height: original.medicalRecord
                                                    .height,
                                                weight: original.medicalRecord
                                                    .weight,
                                                systolic:
                                                    original.medicalRecord
                                                        .systolic,
                                                diastolic:
                                                    original.medicalRecord
                                                        .diastolic,
                                                temperature:
                                                    original.medicalRecord
                                                        .temperature,
                                                illness:
                                                    original.medicalRecord
                                                        .illness
                                            }}
                                            refetch={refetch}
                                        />,
                                        {
                                            title: 'Edit Medical Record'
                                        }
                                    )
                                }
                            >
                                <Pencil className='text-primaryblue' />
                            </Button>
                        )}
                    </div>
                );
            }
        }
        // TODO : Edit Appointment
        // {
        //     header: 'Action',
        //     size: 100,
        //     cell: ({ row: { original } }) => {
        //         return (
        //             <div className='flex flex-row items-center'>
        //                 <Button
        //                     variant={'ghost'}
        //                     onClick={() =>
        //                         openModal(
        //                             <EditModal
        //                                 defaultValues={{
        //                                     ...original,
        //                                     scheduleDate: original.scheduleDate,
        //                                     scheduleId: `${original.scheduleId}`,
        //                                     medicalRecordId: original.medicalRecord.id
        //                                 }}
        //                                 refetch={refetch}
        //                             />,
        //                             {
        //                                 title: 'Edit Janji Temu'
        //                             }
        //                         )
        //                     }
        //                 >
        //                     <Pencil className='text-primaryblue' />
        //                 </Button>
        //             </div>
        //         );
        //     }
        // }
    ];

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

    const [filterValues, setFilterValues] = useState<ManagementAppointmentList>(
        {
            bookingCode: '',
            appointmentStatus: '',
            endDate: dayjsUtils()
                .endOf('month')
                .add(30, 'days')
                .format('YYYY-MM-DD'),
            // startDate: dayjsUtils().format('YYYY-MM-DD'),
            startDate: dayjsUtils().startOf('month').format('YYYY-MM-DD'),
            endTime: '',
            startTime: ''
        }
    );

  const { openModal, closeModal } = useModal();

  const onSubmitFilter = (e: ManagementAppointmentList) => {
    setFilterValues(() => e);
    setPagination(() => ({ pageIndex: 0, pageSize: 5 }));
    closeModal();
  };

    const onResetFilter = () => {
        setFilterValues(() => ({
            bookingCode: '',
            appointmentStatus: '',
            endDate: dayjsUtils().endOf('month').format('YYYY-MM-DD'),
            startDate: dayjsUtils().startOf('month').format('YYYY-MM-DD'),
            endTime: '',
            startTime: ''
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
        title: "Filter Janji Temu",
      }
    );
  };

  const { data, isLoading, refetch } = useQuery({
    queryFn: () =>
      api.getList({
        ...filterValues,
        pageSize: pagination.pageSize,
        pageNumber: pagination.pageIndex + 1,
      }),
    queryKey: [
      "appointment-list-management",
      filterValues,
      pagination.pageIndex,
      pagination.pageSize,
    ],
    onError: () => {
      toast.error("Get appointment error");
    },
  });

  const handleOpenDialogAdd = () => {
    openModal(<AddModal refetch={refetch} />, {
      title: "Tambah Janji Temu",
    });
  };

  return (
    <>
      <DashboardContent>
        <DashboardHeader title="Daftar Janji Temu" />
        <DashboardActions
          filterButtonProps={{
            label: "Filter Janji Temu",
            loading: isLoading,
            onClick: handleOpenDialogFilter,
          }}
          addButtonProps={{
            label: "Tambah Janji Temu",
            onClick: handleOpenDialogAdd,
          }}
        />
      </DashboardContent>

      <DashboardContent>
        <DataTable
          columns={columns}
          data={data?.data ?? []}
          totalData={data?.totalRows ?? 0}
          tableProps={{
            className: "my-2 overflow-auto text-[15px] text-black",
          }}
          tableHeaderProps={{ className: "text-black" }}
          tableRowHeaderProps={{
            className: "border-none text-black ",
          }}
          tableRowProps={{ className: "border-b-0" }}
          initialState={{ columnVisibility: { diff: true } }}
          paginationProps={pagination}
          setPagination={setPagination}
          isLoading={isLoading}
        />
      </DashboardContent>
    </>
  );
};

export default ManagementAppointmentPage;
