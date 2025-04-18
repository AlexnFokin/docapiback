export interface UserCreateDTO {
    email: string;
    password: string;
    name?: string;
    activationLink: string;
    activated?: boolean;
}

export interface AuthDTO {
    email: string;
    password: string;
}

export interface UserResponseDTO {
    id: number;
    email: string;
    name?: string;
    role?: string;
    activated?: boolean
}