import { constants } from 'http2';

export class CustomError extends Error {
    readonly error: string;
    statusCode: number;

    constructor(error?: Partial<CustomError>) {
        super();
        this.statusCode = error?.statusCode ?? constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
        this.error = error?.error ?? error?.message ?? 'An unexpected error occurred';
    }
}
