import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function cond(condition: string, st: string[]) {
    const style: string[] = [];

    st.map((data) => {
        style.push(`${condition}:${data}`);
    });

    return style;
}
