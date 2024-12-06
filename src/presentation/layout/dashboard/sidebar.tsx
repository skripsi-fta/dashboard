import useDashboard from '@/contexts/DashboardContext';
import { cn } from '@/lib/utils';
import { Icons } from '@/presentation/icons/icons';
import { ClipboardPlus, type LucideProps } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type ReactNode } from 'react';

export const staticMapRole: Record<string, { icons: ReactNode; name: string }> =
    {
        DOCTOR: {
            icons: Icons.doctor({ className: 'size-[30px]' }),
            name: 'Dokter'
        },
        PHARMACIST: {
            icons: Icons.pharmacy({ className: 'size-[30px]' }),
            name: 'Farmasi'
        },
        CASHIER: {
            icons: Icons.cashier({ className: 'size-[35px]' }),
            name: 'Kasir'
        },
        MANAGEMENT: {
            icons: Icons.management({ className: 'size-[35px]' }),
            name: 'Manajemen'
        },
        MONITORING: {
            icons: Icons.monitor({ className: 'size-[35px]' }),
            name: 'Monitoring'
        }
    };

const sidebarContent: Record<
    string,
    {
        name: string;
        href: string;
        icons: (_props: LucideProps) => ReactNode;
    }[]
> = {
    DOCTOR: [
        {
            name: 'Janji Temu',
            href: '/dashboard/doctor/janjitemu',
            icons: (props) => <Icons.dokterJanjiTemu {...props} />
        },
        {
            name: 'Jadwal',
            href: '/dashboard/doctor/jadwal',
            icons: (props) => <Icons.dokterJadwal {...props} />
        }
    ],
    PHARMACIST: [
        {
            name: 'Antrian Farmasi',
            href: '/dashboard/pharmacy/antrian',
            icons: (props) => <Icons.farmasiAntrian {...props} />
        }
    ],
    CASHIER: [
        {
            name: 'Antrian Kasir',
            href: '/dashboard/cashier/antrian',
            icons: (props) => <Icons.kasirAntrian {...props} />
        }
    ],
    MANAGEMENT: [
        {
            name: 'Janji Temu',
            href: '/dashboard/management/janjitemu',
            icons: (props) => <Icons.dokterJanjiTemu {...props} />
        },
        {
            name: 'Antrian',
            href: '/dashboard/management/antrian',
            icons: (props) => <Icons.kasirAntrian {...props} />
        },
        {
            name: 'Antrian Kasir',
            href: '/dashboard/cashier/antrian',
            icons: (props) => <Icons.kasirAntrian {...props} />
        },
        {
            name: 'Antrian Farmasi',
            href: '/dashboard/pharmacy/antrian',
            icons: (props) => <Icons.farmasiAntrian {...props} />
        },
        {
            name: 'Jadwal',
            href: '/dashboard/management/jadwal',
            icons: (props) => <Icons.dokterJadwal {...props} />
        },
        {
            name: 'Ruangan',
            href: '/dashboard/management/ruangan',
            icons: (props) => <Icons.managementRuangan {...props} />
        },
        {
            name: 'Pasien',
            href: '/dashboard/management/pasien',
            icons: (props) => <Icons.managementPeople {...props} />
        },
        {
            name: 'Profil Dokter',
            href: '/dashboard/management/profildokter',
            icons: (props) => <Icons.doctor {...props} />
        },
        {
            name: 'Spesialisasi Dokter',
            href: '/dashboard/management/spesialisasidokter',
            icons: (props) => <ClipboardPlus {...props} />
        },
        {
            name: 'Akun Klinik',
            href: '/dashboard/management/user',
            icons: (props) => <Icons.managementPeople {...props} />
        }
    ],
    MONITORING: [
        {
            name: 'Antrian',
            href: '/dashboard/management/antrian',
            icons: (props) => <Icons.kasirAntrian {...props} />
        },
        {
            name: 'Check In',
            href: '/dashboard/monitoring/checkin',
            icons: (props) => <Icons.qr {...props} />
        }
    ]
};

const ButtonSidebar = (data: {
    name: string;
    href: string;
    icons: (_props: LucideProps) => ReactNode;
    pathname: string;
}) => {
    const [hover, setHover] = useState<boolean>(false);

    return (
        <div
            className='flex w-full flex-row gap-4 pr-4'
            key={data.href}
            onMouseEnter={() => setHover(() => true)}
            onMouseLeave={() => setHover(() => false)}
        >
            <div
                className={cn(
                    'h-full w-[10px]',
                    data.pathname.startsWith(data.href) || hover
                        ? 'bg-primaryblue'
                        : 'bg-transparent'
                )}
                style={{ borderRadius: '0px 28px 28px 0px' }}
            />

            <Link
                className={cn(
                    'flex w-full flex-[1] flex-row items-center gap-4 rounded-[8px] p-2 text-base font-semibold',
                    data.pathname.startsWith(data.href) || hover
                        ? 'bg-primaryblue text-white'
                        : 'bg-transparent'
                )}
                href={data.href}
            >
                {data.icons({
                    className: 'size-[25px]',
                    stroke:
                        data.pathname.startsWith(data.href) || hover
                            ? 'white'
                            : 'black'
                })}
                <p className='text-sm'>{data.name}</p>
            </Link>
        </div>
    );
};

const Sidebar = () => {
    const { userData } = useDashboard();

    const pathname = usePathname();

    if (!userData) return null;

    return (
        <>
            <div className='flex size-full max-h-screen flex-col gap-2'>
                <div className='flex h-[100px] items-center justify-center px-4 lg:px-6'>
                    <div className='flex flex-row items-center gap-4'>
                        {staticMapRole[userData.role]?.icons ?? (
                            <Icons.people />
                        )}
                        <p className='items-center justify-center text-xl font-bold text-black'>
                            {staticMapRole[userData.role]?.name ?? ''}
                        </p>
                    </div>
                </div>
                <nav className='flex w-full flex-col items-start gap-6 text-base font-medium'>
                    {(sidebarContent[userData.role] ?? []).map((data) => (
                        <ButtonSidebar
                            href={data.href}
                            icons={data.icons}
                            name={data.name}
                            pathname={pathname}
                            key={data.href}
                        />
                    ))}
                </nav>
            </div>
        </>
    );
};

export default Sidebar;
