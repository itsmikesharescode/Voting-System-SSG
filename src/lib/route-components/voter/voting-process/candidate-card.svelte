<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	type Candidates = {
		id: number;
		candidateName: string;
		candidateMotto: string;
		candidatePhoto: string;
	};

	interface VotesCandidate {
		runningPosition: string;
		maxVote: number;
		candidates: Candidates[];
	}

	export let candidateObj: VotesCandidate;

	interface DataModel {
		position: string;
		candidate: Candidates;
	}

	export let selected: DataModel[] = [];

	$: if (selected.length >= candidateObj.maxVote) {
		dispatch('votedCandidate', selected);
	}
</script>

<div class="rounded-[20px] bg-subwhite p-[40px]">
	<p class="text-[16px] font-semibold text-mainred xs:text-[18px] sm:text-[20px] lg:text-[22px]">
		CANDIDATES FOR {candidateObj.runningPosition.toUpperCase()}
	</p>

	<p class="text-[14px] font-semibold text-mainred">
		YOU MAY SELECT {candidateObj.maxVote} CANDIDATE
	</p>

	{#if selected.length >= candidateObj.maxVote}
		<div class="flex justify-end">
			<Button
				on:click={() => {
					dispatch('votedCandidate', selected);
					selected = [];
				}}>Reset Selection</Button
			>
		</div>
	{/if}

	<div class="mt-[20px] max-h-[400px] overflow-auto">
		{#each candidateObj.candidates as candidate, index}
			<div class="flex items-center gap-[20px] p-[20px]">
				<div class="flex items-center space-x-2">
					<label class="container">
						<input
							name="mike"
							type="checkbox"
							bind:group={selected}
							value={{ position: candidateObj.runningPosition, candidate }}
							disabled={selected.length >= candidateObj.maxVote &&
								!selected.includes({ position: candidateObj.runningPosition, candidate })}
						/>
						<span class="checkmark"></span>
					</label>

					<Button class="bg-mainred active:bg-clicked">PLATFORM</Button>
				</div>
				<Avatar.Root class="h-[100px] w-[100px]">
					<Avatar.Image src={candidate.candidatePhoto} alt="@shadcn" />
					<Avatar.Fallback>{candidate.candidateName[0].toUpperCase()}</Avatar.Fallback>
				</Avatar.Root>

				<p class="text-[14px] font-semibold text-mainred xs:text-[16px] sm:text-[18px]">
					{candidate.candidateName}
				</p>
			</div>
		{/each}
	</div>
</div>

<style>
	.container {
		display: block;
		position: relative;
		padding-left: 0px;
		margin-bottom: 12px;
		cursor: pointer;
		font-size: 22px;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	/* Hide the browser's default checkbox */
	.container input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}

	/* Create a custom checkbox */
	.checkmark {
		border-radius: 100%;
		position: absolute;
		top: 0;
		left: 0;
		height: 25px;
		width: 25px;
		background-color: #eee;
	}

	/* On mouse-over, add a grey background color */
	.container:hover input ~ .checkmark {
		background-color: #ccc;
	}

	/* When the checkbox is checked, add a blue background */
	.container input:checked ~ .checkmark {
		background-color: #2196f3;
		border-radius: 100%;
	}

	/* Create the checkmark/indicator (hidden when not checked) */
	.checkmark:after {
		content: '';
		position: absolute;
		display: none;
	}

	/* Show the checkmark when checked */
	.container input:checked ~ .checkmark:after {
		display: block;
	}

	/* Style the checkmark/indicator */
	.container .checkmark:after {
		left: 9px;
		top: 5px;
		width: 5px;
		height: 10px;
		border: solid white;
		border-width: 0 3px 3px 0;
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
	}
</style>
