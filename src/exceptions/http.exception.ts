export class HttpException extends Error {
    constructor(
        public message: string,
        public status: number,
        public code?: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        public details?: any,
    ) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class NotFoundException extends HttpException {
    constructor(message = 'Not Found') {
        super(message, 404, 'RESOURCE_NOT_FOUND');
    }
}
