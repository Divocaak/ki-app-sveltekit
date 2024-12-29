// @ts-nocheck
import { pool } from "$lib/db/mysql.ts";
import { validatePassword } from '$lib/auth';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
    const { email, password } = await request.json();

    // Fetch user from database
    const [rows] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
    if (rows.length === 0) {
        return json({ message: 'Invalid' }, { status: 401 });
    }
    const user = rows[0];

    // Validate password
    if (!validatePassword(password, user.password_hash)) {
        return json({ message: 'Invalid' }, { status: 401 });
    }

    // Create session cookie
    cookies.set('session', JSON.stringify({ userId: user.id, email: user.email }), {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
    });

    return json({ message: 'Login successful' });
}
