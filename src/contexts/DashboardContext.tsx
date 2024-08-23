'use client';

import type { LoginType } from '@/infrastructure/models/auth/login';
// import axios, { type AxiosInstance } from 'axios';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState } from 'react';

interface DashboardContextProps {
    children: React.ReactNode;
}

interface DashboardContextType {
    isAuthenticated: boolean;
    loading: boolean;
    userData: LoginType.Response | null;
    getUserData: () => void;
    isLoggedIn: () => boolean;
    logout: () => void;
    // apiPrivate: AxiosInstance;
}

export const DashboardContext = createContext<DashboardContextType | null>(
    null
);

export const DashboardContextProvider = ({
    children
}: DashboardContextProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(true);

    const [userData, setUserData] = useState<LoginType.Response | null>(null);

    const router = useRouter();

    const getUserData = () => {
        const data = JSON.parse(localStorage.getItem('user-data') as string);
        if (data) {
            setUserData(() => data);
            setIsAuthenticated(() => true);
            setLoading(() => false);
        } else {
            setIsAuthenticated(() => false);
            setLoading(() => false);
        }
    };

    const isLoggedIn = () => {
        const data = JSON.parse(localStorage.getItem('user-data') as string);
        if (data) {
            return true;
        }
        return false;
    };

    const logout = async () => {
        try {
            localStorage.removeItem('user-data');
            setTimeout(() => {
                router.replace('/login');
            }, 500);
        } catch (e) {
            localStorage.removeItem('user-data');
            setTimeout(() => {
                router.replace('/login');
            }, 500);
        }
    };

    const value = {
        isAuthenticated,
        loading,
        userData,
        getUserData,
        isLoggedIn,
        logout
    };

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
};

const useDashboard = () => {
    const data = useContext(DashboardContext);

    if (!data) {
        throw new Error('useDashboard must be used inside dashboard provider');
    }

    return data;
};

export default useDashboard;
