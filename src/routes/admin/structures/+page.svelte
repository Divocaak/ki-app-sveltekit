<script>
	export let data;
</script>

<h1>budovy</h1>
<a href="/admin">zpět</a><br />
<a href="/admin/structures/form">přidat novou</a>

<table>
	<thead>
		<tr>
			<th scope="col">id</th>
			<th scope="col">label</th>
			<th scope="col"></th>
			<th scope="col"></th>
			<th scope="col"></th>
		</tr>
	</thead>
	<tbody>
		{#each data.structures as structure}
			<tr>
				<td>
					{structure.id}
				</td>
				<td>
					<b>{structure.label}</b>
				</td>
				<td>
					<a href="/admin/structures/form?id={structure.id}">upravit</a>
				</td>
				<td>
					<a href="/admin/structures/products/{structure.id}">produkty</a>
				</td>
				<td>
					<a href="/admin/structures/attendance?sid={structure.id}">prezenční systém</a>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
