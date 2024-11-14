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

export function formatRupiah(amount: number): string {
    let currencyReplaced = false;
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    })
        .formatToParts(amount)
        .map((item, idx, arr) => {
            if (
                (item.type === 'currency' || item.type === 'literal') &&
                currencyReplaced
            )
                return '';
            const nextCurrency =
                arr[idx + 1] &&
                arr[idx + 1].type === 'currency' &&
                arr[idx + 1].value;
            if (
                item.type === 'minusSign' &&
                nextCurrency &&
                !currencyReplaced
            ) {
                currencyReplaced = true;
                return `${nextCurrency} ${item.value}`;
            }
            return `${item.value}`;
        })
        .join('');

    return formatter;
}
