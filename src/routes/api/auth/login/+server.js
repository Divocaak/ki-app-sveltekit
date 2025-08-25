// @ts-nocheck
import { pool } from "$lib/db/mysql.ts";
import { validatePassword } from '$lib/auth';
import { json } from '@sveltejs/kit';
import { User } from "$lib/classes/user.js";
import { Status } from "$lib/classes/status.js";
import { fetchUserByEmail } from "$lib/fetchUserByEmail.js";

export async function POST({ request, cookies }) {
    const { email, password } = await request.json();

    // Fetch user data
    const user = await fetchUserByEmail(email);

    if (!user) {
        return json({ message: 'user does not exist' }, { status: 401 });
    }

    // Validate password using pass_hash
    if (!validatePassword(password, user.pass_hash)) {
        return json({ message: 'invalid credentials' }, { status: 401 });
    }

    // Remove sensitive info before sending to client
    delete user.pass_hash;

    // Save user session
    cookies.set('session', JSON.stringify(user), {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
    });

    return json({ message: 'successful', user });
}