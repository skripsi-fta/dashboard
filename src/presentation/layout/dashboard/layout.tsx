'use client';

import Sidebar from './sidebar';
import { Sheet, SheetContent, SheetTrigger } from '@/presentation/ui/sheet';
import { Button } from '@/presentation/ui/button';
import { Menu } from 'lucide-react';
import Header from './header';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <>
            <div className='grid min-h-screen w-full md:grid-cols-[250px_1fr] lg:grid-cols-[250px_1fr]'>
                <div className='hidden bg-dark md:flex'>
                    <Sidebar />
                </div>
                <div className='flex flex-col'>
                    <header className='flex h-[100px] items-center flex-row md:flex-row-reverse justify-between gap-4 bg-primaryred px-4 lg:px-6 '>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant='ghost'
                                    size='icon'
                                    className='shrink-0 md:hidden'
                                >
                                    <Menu className='size-7' color='black' />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side='left'
                                className='flex flex-col border-b border-[#27272A] bg-white p-4 px-0'
                            >
                                <Sidebar />
                            </SheetContent>
                        </Sheet>

                        <Header />
                    </header>

                    <main className='min-h-[calc(100vh-100px)] bg-[#EFF0F9] p-4 text-black lg:p-6'>
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;
