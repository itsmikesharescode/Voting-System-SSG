<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select/index';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { CandidatesDB, PositionsDB, ResultModel } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import { fade } from 'svelte/transition';
	import { invalidateAll } from '$app/navigation';

	export let candidateObj: CandidatesDB | null;

	const classifications = [
		{ value: 'highschool', label: 'High School' },
		{ value: 'elementary', label: 'Elementary' }
	];

	let showCandidateDetailsDialog = false;

	interface UpdateVoterVal {
		classification: string[];
		positionName: string[];
	}

	let candidateDetailsLoader = false;
	let formActionErrors: UpdateVoterVal | null = null;

	const detectClassification = () => {
		const matchedArray = classifications.filter(
			(classification) => classification.value === candidateObj?.classification
		);

		return matchedArray[0];
	};
</script>

<Button
	class="w-full transition-all hover:bg-mainred"
	on:click={() => (showCandidateDetailsDialog = true)}>Details</Button
>

<AlertDialog.Root bind:open={showCandidateDetailsDialog}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>{candidateObj?.candidate_fullname}</AlertDialog.Title>
			<AlertDialog.Description>You are viewing the candidate details.</AlertDialog.Description>

			<div class=" flex flex-col gap-[20px] pt-[20px]">
				<div class="">
					<img src={candidateObj?.candidate_photo_link} alt="poorConnection" class="rounded-lg" />
				</div>
				{#each formActionErrors?.classification ?? [] as errorMsg}
					<p class="text-left text-[14px] text-red-600" in:fade>{errorMsg}</p>
				{/each}

				<div class="grid max-h-[300px] w-full gap-[20px] overflow-auto text-left">
					<div class="grid w-full gap-[5px]">
						<h3 class="text-[14px] font-semibold xs:text-[16px] sm:text-[18px]">Classification:</h3>
						<p>{candidateObj?.classification}</p>
					</div>

					<div class="grid w-full gap-[5px]">
						<h3 class="text-[14px] font-semibold xs:text-[16px] sm:text-[18px]">Running:</h3>
						<p>{candidateObj?.candidate_position}</p>
					</div>

					<div class="grid w-full gap-[5px]">
						<h3 class="text-[14px] font-semibold xs:text-[16px] sm:text-[18px]">Motto:</h3>
						<p>
							{candidateObj?.candidate_motto}
						</p>
					</div>
				</div>
			</div>
		</AlertDialog.Header>
		<AlertDialog.Footer class="mt-[20px]">
			<AlertDialog.Cancel
				disabled={candidateDetailsLoader}
				on:click={() => (formActionErrors = null)}
				>Back
			</AlertDialog.Cancel>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
