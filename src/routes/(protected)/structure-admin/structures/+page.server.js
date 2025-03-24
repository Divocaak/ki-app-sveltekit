export const load = async ({ params, fetch }) => {

    /* BUG only where assigned */
    const result = await fetch("/api/structures/getAll");
    const data = await result.json();

    return {
        structures: data
    }
}