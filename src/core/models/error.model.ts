export class CustomError extends Error {
    readonly statusCode: number;
    message: string;

    constructor(msg: string = 'An unexpected error occurred') {
        super(msg);
    }
}
