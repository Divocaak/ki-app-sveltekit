// @ts-nocheck
export const load = async ({ params, fetch }) => {

    /* URGNET only assigned */
    const result = await fetch("/api/users/getAll");
    const data = await result.json();

    return {
        users: data
    }
}