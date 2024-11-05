'use client';

import { DoctorAppointmentAPI } from '@/infrastructure/usecase/doctor/janjitemu/DoctorAppointment';
import { useQuery } from 'react-query';

const ScheduleAppointmentPage = () => {
    const api = new DoctorAppointmentAPI();

    const {} = useQuery({ queryFn: () => api.getList() });

    return <>aasd</>;
};

export default ScheduleAppointmentPage;
