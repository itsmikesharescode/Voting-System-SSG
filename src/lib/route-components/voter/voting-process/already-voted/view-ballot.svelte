<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { formatDate } from '$lib/helpers';
	import type { VotedCandidatesDB } from '$lib/types';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import * as Avatar from '$lib/components/ui/avatar/index';

	export let votedCandidates: VotedCandidatesDB[] | null;

	export let showBallot = false;
</script>

<div class="m-[20px] md:m-[40px]">
	<Button on:click={() => (showBallot = false)}>Back</Button>

	<h2
		class="mt-[20px] text-[22px] font-semibold text-mainred xs:text-[24px] sm:text-[26px] lg:text-[28px]"
	>
		Viewing Ballot
	</h2>

	<div class="mt-[10px] text-[14px] font-semibold text-white xs:text-[16px] md:text-[18px]">
		<div
			class="hidden w-full gap-[20px] overflow-auto bg-mainred p-[10px] lg:grid lg:grid-cols-[1fr,300px,300px]"
		>
			<div class="grid overflow-auto">
				<p class="">Candidate Full Name</p>
			</div>

			<div class="grid overflow-auto">
				<p class="">Position</p>
			</div>

			<div class="grid overflow-auto">
				<p class="">Voted Date</p>
			</div>
		</div>

		<div class="  flex flex-col gap-[10px] text-mainred lg:gap-[5px]">
			{#each votedCandidates ?? [] as candidateObj, index (candidateObj.id)}
				<div
					animate:flip={{ duration: 350 }}
					in:fade
					class="grid items-center gap-[20px] border-b-[1px] bg-subwhite p-[10px] lg:grid lg:grid-cols-[1fr,300px,300px]"
				>
					<div class="grid overflow-auto">
						<div class="flex items-center gap-[10px]">
							<Avatar.Root>
								<Avatar.Image src={candidateObj.candidate_photo} alt="@shadcn" />
								<Avatar.Fallback
									>{candidateObj.candidate_name[0].toLocaleUpperCase()}</Avatar.Fallback
								>
							</Avatar.Root>
							<p>{candidateObj.candidate_name}</p>
						</div>
					</div>

					<div class="grid overflow-auto">
						<p>{candidateObj.position}</p>
					</div>

					<div class="grid overflow-auto">
						<p>{formatDate(candidateObj.created_at)}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
