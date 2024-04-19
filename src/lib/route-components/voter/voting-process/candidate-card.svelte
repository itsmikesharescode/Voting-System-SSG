<script lang="ts">
	import * as RadioGroup from '$lib/components/ui/radio-group/index';
	import { Label } from '$lib/components/ui/label/index';
	import { Button } from '$lib/components/ui/button';
	import * as Avatar from '$lib/components/ui/avatar/index.js';

	interface VotesCandidate {
		runningPosition: string;
		maxVote: number;
		candidates: {
			candidateName: string;
			candidateMotto: string;
			candidatePhoto: string;
		}[];
	}

	export let candidateObj: VotesCandidate;

	let value = '';
</script>

<div class="rounded-[20px] bg-subwhite p-[40px]">
	<p class="text-[16px] font-semibold text-mainred xs:text-[18px] sm:text-[20px] lg:text-[22px]">
		CANDIDATES FOR {candidateObj.runningPosition.toUpperCase()}
	</p>

	<p class="text-[14px] font-semibold text-mainred">
		YOU MAY SELECT {candidateObj.maxVote} CANDIDATE
	</p>

	<div class="mt-[20px] max-h-[400px] overflow-auto">
		{#each candidateObj.candidates as candidate, index}
			<RadioGroup.Root bind:value class="flex items-center gap-[20px] p-[20px]">
				<div class="flex items-center space-x-2">
					<RadioGroup.Item value={`${index}`} />
					<Button class="bg-mainred active:bg-clicked">PLATFORM</Button>
				</div>
				<Avatar.Root class="h-[100px] w-[100px]">
					<Avatar.Image src={candidate.candidatePhoto} alt="@shadcn" />
					<Avatar.Fallback>{candidate.candidateName[0].toUpperCase()}</Avatar.Fallback>
				</Avatar.Root>

				<p class="text-[14px] font-semibold text-mainred xs:text-[16px] sm:text-[18px]">
					{candidate.candidateName}
				</p>
			</RadioGroup.Root>
		{/each}
	</div>
</div>
