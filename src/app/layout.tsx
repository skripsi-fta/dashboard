import '@/styles/globals.css';
import { cn } from '@/lib/utils';
import type { Metadata, Viewport } from 'next';
import { fontSans } from '@/lib/fonts';
import { TailwindIndicator } from '@/presentation/components/TailwindIndicator';
import TanstackProvider from '@/providers/TanstackProvider';
import { Toaster } from '@/presentation/ui/sonner';

export const metadata: Metadata = {
    title: {
        default: 'Dashboard Klinik',
        template: '%s - Dashboard Klinik'
    },
    description: 'Dashboard Klinik',
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png'
    }
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' }
    ],
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <>
            <html lang='en' suppressHydrationWarning={true}>
                <body
                    className={cn(
                        'min-h-screen font-sans antialiased',
                        fontSans.variable
                    )}
                    suppressHydrationWarning={true}
                >
                    <TanstackProvider>
                        <div>{children}</div>
                        <TailwindIndicator />
                        <Toaster closeButton richColors theme='light' />
                    </TanstackProvider>
                </body>
            </html>
        </>
    );
}
