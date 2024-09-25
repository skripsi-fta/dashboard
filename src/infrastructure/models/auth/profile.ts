export namespace Profile {
    export interface Data {
        id: number;
        name: string;
        email: string;
        role: string;
    }
    export interface Response {
        user: Data;
        token: string;
        refreshToken: string;
    }
}
