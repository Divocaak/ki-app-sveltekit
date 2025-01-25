// @ts-nocheck
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    if (!locals.user) {
        throw redirect(302, '/login'); // Redirect if not logged in
    }

    if (locals.user.role !== 'admin') {
        throw redirect(302, '/403'); // Redirect if not an admin
    }

    return { user: locals.user };
}
