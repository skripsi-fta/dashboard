import type { PharmacyQueue } from '@/infrastructure/models/pharmacy';
import http from '@/lib/axios';

export class PharmacyQueueAPI {

    private readonly url: string = '/pharmacy/antrian';

    async getCurrentPharmacyQueue(): Promise<PharmacyQueue.Response.Current | null> {
        const data = await http.get<PharmacyQueue.Response.Current>(
            this.url,
        );

        return data.data;
    }

    async getPharmacyQueueList(
        params: PharmacyQueue.Request.List
    ): Promise<PharmacyQueue.Response.List> {
        const data = await http.get<PharmacyQueue.Response.List>(
            '/pharmacy/antrian/list',
            { params }
        );

        return data.data;
    }

    async updatePharmacyQueue(
        body: PharmacyQueue.Request.Update
    ): Promise<PharmacyQueue.Response.Update> {
        const data = await http.post<PharmacyQueue.Response.Update>(
            this.url,
            body
        );

        return data.data;
    }
}
