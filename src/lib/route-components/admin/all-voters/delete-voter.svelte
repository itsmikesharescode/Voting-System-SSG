<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import type { ResultModel, UserListDB } from '$lib/types';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';

	export let voterObj: UserListDB;

	let showDeleteVoterDialog = false;

	let deleteVoterLoader = false;

	const deleteVoterActionNews: SubmitFunction = () => {
		deleteVoterLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg }
			} = result as ResultModel<{ msg: string }>;

			switch (status) {
				case 200:
					invalidateAll();
					toast.success('Delete Account', { description: msg });
					deleteVoterLoader = false;
					showDeleteVoterDialog = false;
					break;

				case 401:
					toast.error('Delete Account', { description: msg });
					deleteVoterLoader = false;
					break;
			}
			await update();
		};
	};
</script>

<Button
	class="w-full transition-all hover:bg-mainred"
	on:click={() => (showDeleteVoterDialog = true)}>Delete</Button
>

<AlertDialog.Root bind:open={showDeleteVoterDialog}>
	<AlertDialog.Content>
		<form
			method="post"
			action="APIS?/deleteVoterAction"
			enctype="multipart/form-data"
			use:enhance={deleteVoterActionNews}
		>
			<input name="voterId" type="hidden" value={voterObj.id} />
			<input name="userId" type="hidden" value={voterObj.user_id ?? 'no value'} />
			<AlertDialog.Header>
				<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
				<AlertDialog.Description>
					<p>
						This action cannot be undone. This will permanently delete the voter account of <b
							class="text-mainred">{voterObj.user_fullname}</b
						> and remove its data to our database.
					</p>
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer class="mt-[20px]">
				<AlertDialog.Cancel disabled={deleteVoterLoader}>Cancel</AlertDialog.Cancel>
				<Button
					disabled={deleteVoterLoader}
					class="hover:bg-mainred active:bg-clicked"
					type="submit"
				>
					{#if deleteVoterLoader}
						Deleting...
					{:else}
						Delete This Account
					{/if}
				</Button>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
