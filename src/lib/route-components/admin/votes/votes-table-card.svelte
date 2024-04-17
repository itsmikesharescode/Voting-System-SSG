<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

	type CandidateObj = {
		candidate_name: string;
		total_votes: string;
	};

	export let position_name: string;
	export let candidateArray: CandidateObj[];
</script>

{#if candidateArray}
	<p class="text-[16px] font-semibold text-mainred xs:text-[18px] md:text-[20px] lg:text-[22px]">
		Running {position_name}
	</p>

	<div class="mt-[10px] text-[14px] font-semibold text-white xs:text-[16px] md:text-[18px]">
		<div
			class="hidden w-full gap-[20px] overflow-auto bg-mainred p-[10px] md:grid md:grid-cols-[1fr,190px]"
		>
			<div class="grid overflow-auto">
				<p class="">Candidate Name</p>
			</div>
			<div class="grid overflow-auto md:items-center md:justify-center">
				<p class="">Total Votes</p>
			</div>
		</div>

		<div
			class="  flex max-h-[400px] flex-col gap-[10px] overflow-auto scroll-smooth text-mainred md:gap-[5px]"
		>
			{#each Array(10) ?? [] as positionObj}
				<div
					in:fade
					class="grid items-center gap-[20px] border-b-[1px] bg-subwhite p-[10px] md:grid md:grid-cols-[1fr,190px]"
				>
					<div class="grid overflow-auto">
						<p class="md:hidden">Candidate Name:</p>
						<p>Peter Cayatano</p>
					</div>

					<div class="grid overflow-auto md:items-center md:justify-center">
						<p class="md:hidden">Total Votes:</p>
						<p>2</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}
