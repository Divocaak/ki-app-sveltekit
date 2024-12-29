<script>
	import { page } from '$app/stores';
	export let data;
</script>

<h1>produkty</h1>
<a href="/structures">zpět</a><br />
<a href="/structures/products/{$page.params.sid}/form">přidat nový</a>

<table>
	<thead>
		<tr>
			<th scope="col">id</th>
			<th scope="col">label</th>
			<th scope="col">price</th>
			<th scope="col"></th>
			<th scope="col"></th>
		</tr>
	</thead>
	<tbody>
		{#each data.products as product}
			<tr>
				<td>
					{product.id}
				</td>
				<td>
					<b>{product.label}</b>
				</td>
				<td>
					{product.price} Kč
				</td>
				<td>
					<a href="/structures/products/{$page.params.sid}/form?id={product.id}">upravit</a>
				</td>
				<td>
					<a href="/structures/products/{$page.params.sid}/qr?id={product.id}">qr kód</a>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
