import type { ManagementLiveQueue } from '@/infrastructure/models/management/antrian';
import http from '@/lib/axios';

export class ManagementLiveQueueAPI {

    async getLivePharmacyQueue(): Promise<ManagementLiveQueue.Response.LiveQueue | null> {
        const data = await http.get<ManagementLiveQueue.Response.LiveQueue>(
            '/livequeue/pharmacy',
        );

        return data.data;
    }

    async getLiveCashierQueue(): Promise<ManagementLiveQueue.Response.LiveQueue | null> {
        const data = await http.get<ManagementLiveQueue.Response.LiveQueue>(
            '/livequeue/cashier',
        );

        return data.data;
    }

    async getLiveDoctorQueue(): Promise<ManagementLiveQueue.Response.LiveDoctorQueue | null> {
        const data = await http.get<ManagementLiveQueue.Response.LiveDoctorQueue>(
            '/livequeue/doctor',
        );

        return data.data;
    }

    async getLiveGlobalQueue(): Promise<ManagementLiveQueue.Response.LiveQueue | null> {
        const data = await http.get<ManagementLiveQueue.Response.LiveQueue>(
            '/livequeue/global',
        );

        return data.data;
    }
}
