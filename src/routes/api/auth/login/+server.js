// @ts-nocheck
import { pool } from "$lib/db/mysql.ts";
import { validatePassword } from '$lib/auth';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
    const { email, password } = await request.json();

    const [rows] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
    if (rows.length === 0) {
        return json({ message: 'Invalid' }, { status: 401 });
    }
    const user = rows[0];

    if (!validatePassword(password, user.pass_hash)) {
        return json({ message: 'Invalid' }, { status: 401 });
    }

    /* TODO get user privilegies */
    cookies.set('session', JSON.stringify({ id: user.id, email: user.email, fullname: `${user.l_name} ${user.f_name}`, phone: user.phone }), {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
    });

    return json({ message: 'Login successful' });
}
