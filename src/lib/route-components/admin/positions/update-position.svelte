<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select/index';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { PositionsDB, ResultModel } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import { fade } from 'svelte/transition';
	import { invalidateAll } from '$app/navigation';

	export let positionObj: PositionsDB;

	const classifications = [
		{ value: 'highschool', label: 'High School' },
		{ value: 'elementary', label: 'Elementary' }
	];

	let showUpdateVoterDialoag = false;

	interface UpdateVoterVal {
		classification: string[];
		positionName: string[];
		maximumVotes: string[];
	}

	let updatePositionLoader = false;
	let formActionErrors: UpdateVoterVal | null = null;
	const updatePositionActionNews: SubmitFunction = () => {
		updatePositionLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<{ msg: string; errors: UpdateVoterVal }>;
			switch (status) {
				case 200:
					invalidateAll();
					formActionErrors = null;
					toast.success('Update Voter', { description: msg });
					updatePositionLoader = false;
					showUpdateVoterDialoag = false;
					break;

				case 400:
					formActionErrors = errors;
					updatePositionLoader = false;
					break;

				case 401:
					toast.error('Update Voter', { description: msg });
					formActionErrors = null;
					updatePositionLoader = false;
					break;
			}
			await update();
		};
	};

	const detectClassification = () => {
		const matchedArray = classifications.filter(
			(classification) => classification.value === positionObj.classification
		);

		return matchedArray[0];
	};
</script>

<Button
	class="w-full transition-all hover:bg-mainred"
	on:click={() => (showUpdateVoterDialoag = true)}>Update</Button
>

<AlertDialog.Root bind:open={showUpdateVoterDialoag}>
	<AlertDialog.Content>
		<form
			method="post"
			action="APIS?/updatePositionAction"
			enctype="multipart/form-data"
			use:enhance={updatePositionActionNews}
		>
			<input name="classification" type="hidden" value={positionObj.classification} />
			<input name="positionId" type="hidden" value={positionObj.id} />

			<AlertDialog.Header>
				<AlertDialog.Title>{positionObj.position_name}</AlertDialog.Title>
				<AlertDialog.Description>This will update position information.</AlertDialog.Description>

				<div class=" flex flex-col gap-[20px] pt-[20px]">
					<Select.Root selected={detectClassification()} disabled={updatePositionLoader}>
						<Select.Trigger class="w-full">
							<Select.Value placeholder="Choose voter classification" />
						</Select.Trigger>
						<Select.Content class="mt-[10px]">
							<Select.Group>
								<Select.Label class="text-left">Select Voter Classification</Select.Label>
								{#each classifications as classification}
									<Select.Item value={classification.value} label={classification.label}
										>{classification.label}</Select.Item
									>
								{/each}
							</Select.Group>
						</Select.Content>
						<Select.Input name="classification" />
					</Select.Root>
					{#each formActionErrors?.classification ?? [] as errorMsg}
						<p class="text-left text-[14px] text-red-600" in:fade>{errorMsg}</p>
					{/each}

					<div class="grid w-full gap-1.5">
						<Label class="text-left " for="positionName">Position Name</Label>
						<Input
							disabled={updatePositionLoader}
							name="positionName"
							class="text-[14px] "
							type="text"
							id="positionName"
							placeholder="Enter position name"
							value={positionObj.position_name}
						/>
						{#each formActionErrors?.positionName ?? [] as errorMsg}
							<p class="text-left text-[14px] text-red-600" in:fade>{errorMsg}</p>
						{/each}
					</div>

					<div class="grid w-full gap-1.5">
						<Label class="text-left " for="maximumVotes">Maximum Votes</Label>
						<Input
							disabled={updatePositionLoader}
							name="maximumVotes"
							class="text-[14px] "
							type="number"
							id="maximumVotes"
							placeholder="Enter position name"
							value={positionObj.maximum_votes}
						/>
						{#each formActionErrors?.maximumVotes ?? [] as errorMsg}
							<p class="text-left text-[14px] text-red-600" in:fade>{errorMsg}</p>
						{/each}
					</div>
				</div>
			</AlertDialog.Header>
			<AlertDialog.Footer class="mt-[20px]">
				<AlertDialog.Cancel
					disabled={updatePositionLoader}
					on:click={() => (formActionErrors = null)}
					>Cancel
				</AlertDialog.Cancel>
				<Button
					disabled={updatePositionLoader}
					class="hover:bg-mainred active:bg-clicked"
					type="submit"
				>
					{#if updatePositionLoader}
						Updating...
					{:else}
						Update Position
					{/if}
				</Button>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
