<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import CandidateTableCard from '$lib/route-components/admin/candidates/candidate-table-card.svelte';
	import CreateCandidate from '$lib/route-components/admin/candidates/create-candidate.svelte';
	import { getAdminState } from '$lib/stores';
	import type { LayoutServerData } from '../$types';

	export let data: LayoutServerData;

	const adminState = getAdminState();

	const handleSelections = (classification: 'highschool' | 'elementary') => {
		/* $adminState.candidates.activeTab = classification;

		const tempArray = data.created_positions.data?.filter(
			(position) => position.classification === $adminState.candidates.activeTab
		);

		if (tempArray) $adminState.candidates.availablePositions = tempArray; */
	};

	$: if (data.created_candidates.data) {
		$adminState.candidates.createdCandidates = data.created_candidates.data;
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
		<CandidateTableCard />
	</Tabs.Root>
</div>
