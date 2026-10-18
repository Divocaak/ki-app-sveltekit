// @ts-nocheck
export const load = async ({ url, params, fetch }) => {

  const uid = url.searchParams.get('uid');
  if (uid) {
    const result = await fetch(`/api/users/get?id=${uid}`);
    const data = await result.json();
    return { selectedUser: data };
  }
  
  return;
}