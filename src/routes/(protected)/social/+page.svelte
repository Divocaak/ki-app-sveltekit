<script>
	// @ts-nocheck
	import { User } from '$lib/classes/user';

	export let data;
	const selectedUser = User.fromJSON(data.selectedUser);
	const loggedUser = User.fromJSON(data.user);

	let creditsToAdd = 0;

	async function handleSubmit(event) {
		event.preventDefault();
		if (!confirm('Potvrzuji, že uživatel zaplatil nabíjenou hodnotu v Kč')) return;

		try {
			const response = await fetch('/api/users/updateCredits', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ creditsToAdd, id: selectedUser.id })
			});

			if (response.ok) {
				alert('success');
				location.reload();
			} else {
				alert('Error');
			}
		} catch (error) {
			console.error(error);
			alert('Failed to connect to the server');
		}
	}
</script>

<h2>Social</h2>
<a href="/home">back to protected</a><br />
<br />

{@html selectedUser.getInfoString()}<br />
<br />
{#if loggedUser.isBartender()}
	<form on:submit={handleSubmit}>
		<label for="value">Nabít kredity</label>
		<input name="value" id="value" type="number" min="0" required bind:value={creditsToAdd} />
		<button type="submit">Nabít</button>
	</form>
{/if}
