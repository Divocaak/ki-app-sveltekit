// @ts-nocheck
import { pool } from "$lib/db/mysql.ts";

export async function POST({ request }) {

    const data = await request.json();
    const [rows, fields] = await pool.query(`SELECT u.id AS uid, u.f_name, u.l_name, u.email, u.phone, p.id AS pid, p.label, p.price, t.created FROM transaction t
        INNER JOIN user u ON u.id=t.id_user
        INNER JOIN product p ON p.id=t.id_product
        WHERE p.id_structure=? AND resolved IS NULL
        ORDER BY t.created DESC, u.id;`,
    data.sid);

    return new Response(JSON.stringify(rows));
}