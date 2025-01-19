import { cn } from '@/lib/utils';
import CustomButtonComponent from '@/presentation/components/CustomButton';
import { type ButtonProps } from '@/presentation/ui/button';
import { Plus, Search } from 'lucide-react';
import type { ReactNode } from 'react';

export interface DashboardActionsType {
    children?: ReactNode;
    filterButtonProps?: ButtonProps;
    addButtonProps?: ButtonProps;
    editButtonProps?: ButtonProps;
}

const DashboardActions = ({
    children,
    filterButtonProps: {
        label: filterButtonLabel,
        className: classNameFilter,
        onClick: onClickFilter,
        ...filterButtonProps
    } = {},
    addButtonProps: {
        label: addButtonLabel,
        className: classNameAdd,
        onClick: onClickAdd,
        ...addButtonProps
    } = {}
}: DashboardActionsType) => {
    return (
        <div className='flex w-full flex-row flex-wrap gap-4 md:w-auto'>
            {onClickFilter && (
                <CustomButtonComponent
                    {...filterButtonProps}
                    variant={'filterButton'}
                    className={cn(
                        'h-[45px] w-full justify-start md:w-[300px]',
                        classNameFilter
                    )}
                    onClick={onClickFilter}
                >
                    <Search className='mr-2 size-6' />
                    {filterButtonLabel ?? 'Cari'}
                </CustomButtonComponent>
            )}
            {onClickAdd && (
                <CustomButtonComponent
                    {...addButtonProps}
                    variant={'addButton'}
                    className={cn('h-[45px] w-full md:w-auto', classNameAdd)}
                    onClick={onClickAdd}
                >
                    <Plus className='mr-2 size-6' />
                    {addButtonLabel ?? 'Tambah'}
                </CustomButtonComponent>
            )}
            {children}
        </div>
    );
};

export default DashboardActions;
