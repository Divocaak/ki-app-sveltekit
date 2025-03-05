<script>
	// @ts-nocheck
	import { User } from '$lib/classes/user.js';

	export let data;
	const user = User.fromJSON(data.user);
</script>

<p>
	{@html user.getInfoString()}
	<a href="/logout">logout</a>
	{#if user.isAdmin()}<a href="/admin">admin</a>{/if}
	<br />
	({#each user.privileges as privilege}
		{privilege.id}: {privilege.label},&nbsp;
	{/each})
</p>

<slot />
