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

export const scheduleStatusData = [
    {
        label: 'Ready',
        value: 'ready'
    },
    {
        label: 'In Review',
        value: 'in review'
    },
    {
        label: 'Cancelled',
        value: 'cancelled'
    },
    {
        label: 'Changed',
        value: 'changed'
    }
];

export const monthDropdownData = [
    { value: '01', label: 'Januari' },
    { value: '02', label: 'Februari' },
    { value: '03', label: 'Maret' },
    { value: '04', label: 'April' },
    { value: '05', label: 'Mei' },
    { value: '06', label: 'Juni' },
    { value: '07', label: 'Juli' },
    { value: '08', label: 'Agustus' },
    { value: '09', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' }
];
