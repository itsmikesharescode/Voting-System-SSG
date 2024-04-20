<script lang="ts">
	import { enhance } from '$app/forms';
	import printIcon from '$lib/assets/print_icon.svg';
	import Button from '$lib/components/ui/button/button.svelte';
	import { getAdminState } from '$lib/stores';
	import type { ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';

	const adminState = getAdminState();

	let printLoader = false;

	const printActionNews: SubmitFunction = () => {
		printLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, link }
			} = result as ResultModel<{ msg: string; link: string }>;

			switch (status) {
				case 200:
					toast.success('Generate PDF', { description: msg });
					window.open(link);
					printLoader = false;
					break;

				case 400:
					toast.error('Generate PDF', { description: msg });
					printLoader = false;
					break;
			}
			await update();
		};
	};
</script>

<form method="post" action="APIS?/printAction" use:enhance={printActionNews}>
	<input name="classification" type="hidden" value={$adminState.votes.activeTab} />
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
</form>
