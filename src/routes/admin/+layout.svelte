<slot />

<style>
	:global(table) {
		border-collapse: collapse;
        margin-top:20px;
	}

	:global(td) {
		border: 1.5px solid black;
		padding: 5px;
	}

	:global(tr:nth-child(even)) {
		background-color: #b7b7b7;
	}
</style>
