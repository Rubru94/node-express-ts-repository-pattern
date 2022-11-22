import { MethodNotAllowedError } from '@core/models/error.model';
import { NextFunction, Request, Response } from 'express';

/**
 * Router middleware to handle undefined requests
 *
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 */
export function all(req: Request, res: Response, next: NextFunction): void {
    throw new MethodNotAllowedError();
}
