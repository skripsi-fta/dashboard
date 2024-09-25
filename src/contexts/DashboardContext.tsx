'use client';

import type { Profile } from '@/infrastructure/models/auth/profile';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState } from 'react';

interface DashboardContextProps {
    children: React.ReactNode;
}

interface DashboardContextType {
    isAuthenticated: boolean;
    loading: boolean;
    userData: Profile.Data | null;
    getUserData: () => void;
    isLoggedIn: () => boolean;
    logout: () => void;
}

export const DashboardContext = createContext<DashboardContextType | null>(
    null
);

export const DashboardContextProvider = ({
    children
}: DashboardContextProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(true);

    const [userData, setUserData] = useState<Profile.Data | null>(null);

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
            router.replace('/login');
        } catch (e) {
            localStorage.removeItem('user-data');
            router.replace('/login');
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
