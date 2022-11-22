import { SubscriptionService } from '@subscription/services/subscription.service';
import { DELETE, GET, POST, PUT, route } from 'awilix-express';
import { Request, Response } from 'express';

@route('/subscriptions')
export class CheckController {
    constructor(private readonly subscriptionService: SubscriptionService) {}

    @GET()
    async all(req: Request, res: Response): Promise<void> {
        res.send(await this.subscriptionService.all());
    }

    @route(':id')
    @GET()
    async find(req: Request, res: Response): Promise<void> {
        const id = req.params?.id ? parseInt(req.params?.id) : null;
        res.send(await this.subscriptionService.find(id));
    }

    @POST()
    async create(req: Request, res: Response): Promise<void> {
        await this.subscriptionService.create(req.body as SubscriptionCreateDTO);
        res.send();
    }

    @route(':id')
    @PUT()
    async update(req: Request, res: Response): Promise<void> {
        const id = req.params?.id ? parseInt(req.params?.id) : null;
        await this.subscriptionService.update(id, req.body as SubscriptionCreateDTO);
        res.send();
    }

    @route(':id')
    @DELETE()
    async delete(req: Request, res: Response): Promise<void> {
        const id = req.params?.id ? parseInt(req.params?.id) : null;
        await this.subscriptionService.delete(id);
        res.send();
    }
}
