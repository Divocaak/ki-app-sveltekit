// @ts-nocheck
import { pool } from "$lib/db/mysql.ts";

export async function POST({ request }) {

    const data = await request.json();
    await pool.promise().query("UPDATE product SET label=?, price=? WHERE id=?;", [
        data.label,
        data.price,
        data.id
    ]);

    return new Response(JSON.stringify({ status: 200, message: "upraveno v db" }, { status: 200 }));
}