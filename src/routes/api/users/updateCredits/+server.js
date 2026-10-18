// @ts-nocheck
import { pool } from "$lib/db/mysql.ts";

export async function POST({ request }) {

    const data = await request.json();
    await pool.query("UPDATE user SET credits = credits + ? WHERE id=?;", [
        parseInt(data.creditsToAdd),
        data.id
    ]);

    return new Response(JSON.stringify({ status: 200, message: "upraveno v db" }, { status: 200 }));
}