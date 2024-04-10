<script lang="ts">
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
	<div class=" mt-[10px] text-[14px] font-semibold text-white xs:text-[16px] md:text-[18px]">
		<div class="flex w-full justify-between border-b-[1px] border-b-subwhite bg-mainred p-[10px]">
			<div class="">
				<p>Candidate Name</p>
			</div>

			<div class="k truncate md:w-[15%]">
				<p>Total Votes</p>
			</div>
		</div>

		<div class="max-h-[200px] overflow-auto">
			{#each candidateArray as candidateObj}
				<div
					class="flex w-full justify-between border-b-[1px] border-mainred bg-subwhite px-[10px] py-[5px] text-mainred"
				>
					<div class="">
						<p>{candidateObj.candidate_name}</p>
					</div>

					<div class="k w-[8%]">
						<p>{candidateObj.total_votes}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}
