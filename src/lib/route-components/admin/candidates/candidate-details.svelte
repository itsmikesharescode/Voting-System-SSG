<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { CandidatesDB } from '$lib/types';
	import * as Drawer from '$lib/components/ui/drawer';

	import { fade } from 'svelte/transition';

	export let candidateObj: CandidatesDB | null;

	const classifications = [
		{ value: 'highschool', label: 'High School' },
		{ value: 'elementary', label: 'Elementary' }
	];

	let showCandidateDetailsDialog = false;

	interface UpdateVoterVal {
		classification: string[];
		positionName: string[];
	}

	let candidateDetailsLoader = false;
	let formActionErrors: UpdateVoterVal | null = null;

	let nativeWidthValue = 0;
</script>

<svelte:window bind:innerWidth={nativeWidthValue} />

<Button
	class="w-full transition-all hover:bg-mainred"
	on:click={() => (showCandidateDetailsDialog = true)}>Details</Button
>

{#if nativeWidthValue > 1024}
	<!--Desktop View-->
	<AlertDialog.Root bind:open={showCandidateDetailsDialog}>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>{candidateObj?.candidate_fullname}</AlertDialog.Title>
				<AlertDialog.Description>You are viewing the candidate details.</AlertDialog.Description>

				<div class=" flex flex-col gap-[20px] pt-[20px]">
					<div class="">
						<img src={candidateObj?.candidate_photo_link} alt="poorConnection" class="rounded-lg" />
					</div>

					<div class="grid max-h-[300px] w-full gap-[20px] overflow-auto text-left">
						<div class="grid w-full gap-[5px]">
							<h3 class="text-[14px] font-semibold xs:text-[16px] sm:text-[18px]">
								Classification:
							</h3>
							<p>{candidateObj?.classification}</p>
						</div>

						<div class="grid w-full gap-[5px]">
							<h3 class="text-[14px] font-semibold xs:text-[16px] sm:text-[18px]">Running:</h3>
							<p>{candidateObj?.candidate_position}</p>
						</div>

						<div class="grid w-full gap-[5px]">
							<h3 class="text-[14px] font-semibold xs:text-[16px] sm:text-[18px]">Motto:</h3>
							<p>
								{candidateObj?.candidate_motto}
							</p>
						</div>
					</div>
				</div>
			</AlertDialog.Header>
			<AlertDialog.Footer class="mt-[20px]">
				<AlertDialog.Cancel
					disabled={candidateDetailsLoader}
					on:click={() => (formActionErrors = null)}
					>Back
				</AlertDialog.Cancel>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{:else}
	<!--Mobile View-->
	<Drawer.Root bind:open={showCandidateDetailsDialog}>
		<Drawer.Content>
			<Drawer.Header>
				<Drawer.Title>{candidateObj?.candidate_fullname}</Drawer.Title>
				<Drawer.Description>You are viewing the candidate details.</Drawer.Description>
			</Drawer.Header>

			<div class=" flex h-[400px] flex-col gap-[20px] overflow-auto p-[20px]">
				<div class="">
					<img src={candidateObj?.candidate_photo_link} alt="poorConnection" class="rounded-lg" />
				</div>

				<div class="grid max-h-[300px] w-full gap-[20px] overflow-auto text-left">
					<div class="grid w-full gap-[5px]">
						<h3 class="text-[14px] font-semibold xs:text-[16px] sm:text-[18px]">Classification:</h3>
						<p>{candidateObj?.classification}</p>
					</div>

					<div class="grid w-full gap-[5px]">
						<h3 class="text-[14px] font-semibold xs:text-[16px] sm:text-[18px]">Running:</h3>
						<p>{candidateObj?.candidate_position}</p>
					</div>

					<div class="grid w-full gap-[5px]">
						<h3 class="text-[14px] font-semibold xs:text-[16px] sm:text-[18px]">Motto:</h3>
						<p>
							{candidateObj?.candidate_motto}
						</p>
					</div>
				</div>
			</div>

			<Drawer.Footer>
				<Drawer.Close class="h-10 rounded-sm bg-subwhite px-4 py-2 text-[14px] font-semibold "
					>Back
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
