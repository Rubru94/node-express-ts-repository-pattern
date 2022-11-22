import { ReasonPhrases } from 'http-status-codes';
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
export class BadRequestError extends CustomError {
    /**
     * @status 400
     * @param message (Optional) Specify error message
     */
    constructor(message?: string) {
        super({ statusCode: constants.HTTP_STATUS_BAD_REQUEST, error: message ?? ReasonPhrases.BAD_REQUEST });
    }
}
export class ForbiddenServiceError extends CustomError {
    /**
     * @status 403
     * @param message (Optional) Specify error message
     */
    constructor(message?: string) {
        super({ statusCode: constants.HTTP_STATUS_FORBIDDEN, error: message ?? ReasonPhrases.FORBIDDEN });
    }
}
export class NotFoundError extends CustomError {
    /**
     * @status 404
     * @param message (Optional) Specify error message
     */
    constructor(message?: string) {
        super({ statusCode: constants.HTTP_STATUS_NOT_FOUND, error: message ?? ReasonPhrases.NOT_FOUND });
    }
}

export class MethodNotAllowedError extends CustomError {
    /**
     * @status 405
     * @param message (Optional) Specify error message
     */
    constructor(message?: string) {
        super({ statusCode: constants.HTTP_STATUS_METHOD_NOT_ALLOWED, error: message ?? ReasonPhrases.METHOD_NOT_ALLOWED });
    }
}
