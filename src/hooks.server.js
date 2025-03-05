// @ts-nocheck
import { User } from '$lib/classes/user';
import { redirect } from '@sveltejs/kit';
export async function handle({ event, resolve }) {
    const session = event.cookies.get('session');

    if (session) {
        event.locals.user = JSON.parse(session);
    } else {
        event.locals.user = null;
    }

    const pathname = event.route.id;
    if (pathname.startsWith('/(auth)')) return resolve(event);
    if (pathname.startsWith('/(protected)')) {
        if (!event.locals.user) throw redirect(302, '/login');
        const user = User.fromJSON(event.locals.user);

        if (user.isNeutral()) throw redirect(302, "/401"); // Unathorized
        if (user.isBanned() || user.isDeleted()) throw redirect(302, "/403"); // Forbidden

        // Restrict access to /admin for non-admins
        if (pathname.includes('/(admin)') && !user.isAdmin()) throw redirect(302, '/403'); // Redirect to Forbidden page
    }

    return resolve(event);
}