<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select/index';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ResultModel } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';

	const classifications = [
		{ value: 'highschool', label: 'High School' },
		{ value: 'elementary', label: 'Elementary' }
	];

	interface CreatePositionVal {
		positionName: string[];
	}

	let showCreatePosition = false;
	let createPositionLoader = false;
	let formActionErrors: CreatePositionVal | null = null;

	const createPositionActionNews: SubmitFunction = () => {
		createPositionLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<{ msg: string; errors: CreatePositionVal }>;

			switch (status) {
				case 200:
					invalidateAll();
					formActionErrors = null;
					createPositionLoader = false;
					toast.success('Create Voter', { description: msg });
					showCreatePosition = false;
					break;

				case 400:
					formActionErrors = errors;
					createPositionLoader = false;
					break;

				case 401:
					formActionErrors = null;
					toast.error('Create Voter', { description: msg });
					createPositionLoader = false;
					break;
			}
			await update();
		};
	};
</script>

<Button
	class="rounded-[10px] bg-mainred text-[14px] font-semibold"
	on:click={() => (showCreatePosition = true)}>Create Position</Button
>

<AlertDialog.Root bind:open={showCreatePosition}>
	<AlertDialog.Content>
		<form
			method="post"
			action="APIS?/createPositionAction"
			enctype="multipart/form-data"
			use:enhance={createPositionActionNews}
		>
			<AlertDialog.Header>
				<AlertDialog.Title>Create Position</AlertDialog.Title>
				<AlertDialog.Description>
					This will establish a position that candidates will occupy.
				</AlertDialog.Description>

				<div class=" flex flex-col gap-[20px] pt-[20px]">
					<div class="grid w-full items-center gap-1.5">
						<Label class="text-left  " for="positionName">Position Name</Label>
						<Input
							disabled={createPositionLoader}
							name="positionName"
							class="text-[14px] "
							type="text"
							id="positionName"
							placeholder="Enter position name"
						/>
						{#each formActionErrors?.positionName ?? [] as errorMsg}
							<p class="text-left text-[14px] text-red-600">{errorMsg}</p>
						{/each}
					</div>
				</div>
			</AlertDialog.Header>
			<AlertDialog.Footer class="mt-[20px]">
				<AlertDialog.Cancel on:click={() => (formActionErrors = null)}>Cancel</AlertDialog.Cancel>
				<Button
					disabled={createPositionLoader}
					type="submit"
					class="{createPositionLoader ? 'cursor-not-allowed bg-clicked' : 'bg-mainred'}
					 text-[14px] font-semibold"
					on:click={() => (showCreatePosition = true)}
				>
					{#if createPositionLoader}
						Creating...
					{:else}
						Create Position
					{/if}
				</Button>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
