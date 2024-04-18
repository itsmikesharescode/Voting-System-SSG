<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';

	export let isActive: { id: number; created_at: string; voting_active: boolean };

	let activateLoader = false;

	const activeVotingActionNews: SubmitFunction = () => {
		activateLoader = true;
		return async ({ result, update }) => {
			const { status } = result;

			switch (status) {
				case 200:
					invalidateAll();
					activateLoader = false;
					break;

				case 401:
					toast.error('Activating Vote', { description: 'Error Activating Vote' });
					activateLoader = false;
					break;
			}
			await update();
		};
	};
</script>

<form
	method="post"
	action="APIS?/activeVotingAction"
	enctype="multipart/form-data"
	use:enhance={activeVotingActionNews}
>
	<input name="isActive" type="hidden" value={isActive.voting_active ? 'false' : 'true'} />
	<input name="id" type="hidden" value={isActive.id} />
	<Button
		type="submit"
		disabled={activateLoader}
		class="rounded-[10px] text-[14px] font-semibold transition-all {isActive.voting_active
			? 'bg-green-500'
			: 'bg-mainred'}"
	>
		{#if isActive.voting_active}
			{#if activateLoader}
				Disabling...
			{:else}
				Voting is Enabled
			{/if}
		{:else}
			<p></p>
			{#if activateLoader}
				Enabling...
			{:else}
				Voting is Disabled
			{/if}
		{/if}
	</Button>
</form>
