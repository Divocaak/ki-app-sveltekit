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

    if (pathname.startsWith('/(auth)')) return resolve(event);
    if (pathname.startsWith('/(protected)') && !event.locals.user) throw redirect(302, '/login');

    /* REFACTOR user class */
    const neutralStatusId = 1;
    const approvedStatusId = 2;
    const bannedStatusId = 3;
    const deletedStatusId = 4;
    const userStatusId = event.locals.user?.status.id;
    console.log(userStatusId);
    /* NOTE rewrite and pass message what went wrong */
    if (userStatusId == neutralStatusId) throw redirect(302, "/403");
    if (userStatusId == bannedStatusId || userStatusId == deletedStatusId) throw redirect(302, "/403");

    // Restrict access to /admin for non-admins
    const adminPrivilegeId = 1;
    const isAdmin = event.locals.user?.privileges.some(privilege => privilege.id === adminPrivilegeId);
    if (pathname.startsWith('/admin') && !isAdmin) {
        throw redirect(302, '/403'); // Redirect to Forbidden page
    }

    return resolve(event);
}