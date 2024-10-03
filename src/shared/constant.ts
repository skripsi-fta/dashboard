export const identityType: Record<string, string> = {
    NATIONAL_ID: 'Kartu Tanda Penduduk',
    PASSPORT: 'Paspor',
    DRIVER_LICENSE: 'Surat Izin Mengemudi'
};

export const identityTypeModal = [
    {
        label: 'Kartu Tanda Penduduk',
        value: 'NATIONAL_ID'
    },
    {
        label: 'Paspor',
        value: 'PASSPORT'
    },
    {
        label: 'Surat Izin Mengemudi',
        value: 'DRIVER_LICENSE'
    }
];

const listDay = [
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
    'Minggu'
];

export const dayDropdownData = listDay.map((d) => ({
    label: d,
    value: d.toUpperCase()
}));
