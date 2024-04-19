<script lang="ts">
	import CandidateCard from '$lib/route-components/voter/voting-process/candidate-card.svelte';
	import { getUserState } from '$lib/stores';

	const userState = getUserState();
</script>

<div class="">
	<p
		class="mt-[40px] text-center text-[16px] font-semibold text-mainred xs:text-[18px] sm:text-[20px] md:text-[22px] lg:text-[28px]"
	>
		{$userState?.classification.toUpperCase()} ELECTION
	</p>

	<div class="mx-auto mt-[20px] flex flex-col gap-[20px] p-[22px] md:max-w-[800px]">
		{#each Array(10) as sample}
			<CandidateCard />
		{/each}
	</div>
</div>
