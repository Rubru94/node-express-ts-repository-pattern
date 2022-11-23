import { CustomError } from '@core/models/error.model';
import { SubscriptionCreateDTO, SubscriptionUpdateDTO } from '@subscription/models/subscription.dto';
import { Subscription } from '@subscription/models/subscription.interface';
import { SubscriptionRepository } from '@subscription/repositories/subscription.repository';

export class SubscriptionService {
    constructor(private readonly subscriptionRepository: SubscriptionRepository) {}

    async all(): Promise<Subscription[]> {
        return await this.subscriptionRepository.all();
    }

    async find(id: number): Promise<Subscription> {
        return await this.subscriptionRepository.find(id);
    }

    async create(subscription: SubscriptionCreateDTO): Promise<void> {
        const entry = await this.subscriptionRepository.findByUserAndCode(subscription.userId, subscription.code);
        if (!entry) await this.subscriptionRepository.create(subscription as Subscription);
        else throw new CustomError({ error: 'User subscription already exists' });
    }

    async update(id: number, subscription: SubscriptionUpdateDTO): Promise<void> {
        const entry = await this.subscriptionRepository.find(id);
        if (entry) this.subscriptionRepository.update({ ...subscription } as Subscription);
        else throw new CustomError({ error: 'Subscription not found' });
    }

    async delete(id: number): Promise<Subscription> {
        const subscription = await this.subscriptionRepository.find(id);
        await this.subscriptionRepository.delete(id);
        return subscription;
    }
}
