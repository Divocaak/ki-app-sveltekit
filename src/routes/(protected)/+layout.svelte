<script>
	export let data;
	console.log(data);
</script>

<!-- TODO move admin under same layout -->
<!-- TODO goto admin if permissions -->
<p>
	logged in as <b>{data.user.fullname}</b> ({data.user.email}, {data.user.phone}, id:
	<i>{data.user.id}</i>)
	<a href="/logout">logout</a>
</p>

<slot />
