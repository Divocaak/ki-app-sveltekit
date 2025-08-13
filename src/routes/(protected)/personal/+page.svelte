<script>
	import QRCode from '@castlenine/svelte-qrcode';
    // @ts-nocheck
	import { User } from '$lib/classes/user.js';

	export let data;
	const user = User.fromJSON(data.user);
</script>

<h2>Můj profil</h2>
<a href="/home">back to home</a><br />

<p>Můj QR kód:</p>
<div style="width: 10%; height: 10%;">
	<QRCode data="/social?uid={user.id}" isJoin isResponsive />
</div>
