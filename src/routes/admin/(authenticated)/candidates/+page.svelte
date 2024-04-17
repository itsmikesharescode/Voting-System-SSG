<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import * as RadioGroup from '$lib/components/ui/radio-group/index';
	import { Label } from '$lib/components/ui/label/index';
	import CandidateTableCard from '$lib/route-components/admin/candidates/candidate-table-card.svelte';
	import CreateCandidate from '$lib/route-components/admin/candidates/create-candidate.svelte';
	import { getAdminState } from '$lib/stores';
	import type { LayoutServerData } from '../$types';

	export let data: LayoutServerData;

	const adminState = getAdminState();

	const handleSelections = (classification: 'highschool' | 'elementary') => {
		$adminState.candidates.activeTab = classification;

		const tempArray = data.created_candidates.data?.filter(
			(candidate) => candidate.classification === classification
		);

		if (tempArray) $adminState.candidates.createdCandidates = tempArray;
	};

	$: if (data.created_candidates.data) {
		handleSelections($adminState.candidates.activeTab);
	}
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
			<RadioGroup.Root bind:value={$adminState.allvoters.filterSelection} class="mt-[20px]">
				<div class="flex items-center space-x-2">
					<RadioGroup.Item value="voted" id="r1" />
					<Label for="r1">All</Label>
				</div>
				{#each data.created_positions.data ?? [] as position}
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value="voted" id="r1" />
						<Label for="r1">{position.position_name}</Label>
					</div>
				{/each}
				<RadioGroup.Input name="spacing" />
			</RadioGroup.Root>
		</div>

		<CandidateTableCard />
	</Tabs.Root>
</div>
