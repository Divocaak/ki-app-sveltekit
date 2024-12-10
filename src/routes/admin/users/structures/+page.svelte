<script>
	// @ts-nocheck
	export let data = null;

	let links = data.userStructures.reduce((acc, link) => {
		acc[link.id_structure] = link.active;
		return acc;
	}, {});

	async function handleSubmit(event) {
		event.preventDefault();

		const form = event.target;
		const formData = new FormData(event.target);
		const updates = [];
		for (const [key, value] of formData.entries()) {
			if (key !== 'uid') updates.push({ structureId: Number(key), active: value === 'on' });
		}

		const response = await fetch(`/api/userStructures/set`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ uid: form.uid.value, updates: updates })
		});

		const result = await response.json();
		alert(result.message);
	}
</script>

<a href="/admin/users">zpět</a><br />

<h1>přiřazení k budovám</h1>
<form on:submit={handleSubmit}>
	<input readonly id="uid" name="uid" value={data.uid} style="display:none" />
	<table>
		<thead>
			<tr>
				<th>budova</th>
				<th>přiřazení</th>
			</tr>
		</thead>
		<tbody>
			{#each data.structures as structure}
				<tr>
					<td>{structure.label}</td>
					<td>
						<input type="checkbox" name={structure.id} checked={links[structure.id] || false} />
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<input type="submit" value="uložit" />
</form>
