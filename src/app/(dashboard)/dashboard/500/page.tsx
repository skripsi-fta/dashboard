'use client';

import { Button } from '@/presentation/ui/button';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();

    return (
        <>
            <div className='flex h-full flex-col items-center justify-center gap-8'>
                <p className='text-9xl font-bold'>500</p>
                <div className='flex flex-col items-center justify-center gap-4'>
                    <p className='text-5xl font-semibold'>Unauthorized</p>
                    <p className='text-center'>
                        You don't have access to this page
                        <br />
                        Please click the button to go back to homepage
                    </p>
                </div>
                <Button
                    onClick={() => router.push('/dashboard')}
                    variant={'addButton'}
                >
                    GO TO HOMEPAGE
                </Button>
            </div>
        </>
    );
}
