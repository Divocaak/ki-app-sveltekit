// @ts-nocheck
import { fetchUserByEmail } from '$lib/fetchUserByEmail.js';
import { json } from '@sveltejs/kit';

export async function GET({ cookies }) {
    const session = cookies.get('session');
    if (!session) {
        return json({ message: 'not authenticated' }, { status: 401 });
    }

    const parsedSession = JSON.parse(session);
    const user = await fetchUserByEmail(parsedSession.email);

    if (!user) {
        return json({ message: 'user not found' }, { status: 404 });
    }

    delete user.pass_hash;

    return json({ user });
}
