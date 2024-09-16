import useDashboard from '@/contexts/DashboardContext';
import { cn } from '@/lib/utils';
import { Icons } from '@/presentation/icons/icons';
import type { LucideProps } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export const staticMapRole: Record<string, { icons: ReactNode; name: string }> =
    {
        doctor: {
            icons: Icons.doctor({ className: 'size-[30px]' }),
            name: 'Dokter'
        },
        pharmacy: {
            icons: Icons.pharmacy({ className: 'size-[30px]' }),
            name: 'Farmasi'
        },
        cashier: {
            icons: Icons.cashier({ className: 'size-[35px]' }),
            name: 'Kasir'
        },
        management: {
            icons: Icons.management({ className: 'size-[35px]' }),
            name: 'Manajemen'
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
    doctor: [
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
    pharmacy: [
        {
            name: 'Antrian Farmasi',
            href: '/dashboard/pharmacy/antrian',
            icons: (props) => <Icons.farmasiAntrian {...props} />
        }
    ],
    cashier: [
        {
            name: 'Pembayaran Pasien',
            href: '/dashboard/cashier/pembayaran',
            icons: (props) => <Icons.kasirPembayaran {...props} />
        },
        {
            name: 'Antrian Kasir',
            href: '/dashboard/cashier/antrian',
            icons: (props) => <Icons.kasirAntrian {...props} />
        }
    ],
    management: [
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
            name: 'Akun Klinik',
            href: '/dashboard/management/user',
            icons: (props) => <Icons.managementPeople {...props} />
        }
    ]
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
                        <div
                            className='flex w-full flex-row gap-4 pr-4'
                            key={data.href}
                        >
                            <div
                                className={cn(
                                    'h-full w-[10px] ',
                                    pathname.startsWith(data.href)
                                        ? 'bg-primaryblue'
                                        : 'bg-transparent'
                                )}
                                style={{ borderRadius: '0px 28px 28px 0px' }}
                            />

                            <Link
                                className={cn(
                                    'flex w-full flex-[1] flex-row items-center gap-4 rounded-[8px] p-2 text-base font-semibold',
                                    pathname.startsWith(data.href)
                                        ? 'bg-primaryblue text-white'
                                        : 'bg-transparent'
                                )}
                                href={data.href}
                            >
                                {data.icons({
                                    className: 'size-[25px]',
                                    stroke: pathname.startsWith(data.href)
                                        ? 'white'
                                        : 'black'
                                })}
                                <p className='text-sm'>{data.name}</p>
                            </Link>
                        </div>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default Sidebar;
