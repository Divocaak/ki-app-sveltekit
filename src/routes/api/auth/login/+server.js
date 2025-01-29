// @ts-nocheck
import { pool } from "$lib/db/mysql.ts";
import { validatePassword } from '$lib/auth';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
    const { email, password } = await request.json();

    const [rows] = await pool.query(`
        SELECT u.id, u.email, u.pass_hash, u.phone, u.f_name, u.l_name, s.id AS statusId, s.label FROM user_status us
        INNER JOIN user u ON us.id_user=u.id
        INNER JOIN status s ON us.id_status=s.id
        WHERE u.email = ?;`,
        [email]);

    if (rows.length === 0) {
        return json({ message: 'user does not exist' }, { status: 401 });
    }

    if (!validatePassword(password, rows[0].pass_hash)) {
        return json({ message: 'invalid credentials' }, { status: 401 });
    }

    /* REFACTOR create user class */
    const user = {
        id: rows[0].id,
        email: rows[0].email,
        fullname: `${rows[0].l_name} ${rows[0].f_name}`,
        phone: rows[0].phone,
        status: {
            id: rows[0].statusId,
            label: rows[0].label
        },
        privileges: []
    };

    const [prows] = await pool.query(`
        SELECT p.id, p.label FROM user_privilege up
        INNER JOIN privilege p ON up.id_privilege=p.id
        WHERE up.id_user = ?;`,
        [user.id]);
    user.privileges = prows;

    cookies.set('session', JSON.stringify(user), {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
    });

    return json({ message: 'successful' });
}
