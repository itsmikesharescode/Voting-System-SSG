<script lang="ts">
	import CandidateCard from '$lib/route-components/voter/voting-process/candidate-card.svelte';
	import { getUserState } from '$lib/stores';
	import type { LayoutServerData } from '../$types';

	export let data: LayoutServerData;

	const userState = getUserState();

	interface VotesCandidate {
		runningPosition: string;
		maxVote: number;
		candidates: {
			candidateName: string;
			candidateMotto: string;
			candidatePhoto: string;
		}[];
	}

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
					candidates: { candidateName: string; candidateMotto: string; candidatePhoto: string }[];
				}[]
			);

			return newArray;
		};

		candidates = customCandidateArray();

		console.log(candidates);
	}
</script>

<div class="">
	<p
		class="mt-[40px] text-center text-[16px] font-semibold text-mainred xs:text-[18px] sm:text-[20px] md:text-[22px] lg:text-[28px]"
	>
		{$userState?.classification.toUpperCase()} ELECTION
	</p>

	<div class="mx-auto mt-[20px] flex flex-col gap-[20px] p-[22px] md:max-w-[800px]">
		{#each candidates ?? [] as candidateObj}
			<CandidateCard {candidateObj} />
		{/each}
	</div>
</div>
