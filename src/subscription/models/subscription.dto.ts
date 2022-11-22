interface SubscriptionCreateDTO {
    userId: number;
    code: string;
    amount: number;
    cron: string;
}

interface SubscriptionUpdateDTO {
    code: string;
    amount: number;
    cron: string;
}
