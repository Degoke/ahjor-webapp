export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignupRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface LoginResponse {
    id: string;
    token: string;
    email: string;
}