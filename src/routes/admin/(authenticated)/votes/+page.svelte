<script lang="ts">
	import VotesTableCard from '$lib/route-components/admin/votes/votes-table-card.svelte';

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

<div class="grid grid-cols-1 gap-[20px] p-[22px] lg:grid-cols-2">
	{#each Array(10) as sample}
		<div class="">
			<VotesTableCard position_name="President" candidateArray={mockData} />
		</div>
	{/each}
</div>
