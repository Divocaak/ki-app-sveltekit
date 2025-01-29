// @ts-nocheck
import { pool } from "$lib/db/mysql.ts";

export async function GET() {
    const [rows, fields] = await pool.query("SELECT id, label FROM structure;");

    return new Response(JSON.stringify(rows));
}