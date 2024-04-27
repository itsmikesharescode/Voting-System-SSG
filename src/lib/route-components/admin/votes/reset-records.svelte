<script lang="ts">
	import { RefreshCcw } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { Label } from '$lib/components/ui/label';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { fade } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ResultModel } from '$lib/types';
	import { toast } from 'svelte-sonner';

	let showResetDataDialog = false;

	let selection = '';
	let applyLoader = false;
	const resetDataActionNews: SubmitFunction = () => {
		applyLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg }
			} = result as ResultModel<{ msg: string }>;

			switch (status) {
				case 200:
					toast.success('Reset Data', { description: msg });
					applyLoader = false;
					showResetDataDialog = false;
					break;

				case 401:
					toast.error('Reset Data', { description: msg });
					applyLoader = false;
					break;
			}
			await update();
		};
	};
</script>

<Button
	type="submit"
	class="flex items-center gap-[10px] bg-mainred active:bg-clicked "
	on:click={() => (showResetDataDialog = true)}
>
	<RefreshCcw />
	Reset Data
</Button>

<AlertDialog.Root bind:open={showResetDataDialog}>
	<AlertDialog.Content>
		<form method="post" action="/admin/APIS?/resetDataAction" use:enhance={resetDataActionNews}>
			<input name="selected" type="hidden" value={selection} />
			<AlertDialog.Header>
				<AlertDialog.Title>Reset Data</AlertDialog.Title>
				<AlertDialog.Description>
					This action cannot be undone. This will permanently delete all data in database.

					<RadioGroup.Root bind:value={selection} class="mt-[20px] flex flex-col gap-[10px]">
						<div class="flex items-center space-x-2">
							<RadioGroup.Item value="resetVoteNvotedCounts" id="resetVoteNvotedCounts" />
							<Label for="resetVoteNvotedCounts" class="text-black"
								>Reset Votes and Voted Counts</Label
							>
						</div>
						{#if selection === 'resetVoteNvotedCounts'}
							<div class="" in:fade>
								<p class="text-red-500">
									Select this option to reset all vote counts to 0. All voters who have previously
									voted will then have the opportunity to vote again.
								</p>
							</div>
						{/if}

						<div class="flex items-center space-x-2">
							<RadioGroup.Item value="cleanReset" id="cleanReset" />
							<Label for="cleanReset" class="text-black">Clean Database Reset</Label>
						</div>

						{#if selection === 'cleanReset'}
							<div class="" in:fade>
								<p class="text-red-500">
									Select this option to reset data for the following routes: dashboard, votes, all
									voters, positions, and candidates.
								</p>
							</div>
						{/if}
					</RadioGroup.Root>
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel disabled={applyLoader}>Cancel</AlertDialog.Cancel>
				{#if selection.length}
					<Button
						disabled={applyLoader}
						type="submit"
						class="flex items-center gap-[10px] bg-mainred active:bg-clicked "
					>
						{#if applyLoader}
							<RefreshCcw class="animate-spin" /> Working ...
						{:else}
							Apply
						{/if}
					</Button>
				{/if}
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
