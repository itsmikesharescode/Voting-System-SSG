<script lang="ts">
	import { enhance } from '$app/forms';
	import printIcon from '$lib/assets/print_icon.svg';
	import Button from '$lib/components/ui/button/button.svelte';
	import { getAdminState } from '$lib/stores';

	const adminState = getAdminState();

	let printLoader = false;
</script>

<Button
	disabled={printLoader}
	type="submit"
	class="{printLoader ? 'cursor-not-allowed bg-clicked' : 'bg-mainred'}
		flex items-center gap-[10px] "
>
	<img src={printIcon} alt="poorConnection" />
	{#if printLoader}
		Generating...
	{:else}
		Generate Pdf
	{/if}
</Button>
