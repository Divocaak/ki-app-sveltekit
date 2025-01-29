<script>
	// @ts-nocheck
	import AdminForm from '$lib/AdminForm.svelte';
	export let data = null;
</script>

<a href="/users">zpět</a><br />

<AdminForm
	schemaPath="/schemas/admin/user.json"
	endpoint="/api/users/{data.user ? 'update' : 'add'}"
	initialData={data.user}
/>
