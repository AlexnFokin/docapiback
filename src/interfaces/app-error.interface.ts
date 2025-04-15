export interface AppError extends Error {
    status?: number;
    code?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    details?: any;
}
