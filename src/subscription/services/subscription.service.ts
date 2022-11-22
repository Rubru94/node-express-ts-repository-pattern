import { CustomError } from '@core/models/error.model';
import { ISubscription } from '@subscription/models/subscription.interface';
import { SubscriptionRepository } from '@subscription/repositories/subscription.repository';

export class SubscriptionService {
    constructor(private readonly subscriptionRepository: SubscriptionRepository) {}

    async all(): Promise<ISubscription[]> {
        return await this.subscriptionRepository.all();
    }

    async find(id: number): Promise<ISubscription | null> {
        return await this.subscriptionRepository.find(id);
    }

    async create(subscription: SubscriptionCreateDTO): Promise<void> {
        const entry = await this.subscriptionRepository.findByUserAndCode(subscription.userId, subscription.code);

        if (!entry) await this.subscriptionRepository.create(subscription as ISubscription);
        else throw new CustomError({ error: 'User subscription already exists' });
    }

    async update(id: number, subscription: SubscriptionUpdateDTO): Promise<void> {
        const entry = await this.subscriptionRepository.find(id);
        if (entry) this.subscriptionRepository.update({ ...entry, ...subscription } as ISubscription);
        else throw new CustomError({ error: 'Subscription not found' });
    }

    async delete(id: number): Promise<void> {
        await this.subscriptionRepository.delete(id);
    }
}
