// exceptions/http.exception.ts

export class HttpException extends Error {
    constructor(
        public status: number,
        public message: string,
        public code?: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        public details?: any
    ) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class NotFoundException extends HttpException {
    constructor(message = 'Not Found') {
        super(404, message, 'RESOURCE_NOT_FOUND');
    }
}

export class BadRequestException extends HttpException {
    constructor(message = 'Bad Request', code = 'BAD_REQUEST') {
        super(400, message, code);
    }
}

export class InternalErrorException extends HttpException {
    constructor(message = 'Internal Server Error', code = 'INTERNAL_ERROR') {
        super(500, message, code);
    }
}
