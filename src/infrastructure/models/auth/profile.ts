export namespace Profile {
    export interface Doctor {
        id: number;
        consulePrice: number;
        name: string;
        profile: string;
        rating: number;
        specialization: {
            description: string;
            id: number;
            isActive: boolean;
            name: string;
        };
    }

    export interface BaseData {
        id: number;
        name: string;
        email: string;
        username: string;
    }

    export interface DoctorRole extends BaseData {
        role: 'DOCTOR';
        doctor: Doctor;
    }

    export interface OtherRoles extends BaseData {
        role: 'PHARMACIST' | 'CASHIER' | 'MANAGEMENT';
        doctor?: null;
    }

    export type Data = DoctorRole | OtherRoles;

    export interface Response {
        user: Data;
        token: string;
        refreshToken: string;
    }
}
