// @ts-nocheck
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    if (!locals.user) {
        throw redirect(302, '/login'); // Redirect if not logged in
    }

    return { user: locals.user };
}
