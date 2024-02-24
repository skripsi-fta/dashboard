'use client';

import { useEffect, useState } from 'react';

export default function WindowSize() {
    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    function getWindowSize() {
        if (typeof window !== 'undefined') {
            // browser code
            const { innerWidth, innerHeight } = window;
            return { innerWidth, innerHeight };
        }
    }

    return windowSize;
}
