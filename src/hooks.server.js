// @ts-nocheck
import { redirect } from '@sveltejs/kit';
export async function handle({ event, resolve }) {
    const session = event.cookies.get('session');

    if (session) {
        const user = JSON.parse(session);
        event.locals.user = user;
    } else {
        event.locals.user = null;
    }

    // Define protected routes
    const protectedRoutes = ['/structures', '/users']; // Add all routes that need authentication
    const isProtectedRoute = protectedRoutes.some((path) => event.url.pathname.startsWith(path));

    // Redirect if accessing a protected route without being authenticated
    if (isProtectedRoute && !event.locals.user) {
        throw redirect(302, '/login');
    }

    return resolve(event);
}