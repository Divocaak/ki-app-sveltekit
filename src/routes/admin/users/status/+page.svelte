<script>
	// @ts-nocheck
	export let data = null;

	async function handleSubmit(event) {
		event.preventDefault();

		const form = event.target;
		const formData = {
			uid: form.uid.value,
			sid: form.sid.value
		};

		const response = await fetch('/api/statuses/update', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		});

		const result = await response.json();
		alert(result.message);
	}
</script>

<a href="/admin/users">zpět</a><br />

<h1>změnit status</h1>
<form on:submit={handleSubmit}>
	<input readonly id="uid" name="uid" value={data.uid} style="display:none" />
	<select id="sid" name="sid">
		{#each data.statuses as status, id}
			<option value={status.id} selected={status.id == data.sid}>{status.label}</option>
		{/each}
	</select>
	<input type="submit" value="uložit" />
</form>
