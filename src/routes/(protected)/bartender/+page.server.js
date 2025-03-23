// @ts-nocheck
export const load = async ({ url, params, fetch, locals }) => {

    const response = await fetch("/api/structures/getUsers", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uid: locals.user.id })
    });
    const result = await response.json();

    return {
        structures: result
    }
}