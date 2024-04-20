<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import VotesTableCard from '$lib/route-components/admin/votes/votes-table-card.svelte';
	import { getUserState, supabaseStore } from '$lib/stores';
	import type { CandidatesDB, RealTimeVotesType, VotesCandidate } from '$lib/types';
	import { onMount } from 'svelte';
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

	let candidates: RealTimeVotesType[] | undefined = undefined;

	const getLatestVotes = async () => {
		const { data, error } = await $supabaseStore
			.from('created_candidates_tb')
			.select('*')
			.order('vote_count', { ascending: false });

		const tempArray = data?.filter(
			(candidate) => candidate.classification === $userState?.classification
		);

		candidates = customCandidateArray(tempArray);
	};

	const channels = $supabaseStore
		.channel('custom-all-channel')
		.on(
			'postgres_changes',
			{ event: '*', schema: 'public', table: 'created_candidates_tb' },
			async (payload) => {
				await getLatestVotes();
			}
		)
		.subscribe();

	onMount(async () => await getLatestVotes());
</script>

<div class="m-[20px] md:m-[40px]" in:fade>
	<Button on:click={() => (showRealTimeResult = false)}>Back</Button>
	<h2
		class="mt-[20px] text-[22px] font-semibold text-mainred xs:text-[24px] sm:text-[26px] lg:text-[28px]"
	>
		Viewing Realtime Results
	</h2>

	<div class="mt-[20px] grid gap-[20px] lg:grid-cols-2">
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
</div>
