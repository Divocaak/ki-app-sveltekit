// @ts-nocheck
import { pool } from "$lib/db/mysql.ts";

export async function POST({ request }) {
    try {
        const data = await request.json();

        const [userResult] = await pool.promise().query(
            "INSERT INTO user (email, phone, f_name, l_name) VALUES (?, ?, ?, ?);",
            [data.email, parseInt(data.phone), data.f_name, data.l_name]
        );

        const userId = userResult.insertId;
        // id for neutral status
        const neutralStatusId = 1;
        const [statusResult] = await pool.promise().query(
            "INSERT INTO user_status (id_user, id_status) VALUES (?, ?);",
            [userId, neutralStatusId]
        );

        return new Response(
            JSON.stringify({ status: 200, message: `User inserted with ID ${userId}, and related data added.` }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error inserting data:", error);

        return new Response(
            JSON.stringify({ status: 500, message: "An error occurred while processing your request." }),
            { status: 500 }
        );
    }
}
