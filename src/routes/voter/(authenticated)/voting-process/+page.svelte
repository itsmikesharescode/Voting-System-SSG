<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import CandidateCard from '$lib/route-components/voter/voting-process/candidate-card.svelte';
	import { getUserState } from '$lib/stores';
	import type { DataModel, VotesCandidate } from '$lib/types';
	import type { LayoutServerData } from '../$types';

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

	//converted to strings then parse at server
	let votedCandidates = new Set<string>();

	const votedData = (e: CustomEvent<DataModel>) => {
		if (votedCandidates.has(JSON.stringify(e.detail)))
			votedCandidates.delete(JSON.stringify(e.detail));
		else votedCandidates.add(JSON.stringify(e.detail));
		testFactory();
	};

	//will continue alter sleepy!
	const testFactory = () => {
		const tempArray: any[] = [];
		votedCandidates.forEach((v) => {
			tempArray.push(JSON.parse(v));
		});
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

	<form
		method="post"
		action="?/submitVotes"
		enctype="multipart/form-data"
		use:enhance
		class="fixed bottom-0 right-0 m-[40px]"
	>
		<input name="setsOfvotes" type="hidden" value={votedCandidates} />

		<Button type="submit">Submit Votes</Button>
	</form>
</div>
