export interface SubscriptionCreateDTO {
    userId: number;
    code: string;
    amount: number;
    cron: string;
}

export interface SubscriptionUpdateDTO {
    code: string;
    amount: number;
    cron: string;
}
