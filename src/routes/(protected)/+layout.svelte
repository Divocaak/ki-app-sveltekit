<script>
	// @ts-nocheck
	import { User } from '$lib/classes/user.js';

	export let data;
	let user = User.fromJSON(data.user);

	async function refresh() {
		try {
			const res = await fetch('/api/auth/refresh');
			if (!res.ok) {
				alert('Session expired or user not found.');
				return;
			}
			const { user: freshUser } = await res.json();
			user = User.fromJSON(freshUser);
		} catch (err) {
			console.error(err);
			alert('Failed to refresh user data.');
		}
	}
</script>

<h1>ki-app protected</h1>
<p>
	logged in as {@html user.getInfoString()}
	<br />
	(privileges: {#each user.privileges as privilege}
		{privilege.id}: <b>{privilege.label}</b>
		{#if privilege.structureLabel}(<i>{privilege.structureLabel}</i>){/if},&nbsp;
	{/each})
</p>
<button on:click={refresh}>refresh</button>
<a href="/logout">logout</a><br />
<a href="/personal">Můj profil</a><br /><br />

<slot/>

<style>
	:global(table) {
		border-collapse: collapse;
		margin-top: 20px;
	}

	:global(td) {
		border: 1.5px solid black;
		padding: 5px;
	}

	:global(tr:nth-child(even)) {
		background-color: #b7b7b7;
	}
</style>
