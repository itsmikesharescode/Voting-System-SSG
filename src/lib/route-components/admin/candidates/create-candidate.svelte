<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select/index';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ResultModel } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';
	import * as Drawer from '$lib/components/ui/drawer';
	import { Textarea } from '$lib/components/ui/textarea';
	import candidate_upload_icon from '$lib/assets/candidate_upload_icon.svg';

	const classifications = [
		{ value: 'highschool', label: 'High School' },
		{ value: 'elementary', label: 'Elementary' }
	];

	interface CreateCandidateVal {
		candidatePhoto: string[];
		position: string[];
		fullName: string[];
		motto: string[];
	}

	let showCreateCandidate = false;
	let createCandidateLoader = false;
	let formActionErrors: CreateCandidateVal | null = null;

	const createCandidateActionNews: SubmitFunction = () => {
		createCandidateLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<{ msg: string; errors: CreateCandidateVal }>;

			switch (status) {
				case 200:
					invalidateAll();
					formActionErrors = null;
					createCandidateLoader = false;
					toast.success('Create Voter', { description: msg });
					showCreateCandidate = false;
					break;

				case 400:
					formActionErrors = errors;
					createCandidateLoader = false;
					break;

				case 401:
					formActionErrors = null;
					toast.error('Create Voter', { description: msg });
					createCandidateLoader = false;
					break;
			}
			await update();
		};
	};

	let nativeWidthValue = 0;
</script>

<svelte:window bind:innerWidth={nativeWidthValue} />

<Button
	class="rounded-[10px] bg-mainred text-[14px] font-semibold"
	on:click={() => (showCreateCandidate = true)}>Create Candidate</Button
>

{#if nativeWidthValue > 768}
	<!--Forms for Desktop-->
	<AlertDialog.Root bind:open={showCreateCandidate}>
		<AlertDialog.Content>
			<form
				method="post"
				action="APIS?/createCandidateAction"
				enctype="multipart/form-data"
				use:enhance={createCandidateActionNews}
			>
				<AlertDialog.Header>
					<AlertDialog.Title>Create Candidate</AlertDialog.Title>
					<AlertDialog.Description>
						This will create a candidate that will rely on opened positions.
					</AlertDialog.Description>

					<div class=" flex flex-col gap-[20px] pt-[20px]">
						<div class="grid max-w-fit gap-1.5">
							<Label class="text-left " for="fullName">Candidate Photo</Label>
							<label
								title="Upload Candidate Photo"
								class="cursor-pointer transition-all active:scale-95"
							>
								<div class="">
									<img src={candidate_upload_icon} alt="error-upload" />
									<input name="candidatePhoto" type="file" class="hidden" />
								</div>
							</label>
							{#each formActionErrors?.candidatePhoto ?? [] as errorMsg}
								<p class="text-left text-[14px] text-red-600">{errorMsg}</p>
							{/each}
						</div>

						<div class="grid w-full gap-1.5">
							<Select.Root>
								<Select.Trigger class="w-full " disabled={createCandidateLoader}>
									<Select.Value placeholder="Available Positions" />
								</Select.Trigger>
								<Select.Content class="mt-[10px]">
									<Select.Group>
										<Select.Label class="text-left">Available Positions</Select.Label>
										{#each classifications as classification}
											<Select.Item value={classification.value} label={classification.label}
												>{classification.label}</Select.Item
											>
										{/each}
									</Select.Group>
								</Select.Content>
								<Select.Input name="position" />
							</Select.Root>
							{#each formActionErrors?.position ?? [] as errorMsg}
								<p class="text-left text-[14px] text-red-600">{errorMsg}</p>
							{/each}
						</div>

						<div class="grid w-full gap-1.5">
							<Label class="text-left " for="fullName">Candidate Full Name</Label>
							<Input
								disabled={createCandidateLoader}
								name="fullName"
								class="text-[14px] "
								type="text"
								id="fullName"
								placeholder="Enter candidate fullname"
							/>
							{#each formActionErrors?.fullName ?? [] as errorMsg}
								<p class="text-left text-[14px] text-red-600">{errorMsg}</p>
							{/each}
						</div>

						<div class="grid w-full gap-1.5">
							<Label class="text-left  " for="motto">Candidate Mottos</Label>
							<Textarea
								disabled={createCandidateLoader}
								name="motto"
								class="text-[14px] "
								id="motto"
								placeholder="Enter candidate motto"
							/>
							{#each formActionErrors?.motto ?? [] as errorMsg}
								<p class="text-left text-[14px] text-red-600">{errorMsg}</p>
							{/each}
						</div>
					</div>
				</AlertDialog.Header>
				<AlertDialog.Footer class="mt-[20px]">
					<AlertDialog.Cancel on:click={() => (formActionErrors = null)}>Cancel</AlertDialog.Cancel>
					<Button
						disabled={createCandidateLoader}
						type="submit"
						class="{createCandidateLoader ? 'cursor-not-allowed bg-clicked' : 'bg-mainred'}
					 text-[14px] font-semibold"
						on:click={() => (showCreateCandidate = true)}
					>
						{#if createCandidateLoader}
							Creating...
						{:else}
							Create Candidate
						{/if}
					</Button>
				</AlertDialog.Footer>
			</form>
		</AlertDialog.Content>
	</AlertDialog.Root>
{:else}
	<!--Forms for Mobile Screens-->
	<Drawer.Root bind:open={showCreateCandidate}>
		<Drawer.Content>
			<form
				method="post"
				action="APIS?/createCandidateAction"
				enctype="multipart/form-data"
				use:enhance={createCandidateActionNews}
			>
				<Drawer.Header>
					<Drawer.Title>Create Candidate</Drawer.Title>
					<Drawer.Description
						>This will create a candidate that will rely on opened positions.</Drawer.Description
					>
				</Drawer.Header>

				<div class=" flex h-[400px] flex-col gap-[20px] overflow-auto p-[20px]">
					<div class="grid max-w-fit gap-1.5">
						<Label class="text-left " for="fullName">Candidate Photo</Label>
						<label>
							<div class="">
								<img src={candidate_upload_icon} alt="error-upload" />
								<input name="candidatePhoto" type="file" class="hidden" />
							</div>
						</label>
						{#each formActionErrors?.candidatePhoto ?? [] as errorMsg}
							<p class="text-left text-[14px] text-red-600">{errorMsg}</p>
						{/each}
					</div>
					<Select.Root>
						<Select.Trigger class="w-full " disabled={createCandidateLoader}>
							<Select.Value placeholder="Available Positions" />
						</Select.Trigger>
						<Select.Content class="mt-[10px]">
							<Select.Group>
								<Select.Label class="text-left">Available Positions</Select.Label>
								{#each classifications as classification}
									<Select.Item value={classification.value} label={classification.label}
										>{classification.label}</Select.Item
									>
								{/each}
							</Select.Group>
						</Select.Content>
						<Select.Input name="position" />
					</Select.Root>
					{#each formActionErrors?.position ?? [] as errorMsg}
						<p class="text-left text-[14px] text-red-600">{errorMsg}</p>
					{/each}

					<div class="grid w-full gap-1.5">
						<Label class="text-left " for="fullName">Candidate Full Name</Label>
						<Input
							disabled={createCandidateLoader}
							name="fullName"
							class="text-[14px] "
							type="text"
							id="fullName"
							placeholder="Enter candidate fullname"
						/>
						{#each formActionErrors?.fullName ?? [] as errorMsg}
							<p class="text-left text-[14px] text-red-600">{errorMsg}</p>
						{/each}
					</div>
					<div class="grid w-full gap-1.5">
						<Label class="text-left  " for="motto">Candidate Mottos</Label>
						<Textarea
							disabled={createCandidateLoader}
							name="motto"
							class="text-[14px] "
							id="motto"
							placeholder="Enter candidate motto"
						/>
						{#each formActionErrors?.motto ?? [] as errorMsg}
							<p class="text-left text-[14px] text-red-600">{errorMsg}</p>
						{/each}
					</div>

					<Drawer.Footer class="flex flex-col gap-[10px] p-0">
						<Button
							disabled={createCandidateLoader}
							type="submit"
							class="{createCandidateLoader ? 'cursor-not-allowed bg-clicked' : 'bg-mainred'}
					 text-[14px] font-semibold"
							on:click={() => (showCreateCandidate = true)}
						>
							{#if createCandidateLoader}
								Creating...
							{:else}
								Create Candidate
							{/if}
						</Button>
						<Drawer.Close class="h-10 rounded-sm bg-subwhite px-4 py-2 text-[14px] font-semibold "
							>Cancel</Drawer.Close
						>
					</Drawer.Footer>
				</div>
			</form>
		</Drawer.Content>
	</Drawer.Root>
{/if}
