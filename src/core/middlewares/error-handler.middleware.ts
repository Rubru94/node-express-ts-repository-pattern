import { CustomError } from '@core/models/error.model';
import { NextFunction, Request, Response } from 'express';
import { constants } from 'http2';

/**
 * Custom error handler to standarize error objects returned to
 * the client
 *
 * @param err Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
 */
function handleError(err: CustomError, req: Request, res: Response, next: NextFunction): void {
    if (res.headersSent) return;
    if (!(err instanceof CustomError)) err = new CustomError(err);
    let status;
    if (err.statusCode) {
        status = err.statusCode;
    }
    res.status(status ?? constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json(err);
}

export default handleError;
