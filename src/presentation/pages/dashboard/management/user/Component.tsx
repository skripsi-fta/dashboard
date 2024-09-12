'use client';

import DashboardActions from '@/presentation/layout/dashboard/actions';
import DashboardContent from '@/presentation/layout/dashboard/content';
import DashboardHeader from '@/presentation/layout/dashboard/header';

const ManagementUserPage = () => {
    return (
        <>
            <DashboardContent>
                <DashboardHeader title='Daftar User' />
                <DashboardActions
                    filterButtonProps={{
                        label: 'Filter User',
                        onClick: () => console.log('filter')
                    }}
                    addButtonProps={{
                        label: 'Tambah User',
                        onClick: () => console.log('add')
                    }}
                />
            </DashboardContent>

            <DashboardContent>asd</DashboardContent>
        </>
    );
};

export default ManagementUserPage;
