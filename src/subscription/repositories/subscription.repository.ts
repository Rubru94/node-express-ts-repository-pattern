import { Subscription } from '@subscription/models/subscription.interface';

export interface SubscriptionRepository {
    all(): Promise<Subscription[]>;
    find(id: number): Promise<Subscription>;
    findByUserAndCode(userId: number, code: string): Promise<Subscription>;
    create(obj: Subscription): Promise<void>;
    update(obj: Subscription): Promise<void>;
    delete(id: number): Promise<void>;
}
