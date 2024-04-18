<script lang="ts">
	import { formatDate } from '$lib/helpers';
	import { getAdminState } from '$lib/stores';
	import { flip } from 'svelte/animate';
	import * as Avatar from '$lib/components/ui/avatar/index';

	import { fade } from 'svelte/transition';
	import CandidateDetails from './candidate-details.svelte';
	import CandidateUpdate from './candidate-update.svelte';
	import CandidateDelete from './candidate-delete.svelte';
	import type { PositionsDB } from '$lib/types';

	export let positionList: PositionsDB[] | null;

	const adminState = getAdminState();
</script>

<div class="mt-[10px] text-[14px] font-semibold text-white xs:text-[16px] md:text-[18px]">
	<div
		class="hidden w-full gap-[20px] overflow-auto bg-mainred p-[10px] lg:grid lg:grid-cols-[1fr,300px,300px,300px]"
	>
		<div class="grid overflow-auto">
			<p class="">Candidate Full Name</p>
		</div>

		<div class="grid overflow-auto">
			<p class="">Position</p>
		</div>

		<div class="grid overflow-auto">
			<p class="">Date Created</p>
		</div>

		<div class="grid overflow-auto">
			<p class="">Options</p>
		</div>
	</div>

	<div class="  flex flex-col gap-[10px] text-mainred lg:gap-[5px]">
		{#each $adminState.candidates.createdCandidates ?? [] as candidateObj, index (candidateObj.id)}
			<div
				animate:flip={{ duration: 350 }}
				in:fade
				class="grid items-center gap-[20px] border-b-[1px] bg-subwhite p-[10px] lg:grid lg:grid-cols-[1fr,300px,300px,300px]"
			>
				<div class="grid overflow-auto">
					<div class="flex items-center gap-[10px]">
						<Avatar.Root>
							<Avatar.Image src={candidateObj.candidate_photo_link} alt="@shadcn" />
							<Avatar.Fallback>P</Avatar.Fallback>
						</Avatar.Root>
						<p>{candidateObj.candidate_fullname}</p>
					</div>
				</div>

				<div class="grid overflow-auto">
					<p>{candidateObj.candidate_position}</p>
				</div>

				<div class="grid overflow-auto">
					<p>{formatDate(candidateObj.created_at)}</p>
				</div>

				<div class="w-full">
					<div class="flex w-full items-center gap-[10px]">
						<CandidateDetails {candidateObj} />
						<!-- <CandidateUpdate {positionList} {candidateObj} /> -->
						<CandidateDelete {candidateObj} />
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
