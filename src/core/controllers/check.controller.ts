import { GET, route } from 'awilix-express';
import { Request, Response } from 'express';
import { TestService } from '@test/services/test.service';

@route('/check')
export class CheckController {
    constructor(private readonly testService: TestService) {}

    @GET()
    public index(req: Request, res: Response): void {
        res.send({
            APP_HOST: process.env.APP_HOST
        });
    }

    @route('/test')
    @GET()
    public test(req: Request, res: Response): void {
        res.send(this.testService.get());
    }
}
