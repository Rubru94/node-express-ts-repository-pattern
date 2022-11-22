import { CustomError } from '@core/models/error.model';
import { SubscriptionService } from '@subscription/services/subscription.service';
import { DELETE, GET, POST, PUT, route } from 'awilix-express';
import { Request, Response } from 'express';

@route('/subscriptions')
export class CheckController {
    constructor(private readonly subscriptionService: SubscriptionService) {}

    @GET()
    async all(req: Request, res: Response): Promise<void> {
        try {
            res.send(await this.subscriptionService.all());
        } catch (error) {
            throw new CustomError(error);
        }
    }

    @route(':id')
    @GET()
    async find(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params?.id ? parseInt(req.params?.id) : null;
            res.send(await this.subscriptionService.find(id));
        } catch (error) {
            throw new CustomError(error);
        }
    }

    @POST()
    async create(req: Request, res: Response): Promise<void> {
        try {
            await this.subscriptionService.create(req.body as SubscriptionCreateDTO);
            res.send();
        } catch (error) {
            throw new CustomError(error);
        }
    }

    @route(':id')
    @PUT()
    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params?.id ? parseInt(req.params?.id) : null;
            await this.subscriptionService.update(id, req.body as SubscriptionCreateDTO);
            res.send();
        } catch (error) {
            throw new CustomError(error);
        }
    }

    @route(':id')
    @DELETE()
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params?.id ? parseInt(req.params?.id) : null;
            await this.subscriptionService.delete(id);
            res.send();
        } catch (error) {
            throw new CustomError(error);
        }
    }
}
