'use client';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/presentation/ui/pagination';
import { cn } from '@/lib/utils';

interface PaginationCustomType {
    totalData: number;
    rowsPerPage: number;
    currentPage: number;
    setCurrentPage: (_: number) => void;
}

const PaginationCustom = ({
    totalData,
    rowsPerPage,
    currentPage,
    setCurrentPage
}: PaginationCustomType) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalData / rowsPerPage); i++) {
        pageNumbers.push(i);
    }

    const maxPageNum = 5;

    const pageNumLimit = Math.floor(maxPageNum / 2);

    const activePages = pageNumbers.slice(
        Math.max(0, currentPage - 1 - pageNumLimit),
        Math.min(currentPage - 1 + pageNumLimit + 1, pageNumbers.length)
    );

    const handleNextPage = () => {
        if (currentPage < pageNumbers.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const renderPages = () => {
        const renderedPages = activePages.map((page, idx) => (
            <PaginationItem
                key={idx}
                className={
                    currentPage === page
                        ? 'rounded-md bg-neutral-100 text-black'
                        : ''
                }
            >
                <PaginationLink onClick={() => setCurrentPage(page)}>
                    {page}
                </PaginationLink>
            </PaginationItem>
        ));

        if (activePages[0] > 1) {
            renderedPages.unshift(
                <PaginationEllipsis
                    key='ellipsis-start'
                    onClick={() => setCurrentPage(activePages[0] - 1)}
                />
            );
        }

        if (activePages[activePages.length - 1] < pageNumbers.length) {
            renderedPages.push(
                <PaginationEllipsis
                    key='ellipsis-end'
                    onClick={() =>
                        setCurrentPage(activePages[activePages.length - 1] + 1)
                    }
                />
            );
        }

        return renderedPages;
    };

    return (
        <Pagination className='hover:cursor-pointer'>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={handlePrevPage}
                        className={cn(
                            '',
                            !(currentPage > 1) &&
                                'cursor-not-allowed opacity-75'
                        )}
                    />
                </PaginationItem>

                {renderPages()}

                <PaginationItem>
                    <PaginationNext
                        onClick={handleNextPage}
                        className={cn(
                            '',
                            !(currentPage < pageNumbers.length) &&
                                'cursor-not-allowed opacity-75'
                        )}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationCustom;
