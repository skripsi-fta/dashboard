'use client';

import useDashboard from '@/contexts/DashboardContext';
import { useEffect } from 'react';

interface DashboardProviderProps {
    children: React.ReactNode;
}

const DashboardProvider = ({ children }: DashboardProviderProps) => {
    const { loading, logout, isLoggedIn, getUserData, isAuthenticated } =
        useDashboard();

    useEffect(() => {
        if (!isLoggedIn()) {
            logout();
        } else {
            getUserData();
        }
    }, []);

    return <>{!loading && isAuthenticated ? <>{children}</> : null}</>;
};

export default DashboardProvider;
