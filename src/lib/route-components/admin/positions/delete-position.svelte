<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import type { PositionsDB, ResultModel } from '$lib/types';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';

	export let positionObj: PositionsDB;

	let showDeleteDialog = false;

	let deletePositionLoader = false;

	const deletePositionActionNews: SubmitFunction = () => {
		deletePositionLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg }
			} = result as ResultModel<{ msg: string }>;

			switch (status) {
				case 200:
					invalidateAll();
					toast.success('Delete Position', { description: msg });
					deletePositionLoader = false;
					showDeleteDialog = false;
					break;

				case 401:
					toast.error('Delete Position', { description: msg });
					deletePositionLoader = false;
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
			action="APIS?/deletePositionAction"
			enctype="multipart/form-data"
			use:enhance={deletePositionActionNews}
		>
			<input name="positionId" type="hidden" value={positionObj.id} />
			<input name="positionName" type="hidden" value={positionObj.position_name} />
			<input name="classification" type="hidden" value={positionObj.classification} />

			<AlertDialog.Header>
				<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
				<AlertDialog.Description>
					<p>
						This action cannot be undone. This will permanently delete the position name <b
							class="text-mainred">{positionObj.position_name}</b
						> and remove its data to our database.
					</p>
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer class="mt-[20px]">
				<AlertDialog.Cancel disabled={deletePositionLoader}>Cancel</AlertDialog.Cancel>
				<Button
					disabled={deletePositionLoader}
					class="hover:bg-mainred active:bg-clicked"
					type="submit"
				>
					{#if deletePositionLoader}
						Deleting...
					{:else}
						Delete This Position
					{/if}
				</Button>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
