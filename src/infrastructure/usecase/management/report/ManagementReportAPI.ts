import type { ManagementReport } from '@/infrastructure/models/management/report';
import http from '@/lib/axios';

export class ManagementReportAPI {
    async getPharmacySummary(
        params: ManagementReport.Request.PharmacyCashierSummary
    ): Promise<ManagementReport.Response.PharmacyCashierSummary> {
        const data = await http.get('/management/report/pharmacy', { params });

        return data.data.data;
    }

    async getPharmacyData(
        params: ManagementReport.Request.PharmacyCashierData
    ): Promise<ManagementReport.Response.PharmacyCashierData> {
        const data = await http.get('/management/report/pharmacy/data', {
            params
        });

        return data.data.data;
    }

    async getCashierSummary(
        params: ManagementReport.Request.PharmacyCashierSummary
    ): Promise<ManagementReport.Response.PharmacyCashierSummary> {
        const data = await http.get('/management/report/cashier', { params });

        return data.data.data;
    }

    async getCashierData(
        params: ManagementReport.Request.PharmacyCashierData
    ): Promise<ManagementReport.Response.PharmacyCashierData> {
        const data = await http.get('/management/report/cashier/data', {
            params
        });

        return data.data.data;
    }

    async getDoctorSummary(
        params: ManagementReport.Request.PharmacyCashierSummary
    ): Promise<ManagementReport.Response.DoctorSummary> {
        const data = await http.get('/management/report/doctor', { params });

        return data.data.data;
    }

    async getDoctorData(
        params: ManagementReport.Request.PharmacyCashierData
    ): Promise<ManagementReport.Response.PharmacyCashierData> {
        const data = await http.get('/management/report/doctor/data', {
            params
        });

        return data.data.data;
    }
}
