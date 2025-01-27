// @ts-nocheck
import { redirect } from '@sveltejs/kit';

export async function GET({ cookies, locals }) {
    if (!locals.user) throw redirect(302, '/');

    cookies.delete('session', { path: '/' });
    throw redirect(302, '/');
}
