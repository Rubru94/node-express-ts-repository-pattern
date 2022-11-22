import { createPool } from 'mysql2/promise';

export default createPool({
    host: process.env.DB_SQL_DEFAULT_HOST,
    port: Number(process.env.DB_SQL_DEFAULT_PORT),
    user: process.env.DB_SQL_DEFAULT_USER,
    password: process.env.DB_SQL_DEFAULT_PASSWORD,
    database: process.env.DB_SQL_DEFAULT_DATABASE,
    decimalNumbers: true
});
