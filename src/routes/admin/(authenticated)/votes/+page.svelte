<script lang="ts">
	import VotesTableCard from '$lib/route-components/admin/votes/votes-table-card.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import VotesPrint from '$lib/route-components/admin/votes/votes-print.svelte';

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
		<Tabs.Content value="highschool" class="mt-[30px] ">
			<div class="grid grid-cols-1 gap-[20px] lg:grid-cols-2">
				{#each Array(10) as sample}
					<div class="">
						<VotesTableCard position_name="President" candidateArray={mockData} />
					</div>
				{/each}
			</div>
		</Tabs.Content>
		<Tabs.Content value="elementary" class="mt-[30px]">Elementary Votes</Tabs.Content>
	</Tabs.Root>
</div>
