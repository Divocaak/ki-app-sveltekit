// @ts-nocheck
import { pool } from "$lib/db/mysql.ts";

export async function POST({ request }) {

    const data = await request.json();

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const placeholders = data.map(() => "(?, ?, ?)").join(", ");
    const values = data.flatMap(([id_user, id_product, created]) => [
        id_user,
        id_product,
        formatDate(created)
    ]);

    const [rows] = await pool.query(`UPDATE transaction SET resolved = NOW() WHERE (id_user, id_product, created) IN (${placeholders})`, values);

    return new Response(JSON.stringify("rows"));
}