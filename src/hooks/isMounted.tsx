import { useEffect, useState } from 'react';

export default function IsMounted() {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(() => true);
    }, []);

    return mounted;
}
