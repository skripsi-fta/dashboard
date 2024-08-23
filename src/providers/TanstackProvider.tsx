'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

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
                {children}
            </QueryClientProvider>
        </>
    );
};

export default TanstackProvider;
