import type { ManagementCashier } from '@/infrastructure/models/management/cashier';
import http from '@/lib/axios';

export class ManagementCashierAPI {
  private readonly url: string = '/management/cashier';

  async getList(params: ManagementCashier.Request.List)
  : Promise<ManagementCashier.Response.List> {
    const data = await http.get<ManagementCashier.Response.List>(
      `${this.url}`,
      { params }
    );

    return data.data;
  }

  async getDetailQueue()
    : Promise<ManagementCashier.Response.DetailListQueue> {
    const data = await http.get<ManagementCashier.Response.DetailListQueue>(
      `${this.url}/detail`,
    );

    return data.data;
  }

  async payment(body: ManagementCashier.Request.Payment): Promise<ManagementCashier.Response.Payment> {
    const data = await http.put<ManagementCashier.Response.Payment>(
      `${this.url}/update`,
      body
    );

    return data.data;

  }
}
