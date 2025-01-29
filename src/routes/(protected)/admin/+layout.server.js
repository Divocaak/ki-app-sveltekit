// @ts-nocheck
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    if (!locals.user) {
        throw redirect(302, '/login'); // Redirect if not logged in
    }

    /* REFACTOR user class */
    const adminPrivilegeId = 1;
    const isAdmin = locals.user?.privileges.some(privilege => privilege.id === adminPrivilegeId);
    if (!isAdmin) {
        throw redirect(302, '/403'); // Redirect if not an admin
    }

    return { user: locals.user };
}
