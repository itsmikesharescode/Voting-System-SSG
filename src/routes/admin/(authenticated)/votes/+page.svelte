<script lang="ts">
	import VotesTableCard from '$lib/route-components/admin/votes/votes-table-card.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import VotesPrint from '$lib/route-components/admin/votes/votes-print.svelte';
	import type { LayoutServerData } from '../$types';

	export let data: LayoutServerData;

	let candidates = data.created_candidates.data;

	const mockData = [
		{
			candidate_name: 'Mike John',
			total_votes: '20'
		},

		{
			candidate_name: 'Peter Panic',
			total_votes: '20'
		},

		{
			candidate_name: 'Ruby Tank',
			total_votes: '20'
		}
	];

	const runningCandidates = data.created_candidates.data?.map((candidate) => ({}));
</script>

<div class="mt-[30px] p-[22px]">
	<Tabs.Root value="highschool" class="w-full">
		<div class="flex flex-wrap justify-between gap-[10px]">
			<div class="">
				<Tabs.List class="">
					<Tabs.Trigger class="w-full" value="highschool">High School</Tabs.Trigger>
					<Tabs.Trigger class="w-full" value="elementary">Elementary</Tabs.Trigger>
				</Tabs.List>
			</div>

			<div class="">
				<VotesPrint />
			</div>
		</div>

		<div class="mt-[20px] grid gap-[20px] lg:grid-cols-2">
			{#each candidates ?? [] as candidateObj}
				<div class="">
					<VotesTableCard position_name="President" candidateArray={mockData} />
				</div>
			{/each}
		</div>
	</Tabs.Root>
</div>
