<script lang="ts">
	import VotesTableCard from '$lib/route-components/admin/votes/votes-table-card.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import VotesPrint from '$lib/route-components/admin/votes/votes-print.svelte';
	import type { LayoutServerData } from '../$types';
	import { getAdminState, supabaseStore } from '$lib/stores';
	import type { CandidatesDB, RealTimeVotesType } from '$lib/types';
	import { onMount } from 'svelte';

	const adminState = getAdminState();

	let candidates: RealTimeVotesType[] | undefined = undefined;

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

	$: $adminState.votes.activeTab ? getLatestVotes() : '';

	const getLatestVotes = async () => {
		const { data, error } = await $supabaseStore
			.from('created_candidates_tb')
			.select('*')
			.order('vote_count', { ascending: false });

		const tempArray = data?.filter(
			(candidate) => candidate.classification === $adminState.votes.activeTab
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

	let isPrinting = false;
</script>

<div class="mt-[30px] p-[22px]">
	<Tabs.Root bind:value={$adminState.votes.activeTab} class="w-full">
		<div class="flex flex-wrap justify-between gap-[10px]">
			<div class="">
				<Tabs.List class="">
					<Tabs.Trigger class="w-full" value="highschool">High School</Tabs.Trigger>
					<Tabs.Trigger class="w-full" value="elementary">Elementary</Tabs.Trigger>
				</Tabs.List>
			</div>

			<div class="">
				<VotesPrint {candidates} bind:isPrinting />
			</div>
		</div>

		<div class="mt-[20px] grid gap-[20px] lg:grid-cols-2 {isPrinting ? 'hidden' : ''}">
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
	</Tabs.Root>
</div>
