import { createPool, Pool, PoolOptions } from 'mysql2/promise';

class MySQLDatabase {
    private pool: Pool;
    private poolOptions: PoolOptions = {
        host: process.env.DB_SQL_DEFAULT_HOST,
        port: Number(process.env.DB_SQL_DEFAULT_PORT),
        user: process.env.DB_SQL_DEFAULT_USER,
        password: process.env.DB_SQL_DEFAULT_PASSWORD,
        database: process.env.DB_SQL_DEFAULT_DATABASE,
        decimalNumbers: true,
        namedPlaceholders: true
    };

    connect(): void {
        try {
            this.pool = createPool(this.poolOptions);
            console.info('[MySQL] Connected');
        } catch (error) {
            console.error(`[MySQL] Connection error: ${error.message}`);
        }
    }

    get connector(): Pool {
        return this.pool;
    }
}

export default new MySQLDatabase();
