<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import * as RadioGroup from '$lib/components/ui/radio-group/index';
	import { Label } from '$lib/components/ui/label/index';
	import CandidateTableCard from '$lib/route-components/admin/candidates/candidate-table-card.svelte';
	import CreateCandidate from '$lib/route-components/admin/candidates/create-candidate.svelte';
	import { getAdminState } from '$lib/stores';
	import type { LayoutServerData } from '../$types';
	import { onDestroy } from 'svelte';

	const adminState = getAdminState();

	export let data: LayoutServerData;

	const positionsArray = data.created_positions.data;

	$: if (data.created_candidates.data) {
		handleSelections($adminState.candidates.activeTab);
	}

	const handleSelections = (classification: 'highschool' | 'elementary') => {
		$adminState.candidates.activeTab = classification;

		const posTempArray = positionsArray?.filter(
			(position) => position.classification === classification
		);

		if (posTempArray) {
			$adminState.candidates.positions = posTempArray.map((position) => position.position_name);
			$adminState.candidates.positions.push('All');
		}

		if ($adminState.candidates.filterSelection !== 'All') {
			const tempArray = data.created_candidates.data?.filter(
				(candidate) =>
					candidate.classification === classification &&
					candidate.candidate_position === $adminState.candidates.filterSelection
			);

			if (tempArray) $adminState.candidates.createdCandidates = tempArray;
		} else {
			const tempArray = data.created_candidates.data?.filter(
				(candidate) => candidate.classification === classification
			);

			if (tempArray) $adminState.candidates.createdCandidates = tempArray;
		}
	};
</script>

<div class="mt-[30px] p-[22px]">
	<Tabs.Root bind:value={$adminState.candidates.activeTab} class="w-full">
		<div class="flex w-full flex-wrap justify-between gap-[10px]">
			<div class="">
				<Tabs.List class="">
					<Tabs.Trigger
						class="w-full"
						value="highschool"
						on:click={() => handleSelections('highschool')}>High School</Tabs.Trigger
					>
					<Tabs.Trigger
						class="w-full"
						value="elementary"
						on:click={() => handleSelections('elementary')}>Elementary</Tabs.Trigger
					>
				</Tabs.List>
			</div>

			<div class="flex items-center gap-[10px]">
				<div class="">
					<CreateCandidate positionList={data.created_positions.data} />
				</div>
			</div>
		</div>

		<div class="mt-[10px]">
			<!---Filters-->
			<RadioGroup.Root bind:value={$adminState.candidates.filterSelection} class="mt-[20px]">
				{#each $adminState.candidates.positions ?? [] as position}
					{#key position}
						<div class="flex items-center space-x-2">
							<RadioGroup.Item value={position} id={position} />
							<Label for={position}>{position}</Label>
						</div>
					{/key}
				{/each}

				<RadioGroup.Input />
			</RadioGroup.Root>
		</div>

		<CandidateTableCard positionList={data.created_positions.data} />
	</Tabs.Root>
</div>
