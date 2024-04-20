<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import CandidateCard from '$lib/route-components/voter/voting-process/candidate-card.svelte';
	import { getUserState } from '$lib/stores';
	import type { DataModel, ResultModel, VotesCandidate } from '$lib/types';
	import type { LayoutServerData } from '../$types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';

	export let data: LayoutServerData;

	const userState = getUserState();

	let candidates: VotesCandidate[] | undefined = undefined;

	$: {
		const customCandidateArray = () => {
			// Group candidates by candidate_position and calculate total vote count
			const newArray = data.candidates.data?.reduce(
				(acc, candidate) => {
					// Ensure candidate properties are defined and valid
					if (candidate) {
						// Find or create positionObj based on candidate.candidate_position
						let positionObj = acc.find(
							(item) => item.runningPosition === candidate.candidate_position
						);

						if (!positionObj) {
							positionObj = {
								runningPosition: candidate.candidate_position,
								maxVote: candidate.maximum_vote,
								candidates: []
							};
							acc.push(positionObj);
						}

						// Add candidate data to positionObj
						positionObj.candidates.push({
							id: candidate.id,
							candidateName: candidate.candidate_fullname,
							candidatePhoto: candidate.candidate_photo_link,
							candidateMotto: candidate.candidate_motto
						});
					}

					return acc;
				},
				[] as {
					runningPosition: string;
					maxVote: number;
					candidates: {
						id: number;
						candidateName: string;
						candidateMotto: string;
						candidatePhoto: string;
					}[];
				}[]
			);

			return newArray;
		};

		candidates = customCandidateArray();
	}

	//sets for read and write speeds
	const votedCandidates = new Set<DataModel>();
	//referencing avoiding mutating
	let reference: DataModel;

	let votedArrays: DataModel[] = [];

	const votedData = (e: CustomEvent<DataModel>) => {
		reference = e.detail;

		if (votedCandidates.has(reference)) votedCandidates.delete(reference);
		else votedCandidates.add(reference);

		votedArrays = Array.from(votedCandidates);
	};

	let submitVoteLoader = false;

	const submitVotesNews: SubmitFunction = () => {
		submitVoteLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg }
			} = result as ResultModel<{ msg: string }>;

			switch (status) {
				case 200:
					invalidateAll();
					toast.success('Submit Votes', { description: msg });
					submitVoteLoader = false;
					break;

				case 401:
					toast.error('Submit Votes', { description: msg });
					submitVoteLoader = false;
					break;
			}
			await update();
		};
	};
</script>

<div class="">
	<p
		class="mt-[40px] text-center text-[16px] font-semibold text-mainred xs:text-[18px] sm:text-[20px] md:text-[22px] lg:text-[28px]"
	>
		{$userState?.classification.toUpperCase()} ELECTION
	</p>

	<div class="mx-auto mt-[20px] flex flex-col gap-[20px] p-[22px]">
		{#each candidates ?? [] as candidateObj}
			<CandidateCard {candidateObj} on:votedCandidate={votedData} />
		{/each}
	</div>

	{#if candidates}
		{#if votedArrays.length >= candidates.length}
			<form
				method="post"
				action="?/submitVotes"
				enctype="multipart/form-data"
				use:enhance={submitVotesNews}
				class="fixed bottom-0 right-0 m-[40px]"
			>
				<input name="setsOfvotes" type="hidden" value={JSON.stringify(votedArrays)} />
				<input name="userId" type="hidden" value={$userState?.user_id} />
				<input name="userFullname" type="hidden" value={$userState?.user_fullname} />
				<input name="classification" type="hidden" value={$userState?.classification} />
				<Button
					type="submit"
					disabled={submitVoteLoader}
					class={submitVoteLoader ? 'cursor-not-allowed bg-clicked' : ''}
				>
					{#if submitVoteLoader}
						Submitting...
					{:else}
						Submit Votes
					{/if}
				</Button>
			</form>
		{/if}
	{/if}
</div>
