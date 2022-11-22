export interface ISubscription {
    id: number;
    userId: number;
    code: string;
    amount: number;
    cron: string;
    createdAt?: Date;
    updatedAt?: Date;
}
