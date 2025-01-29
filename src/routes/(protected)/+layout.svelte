<script>
	// @ts-nocheck

	export let data;

	/* REFACTOR user class */
	const adminPrivilegeId = 1;
	const isAdmin = data.user.privileges.some((privilege) => privilege.id === adminPrivilegeId);
</script>

<p>
	logged in as <b>{data.user.fullname}</b> ({data.user.email}, {data.user.phone}, id:
	<i>{data.user.id}</i>)
	<a href="/logout">logout</a>
	{#if isAdmin}<a href="/admin">admin</a>{/if}
	<br />
	({#each data.user.privileges as privilege}
		{privilege.id}: {privilege.label},&nbsp;
	{/each})
</p>

<slot />
