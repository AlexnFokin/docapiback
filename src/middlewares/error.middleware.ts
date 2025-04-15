/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../interfaces/app-error.interface';
import { HttpException } from '../exceptions/http.exception';

export const errorMiddleware = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.error('[Error]', err);

    const error = normalizeError(err);
    const statusCode = determineStatusCode(error);

    res.status(statusCode).json({
        success: false,
        message: error.message || 'Internal Server Error',
        code: error.code || 'INTERNAL_ERROR',
        details: error.details,
        timestamp: new Date().toISOString(),
        path: req.path,
    });
};

function normalizeError(error: unknown): AppError {
    if (error instanceof HttpException) {
        return error;
    }

    if (error instanceof Error) {
        return {
            name: error.name,
            message: error.message,
            status: 500,
            code: 'INTERNAL_ERROR',
        };
    }

    return {
        name: 'UnknownError',
        message: 'Unknown error occurred',
        status: 500,
        code: 'UNKNOWN_ERROR',
    };
}

function determineStatusCode(error: AppError): number {
    return error.status && typeof error.status === 'number'
        ? error.status
        : 500;
}
