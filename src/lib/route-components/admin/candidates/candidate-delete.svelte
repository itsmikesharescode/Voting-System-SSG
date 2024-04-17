<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import type { CandidatesDB, PositionsDB, ResultModel } from '$lib/types';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';

	export let candidateObj: CandidatesDB | null;

	let showDeleteDialog = false;

	let deleteCandidateLoader = false;

	const deleteCandidateActionNews: SubmitFunction = () => {
		deleteCandidateLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg }
			} = result as ResultModel<{ msg: string }>;

			switch (status) {
				case 200:
					invalidateAll();
					toast.success('Delete Position', { description: msg });
					deleteCandidateLoader = false;
					showDeleteDialog = false;
					break;

				case 401:
					toast.error('Delete Position', { description: msg });
					deleteCandidateLoader = false;
					break;
			}
			await update();
		};
	};
</script>

<Button class="w-full transition-all hover:bg-mainred" on:click={() => (showDeleteDialog = true)}
	>Delete</Button
>

<AlertDialog.Root bind:open={showDeleteDialog}>
	<AlertDialog.Content>
		<form
			method="post"
			action="APIS?/deleteCandidateAction"
			enctype="multipart/form-data"
			use:enhance={deleteCandidateActionNews}
		>
			<input name="candidateId" type="hidden" value={candidateObj?.id} />
			<input name="candidateName" type="hidden" value={candidateObj?.candidate_fullname} />
			<input name="classification" type="hidden" value={candidateObj?.classification} />

			<AlertDialog.Header>
				<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
				<AlertDialog.Description>
					<p>
						This action cannot be undone. This will permanently delete the candidate <b
							class="text-mainred">{candidateObj?.candidate_fullname}</b
						> and remove its data to our database.
					</p>
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer class="mt-[20px]">
				<AlertDialog.Cancel disabled={deleteCandidateLoader}>Cancel</AlertDialog.Cancel>
				<Button
					disabled={deleteCandidateLoader}
					class="hover:bg-mainred active:bg-clicked"
					type="submit"
				>
					{#if deleteCandidateLoader}
						Deleting...
					{:else}
						Delete This Candidate
					{/if}
				</Button>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
