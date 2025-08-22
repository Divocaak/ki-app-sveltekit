// @ts-nocheck
import { pool } from "$lib/db/mysql.ts";

export async function POST({ request }) {

    const data = await request.json();
    console.log(data);
    const recordToPay = data.recordsToSend;

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

    const placeholders = recordToPay.map(() => "(?, ?, ?)").join(", ");
    const values = recordToPay.flatMap(([id_user, id_product, created]) => [
        id_user,
        id_product,
        formatDate(created)
    ]);

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        if (data.method === "credits") {
            const [userRows] = await connection.query(
                `SELECT credits FROM user WHERE id = ? FOR UPDATE`,
                [data.uid]
            );

            if (userRows.length === 0) throw new Error("User not found");
            if (userRows[0].credits < data.sum) throw new Error("Not enough credits");

            await connection.query(
                `UPDATE user SET credits = credits - ? WHERE id = ?`,
                [data.sum, data.uid]
            );
        }

        const placeholders = values.map(() => "(?, ?, ?)").join(", ");
        await connection.query(`
            UPDATE transaction 
            SET resolved = NOW() 
            WHERE (id_user, id_product, created) IN (${placeholders})`,
            values.flat()
        );

        await connection.commit();

    } catch (err) {
        await connection.rollback();
        console.error("Transaction failed:", err.message);
        throw err;
    } finally {
        connection.release();
    }
}