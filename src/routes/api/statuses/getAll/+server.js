// @ts-nocheck
import { pool } from "$lib/db/mysql.ts";

export async function GET() {
    const [rows, fields] = await pool.promise().query('SELECT id, label FROM status;');

    return new Response(JSON.stringify(rows));
}