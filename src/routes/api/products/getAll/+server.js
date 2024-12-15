// @ts-nocheck
import { pool } from "$lib/db/mysql.ts";

export async function GET({ request, params, url }) {
    const [rows, fields] = await pool.promise().query('SELECT id, label, price FROM product WHERE id_structure=?;', url.searchParams.get("sid"));

    return new Response(JSON.stringify(rows));
}