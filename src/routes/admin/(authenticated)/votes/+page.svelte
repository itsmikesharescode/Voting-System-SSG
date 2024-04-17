<script lang="ts">
	import VotesTableCard from '$lib/route-components/admin/votes/votes-table-card.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import VotesPrint from '$lib/route-components/admin/votes/votes-print.svelte';
	import type { LayoutServerData } from '../$types';

	export let data: LayoutServerData;

	let candidates = data.created_candidates.data;

	const customCandidateArray = () => {
		// Group candidates by candidate_position and calculate total vote count
		const newArray = candidates?.reduce(
			(acc, candidate) => {
				// Ensure candidate properties are defined and valid
				if (
					candidate &&
					candidate.candidate_position &&
					candidate.candidate_fullname &&
					candidate.vote_count !== undefined
				) {
					// Find or create positionObj based on candidate.candidate_position
					let positionObj = acc.find(
						(item) => item.runningPosition === candidate.candidate_position
					);

					if (!positionObj) {
						positionObj = {
							runningPosition: candidate.candidate_position,
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
				candidates: { candidateName: string; voteCount: number; candidatePhoto: string }[];
			}[]
		);

		return newArray;
	};
</script>

<div class="mt-[30px] p-[22px]">
	<Tabs.Root value="highschool" class="w-full">
		<div class="flex flex-wrap justify-between gap-[10px]">
			<div class="">
				<Tabs.List class="">
					<Tabs.Trigger class="w-full" value="highschool">High School</Tabs.Trigger>
					<Tabs.Trigger class="w-full" value="elementary">Elementary</Tabs.Trigger>
				</Tabs.List>
			</div>

			<div class="">
				<VotesPrint />
			</div>
		</div>

		<div class="mt-[20px] grid gap-[20px] lg:grid-cols-2">
			{#each customCandidateArray() ?? [] as candidateObj}
				<div class="">
					<VotesTableCard
						position_name={candidateObj.runningPosition}
						candidateArray={candidateObj.candidates}
					/>
				</div>
			{/each}
		</div>
	</Tabs.Root>
</div>
