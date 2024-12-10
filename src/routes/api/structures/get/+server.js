// @ts-nocheck
import { pool } from "$lib/db/mysql.ts";

export async function GET({ request, params, url }) {
    let result;
    await pool.promise().query("SELECT id, label, addr_label, addr_street, addr_town, addr_country_code FROM structure WHERE id=?", url.searchParams.get("id"))
        .then(([rows, fields]) => result = rows[0]);

    return new Response(JSON.stringify(result));
}