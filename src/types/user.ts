export interface UserCreateDTO {
    email: string;
    password: string;
    name?: string;
}

export interface AuthDTO {
    email: string;
    password: string;
}
