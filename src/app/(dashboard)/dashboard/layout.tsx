import { DashboardContextProvider } from '@/contexts/DashboardContext';
import DashboardLayout from '@/presentation/layout/dashboard/layout';
import DashboardProvider from '@/providers/DashboardProvider';

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <>
            <DashboardContextProvider>
                <DashboardProvider>
                    <DashboardLayout>{children}</DashboardLayout>
                </DashboardProvider>
            </DashboardContextProvider>
        </>
    );
}
