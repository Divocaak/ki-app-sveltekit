import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_SOCKET } from "$env/static/private";
import mysql, { type Pool, type PoolConnection } from 'mysql2';

// Create a connection pool
export const pool: Pool = mysql.createPool({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    socketPath: DB_SOCKET,
});

// Test the connection
pool.getConnection((err: Error | null, connection: PoolConnection | undefined) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        throw err;
    }
    console.log('Database connected successfully');
    connection?.release(); // Release the connection back to the pool
});