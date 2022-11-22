import connector from '@core/database/mysql.persistence';
import { ISubscription } from '@subscription/models/subscription.interface';
import { SubscriptionRepository } from '@subscription/repositories/subscription.repository';

export class SubscriptionRepositoryMySQL implements SubscriptionRepository {
    async all(): Promise<ISubscription[]> {
        const [rows] = await connector.execute(`SELECT * FROM WalletSubscription ORDER BY id DESC`);
        return rows as ISubscription[];
    }

    async find(id: number): Promise<ISubscription> | null {
        const [rows]: any[] = await connector.execute(`SELECT * FROM WalletSubscription WHERE id=:id`, { id });
        return rows?.length ? (rows[0] as ISubscription) : null;
    }

    async findByUserAndCode(userId: number, code: string): Promise<ISubscription> | null {
        const [rows]: any[] = await connector.execute(`SELECT * FROM WalletSubscription WHERE user_id=:userId AND code=:code`, {
            userId,
            code
        });
        return rows?.length ? (rows[0] as ISubscription) : null;
    }

    async create(susbcription: ISubscription): Promise<void> {
        await connector.execute(
            `INSERT INTO WalletSubscription(user_id, code, amount, cron, created_at) VALUES(:userId, :code, :amount, :cron, :createdAt)`,
            {
                userId: susbcription.userId,
                code: susbcription.code,
                amount: susbcription.amount,
                cron: susbcription.cron,
                createdAt: new Date()
            }
        );
    }

    async update(susbcription: ISubscription): Promise<void> {
        await connector.execute(
            `UPDATE WalletSubscription SET user_id=:userId, code=:code, amount=:amount, cron=:cron, updated_at=:updatedAt) WHERE id = :id`,
            {
                id: susbcription.id,
                userId: susbcription.userId,
                code: susbcription.code,
                amount: susbcription.amount,
                cron: susbcription.cron,
                updatedAt: new Date()
            }
        );
    }

    async delete(id: number): Promise<void> {
        await connector.execute(`DELETE FROM WalletSubscription WHERE id=:id)`, { id });
    }
}
