// @ts-nocheck
import { pool } from "$lib/db/mysql.ts";

export async function POST({ request }) {

    const data = await request.json();
    const [sql, _] = await pool.query("INSERT INTO product (id_structure, label, price) VALUES (?, ?, ?);", [
        data.id_structure,
        data.label,
        data.price
    ]);

    return new Response(JSON.stringify({ status: 200, message: sql.insertId }, { status: 200 }));
}