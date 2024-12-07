import useDashboard from '@/contexts/DashboardContext';
import dayjsUtils from '@/lib/dayjs';
import { staticMapRole } from './sidebar';
import { LogOut, User } from 'lucide-react';
import { Button } from '@/presentation/ui/button';

const Navbar = () => {
    const { userData, logout } = useDashboard();

    const currentDate = dayjsUtils();

    if (!userData) return null;

    return (
        <>
            <div className='flex flex-row items-center justify-center gap-12'>
                <p className='hidden font-medium lg:flex'>
                    {currentDate.format('dddd, DD MMMM YYYY')}
                </p>
                <div className='flex flex-row items-center gap-4 md:gap-8'>
                    <div className='flex size-[60px] items-center justify-center rounded-full bg-[#EFF0F9]'>
                        <User className='size-9' />
                    </div>
                    <div className='flex flex-col justify-center gap-2'>
                        <p className='font-semibold'>
                            {userData.role === 'DOCTOR'
                                ? userData.doctor.name
                                : userData?.name}
                        </p>
                        <p>{staticMapRole[userData.role]?.name ?? ''}</p>
                    </div>
                    <Button variant={'ghost'} onClick={logout}>
                        <LogOut />
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Navbar;
