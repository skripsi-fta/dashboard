export namespace ManagementLiveQueue {
    export namespace Request {
        export interface LivePharmacyQueue {}
        export interface LiveCashierQueue {}
        export interface LiveDoctorQueue {}
    }

    export namespace Response {
        export interface LiveQueue {
            data: {
                queueNumber: number;
                patientName: string;
            }
        }

        export interface DoctorQueue {
            poli: number;
            doctorName: string;
            roomName: string;
            queueNumber: number;
            totalQueue: number;
        }

        export interface LiveDoctorQueue {
            data: DoctorQueue[];
        }
    }
}
