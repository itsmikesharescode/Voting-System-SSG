<script lang="ts">
	import { enhance } from '$app/forms';
	import printIcon from '$lib/assets/print_icon.svg';
	import Button from '$lib/components/ui/button/button.svelte';
	import { getAdminState } from '$lib/stores';
	import type { RealTimeVotesType } from '$lib/types';
	import { tick } from 'svelte';

	const adminState = getAdminState();

	export let candidates: RealTimeVotesType[] | undefined;

	export let isPrinting = false;

	const handlePrint = async () => {
		isPrinting = true;

		await tick();
		print();

		setTimeout(() => {
			isPrinting = false;
		}, 2000);
	};
</script>

<Button
	on:click={handlePrint}
	type="submit"
	class="flex items-center gap-[10px] bg-mainred active:bg-clicked "
>
	<img src={printIcon} alt="poorConnection" />

	Print
</Button>

{#if isPrinting}
	<div class="absolute bottom-0 left-0 right-0 top-0 z-10 flex flex-col gap-[20px] bg-white">
		{#each candidates ?? [] as candidate}
			<p
				class="text-[16px] font-semibold xs:text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px]"
			>
				Running for {candidate.runningPosition}
			</p>

			<div class="grid grid-cols-2 gap-[20px]">
				{#each candidate.candidates as candi}
					<div class="flex gap-[20px] rounded-[20px] bg-subwhite p-[10px]">
						<img src={candi.candidatePhoto} alt="poorConnection" class="rounded-[10px]" />
						<div class="flex flex-col gap-[10px]">
							<div class="">
								<p class="font-semibold">Candidate Name:</p>
								<p>{candi.candidateName}</p>
							</div>

							<div class="">
								<p class="font-semibold">Total Votes:</p>
								<p>{candi.voteCount}</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/each}
	</div>
{/if}
