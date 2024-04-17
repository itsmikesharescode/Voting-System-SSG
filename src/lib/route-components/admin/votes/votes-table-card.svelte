<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Badge } from '$lib/components/ui/badge/index';

	export let position_name: string;
	export let maxVote: number;
	export let candidateArray: { candidateName: string; voteCount: number; candidatePhoto: string }[];
</script>

{#if candidateArray}
	<div class="flex flex-wrap justify-between gap-[10px]">
		<p
			class="rounded-full bg-mainred px-[20px] text-[16px] font-semibold text-white xs:text-[18px] md:text-[20px] lg:text-[22px]"
		>
			Running {position_name}
		</p>

		<p
			class="rounded-full bg-mainred px-[20px] text-[16px] font-semibold text-white xs:text-[18px] md:text-[20px] lg:text-[22px]"
		>
			Max Vote {maxVote}
		</p>
	</div>

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
			{#each candidateArray ?? [] as candidateObj}
				<div
					in:fade
					class="grid items-center gap-[20px] border-b-[1px] bg-subwhite p-[10px] md:grid md:grid-cols-[1fr,190px]"
				>
					<div class="grid overflow-auto">
						<p class="md:hidden">Candidate Name:</p>
						<div class="flex items-center gap-[10px]">
							<img
								src={candidateObj.candidatePhoto}
								alt="pootConnection"
								class="w-[30px] rounded-full"
							/>
							<p>{candidateObj.candidateName}</p>
						</div>
					</div>

					<div class="grid overflow-auto md:items-center md:justify-center">
						<p class="md:hidden">Total Votes:</p>
						<p>{candidateObj.voteCount}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}
