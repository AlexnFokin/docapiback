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
