import { ISubscription } from '@subscription/models/subscription.interface';

export interface SubscriptionRepository {
    all(): Promise<ISubscription[]>;
    find(id: number): Promise<ISubscription>;
    findByUserAndCode(userId: number, code: string): Promise<ISubscription>;
    create(obj: ISubscription): Promise<void>;
    update(obj: ISubscription): Promise<void>;
    delete(id: number): Promise<void>;
}
