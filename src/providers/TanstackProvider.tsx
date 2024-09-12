'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DialogProvider } from './ModalProvider';

const TanstackProvider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        retry: false
                    }
                }
            })
    );

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <DialogProvider>{children}</DialogProvider>
            </QueryClientProvider>
        </>
    );
};

export default TanstackProvider;
