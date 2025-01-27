// @ts-nocheck
import { redirect } from '@sveltejs/kit';
export async function handle({ event, resolve }) {
    const session = event.cookies.get('session');

    if (session) {
        event.locals.user = JSON.parse(session);
    } else {
        event.locals.user = null;
    }

    const { pathname } = event.url;

    // Redirect unauthenticated users accessing protected routes
    if ((pathname.startsWith('/(protected)') || pathname.startsWith('/admin')) && !event.locals.user) {
        throw redirect(302, '/login');
    }

    // Restrict access to /admin for non-admins
    /* TODO error pages */
    /* URGENT based on priviliegies from db */
    if (pathname.startsWith('/admin') && event.locals.user?.role !== 'admin') {
        throw redirect(302, '/403'); // Redirect to Forbidden page
    }

    return resolve(event);
}