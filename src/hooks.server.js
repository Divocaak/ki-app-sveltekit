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

    if (pathname.startsWith('/(protected)') && !event.locals.user) throw redirect(302, '/login');
    
    /* BUG check user status */

    // Restrict access to /admin for non-admins
    /* REFACTOR user class */
    const adminPrivilegeId = 1;
    const isAdmin = event.locals.user?.privileges.some(privilege => privilege.id === adminPrivilegeId);
    if (pathname.startsWith('/admin') && !isAdmin) {
        throw redirect(302, '/403'); // Redirect to Forbidden page
    }

    /* TODO error pages */

    return resolve(event);
}