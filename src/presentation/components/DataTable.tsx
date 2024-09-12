'use client';

import {
    type Dispatch,
    type SetStateAction,
    type HTMLAttributes,
    useMemo,
    useRef
} from 'react';

import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    type InitialTableState,
    type PaginationState,
    useReactTable
} from '@tanstack/react-table';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/presentation/ui/table';
import { cn } from '@/lib/utils';
import Spinner from './Spinner';

import PaginationCustom from './PaginationCustom';

interface DataTableProps<TData, TValue> {
    paginationProps?: PaginationState;
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    totalData: number;
    tableProps?: HTMLAttributes<HTMLTableElement>;
    tableHeaderProps?: HTMLAttributes<HTMLTableSectionElement>;
    tableRowHeaderProps?: HTMLAttributes<HTMLTableRowElement>;
    tableBodyProps?: HTMLAttributes<HTMLTableSectionElement>;
    tableRowProps?: HTMLAttributes<HTMLTableRowElement>;
    initialState?: InitialTableState;
    setPagination?: Dispatch<SetStateAction<PaginationState>>;
    isLoading?: boolean;
}

interface NoResultsOverlayProps {
    isLoading: boolean;
}

const NoResultsOverlay = ({ isLoading }: NoResultsOverlayProps) => (
    <div className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-transparent'>
        {isLoading ? (
            <Spinner size={40} color='#3B41E3' />
        ) : (
            <span className='text-center text-base text-gray-500'>
                Tidak ada data yang tersedia
            </span>
        )}
    </div>
);

export function DataTable<TData, TValue>({
    columns,
    data,
    tableProps,
    tableHeaderProps,
    tableRowHeaderProps,
    tableBodyProps,
    tableRowProps,
    paginationProps,
    initialState,
    setPagination,
    isLoading,
    totalData
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        initialState: { ...initialState, pagination: paginationProps },
        data,
        columns,
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
        state: {
            pagination: paginationProps
        },
        onPaginationChange: setPagination,
        columnResizeMode: 'onChange'
    });

    const rowCountRef = useRef(totalData || 0);

    const rowCount = useMemo(() => {
        if (totalData) {
            rowCountRef.current = totalData;
        } else if (data.length === 0 && !isLoading) {
            rowCountRef.current = 0;
        }

        return rowCountRef.current;
    }, [totalData, data, isLoading]);

    const hasRows = table.getRowModel().rows.length > 0 && !isLoading;

    return (
        <div className='relative flex w-full flex-col gap-4'>
            <div className='overflow-x-auto'>
                <Table
                    {...tableProps}
                    style={{
                        width: '100%',
                        tableLayout: 'fixed',
                        overflowX: 'scroll',
                        minHeight: '200px'
                    }}
                >
                    <TableHeader
                        {...tableHeaderProps}
                        className='bg-primaryblue text-white'
                    >
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                {...tableRowHeaderProps}
                                className='text-white'
                            >
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        style={{
                                            width: `${header.getSize()}px`
                                        }}
                                        className={cn(
                                            'text-white',
                                            header.column.columnDef.meta
                                                ?.className
                                        )}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody {...tableBodyProps} className='z-100'>
                        {hasRows ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    {...tableRowProps}
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getAllCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            style={{
                                                width: `${cell.column.getSize()}px`
                                            }}
                                            className={cn(
                                                '',
                                                cell.column.columnDef.meta
                                                    ?.className
                                            )}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow {...tableRowProps} className='w-full'>
                                <TableCell
                                    colSpan={columns.length}
                                    className='h-24'
                                >
                                    <NoResultsOverlay
                                        isLoading={isLoading ?? false}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {paginationProps && setPagination && (
                <div className='ml-auto'>
                    <PaginationCustom
                        totalData={rowCount}
                        currentPage={paginationProps.pageIndex + 1}
                        rowsPerPage={paginationProps.pageSize}
                        setCurrentPage={(number) =>
                            setPagination((state) => ({
                                ...state,
                                pageIndex: number - 1
                            }))
                        }
                    />
                </div>
            )}
        </div>
    );
}
