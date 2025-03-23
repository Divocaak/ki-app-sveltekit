<script>
	// @ts-nocheck
	import { User } from '$lib/classes/user';

	export let data;
	const user = User.fromJSON(data.user);
</script>

<h2>home</h2>
<a href="/">back to public</a><br />
<br />
<a href="/scanner">qr scanner</a><br />
{#if user.isBartender()}<a href="/bartender">bartender</a>{/if}
