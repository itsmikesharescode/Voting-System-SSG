<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import VotesTableCard from '$lib/route-components/admin/votes/votes-table-card.svelte';
	import { getUserState, supabaseStore } from '$lib/stores';
	import type { CandidatesDB, VotesCandidate } from '$lib/types';
	import { fade } from 'svelte/transition';

	const userState = getUserState();

	export let showRealTimeResult = false;

	//data structure for realtime vote count
	const customCandidateArray = (tempArray: CandidatesDB[] | undefined) => {
		// Group candidates by candidate_position and calculate total vote count
		const newArray = tempArray?.reduce(
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
						voteCount: candidate.vote_count
					});
				}

				return acc;
			},
			[] as {
				runningPosition: string;
				maxVote: number;
				candidates: { candidateName: string; voteCount: number; candidatePhoto: string }[];
			}[]
		);

		return newArray;
	};

	let candidates: VotesCandidate[] | undefined = undefined;

	const getLatestVotes = async () => {
		const { data, error } = await $supabaseStore
			.from('created_candidates_tb')
			.select('*')
			.order('vote_count', { ascending: true });

		const tempArray = data?.filter(
			(candidate) => candidate.classification === $userState?.classification
		);

		const candidates = customCandidateArray(tempArray);
	};

	getLatestVotes();
</script>

<div class="m-[20px] md:m-[40px]" in:fade>
	<Button on:click={() => (showRealTimeResult = false)}>Back</Button>
	real time vote count here

	{#each candidates ?? [] as candidateObj}
		<div class="">
			<VotesTableCard
				position_name={candidateObj.runningPosition}
				candidateArray={candidateObj.candidates}
				maxVote={candidateObj.maxVote}
			/>
		</div>
	{/each}
</div>
