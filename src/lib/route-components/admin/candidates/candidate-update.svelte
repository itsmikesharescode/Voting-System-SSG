<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select/index';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { CandidatesDB, PositionsDB, ResultModel } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';
	import * as Drawer from '$lib/components/ui/drawer';
	import { Textarea } from '$lib/components/ui/textarea';
	import candidate_upload_icon from '$lib/assets/candidate_upload_icon.svg';
	import type { Selected } from 'bits-ui';

	export let positionList: PositionsDB[] | null;
	export let candidateObj: CandidatesDB | null;

	const classifications = [
		{ value: 'highschool', label: 'High School' },
		{ value: 'elementary', label: 'Elementary' }
	];
	let availablePositions: PositionsDB[] | undefined = undefined;

	let selected: Selected<{ value: string; label: string }>;
	const handleSelections = (classification: string) => {
		availablePositions = positionList?.filter(
			(position) => position.classification === classification
		);
	};

	interface CreateCandidateVal {
		candidatePhoto: string[];
		classification: string[];
		position: string[];
		fullName: string[];
		motto: string[];
	}

	let showUpdateCandidate = false;
	let updateCandidateLoader = false;
	let formActionErrors: CreateCandidateVal | null = null;

	//for uploading profile
	let uploadLoader = false;
	let previewURL: string | undefined = candidateObj?.candidate_photo_link;
	let files: FileList | undefined = undefined;

	const handleFileChange = (event: Event) => {
		const fileInput = event.currentTarget as HTMLInputElement;
		const file = fileInput.files?.[0];
		if (file && file.type.startsWith('image/')) {
			const reader = new FileReader();
			reader.onload = () => {
				previewURL = reader.result as string;
			};
			reader.readAsDataURL(file);
		}
	};

	const updateCandidateNews: SubmitFunction = () => {
		updateCandidateLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<{ msg: string; errors: CreateCandidateVal }>;

			switch (status) {
				case 200:
					invalidateAll();
					formActionErrors = null;
					updateCandidateLoader = false;
					toast.success('Create Voter', { description: msg });
					showUpdateCandidate = false;
					break;

				case 400:
					formActionErrors = errors;
					updateCandidateLoader = false;
					break;

				case 401:
					formActionErrors = null;
					toast.error('Create Voter', { description: msg });
					updateCandidateLoader = false;
					break;
			}
			await update();
		};
	};

	let nativeWidthValue = 0;
</script>

<svelte:window bind:innerWidth={nativeWidthValue} />

<Button class="w-full transition-all hover:bg-mainred" on:click={() => (showUpdateCandidate = true)}
	>Update</Button
>

{#if nativeWidthValue > 768}
	<!--Forms for Desktop-->
	<AlertDialog.Root bind:open={showUpdateCandidate}>
		<AlertDialog.Content>
			<form
				method="post"
				action="APIS?/updateCandidateAction"
				enctype="multipart/form-data"
				use:enhance={updateCandidateNews}
			>
				<AlertDialog.Header>
					<AlertDialog.Title>Update Candidate</AlertDialog.Title>
					<AlertDialog.Description>This will update candidate information.</AlertDialog.Description>

					<div class=" flex flex-col gap-[20px] pt-[20px]">
						<div class="grid max-w-fit gap-1.5">
							<Label class="text-left " for="fullName">Candidate Photo</Label>
							<label
								title="Upload Candidate Photo"
								class="cursor-pointer transition-all active:scale-95"
							>
								<div class="">
									<img
										src={previewURL ? previewURL : candidateObj?.candidate_photo_link}
										alt="error-upload"
										class="h-[150px] w-[150px] rounded-[10px]"
									/>
									<input
										name="candidatePhoto"
										type="file"
										class="hidden"
										bind:files
										on:change={handleFileChange}
										accept=".jpg, .jpeg, .png, .webp"
									/>
								</div>
							</label>
							{#each formActionErrors?.candidatePhoto ?? [] as errorMsg}
								<p class="text-left text-[14px] text-red-600">{errorMsg}</p>
							{/each}
						</div>
						<div class="grid w-full gap-1.5">
							<Select.Root bind:selected>
								<Select.Trigger class="w-full " disabled={updateCandidateLoader}>
									<Select.Value placeholder="Choose voter classification" />
								</Select.Trigger>
								<Select.Content class="mt-[10px]">
									<Select.Group>
										<Select.Label class="text-left">Select Voter Classification</Select.Label>
										{#each classifications as classification}
											<Select.Item
												value={classification.value}
												label={classification.label}
												on:click={() => handleSelections(classification.value)}
												>{classification.label}</Select.Item
											>
										{/each}
									</Select.Group>
								</Select.Content>
								<Select.Input name="classification" />
							</Select.Root>
							{#each formActionErrors?.classification ?? [] as errorMsg}
								<p class="text-left text-[14px] text-red-600">{errorMsg}</p>
							{/each}
						</div>

						{#key selected}
							<div class="grid w-full gap-1.5">
								<Select.Root>
									<Select.Trigger class="w-full " disabled={updateCandidateLoader}>
										<Select.Value placeholder="Available Positions" />
									</Select.Trigger>
									<Select.Content class="mt-[10px]">
										<Select.Group>
											<Select.Label class="text-left">Available Positions</Select.Label>
											{#each availablePositions ?? [] as positionObj}
												<Select.Item
													value={JSON.stringify(positionObj)}
													label={positionObj.position_name}>{positionObj.position_name}</Select.Item
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
						{/key}

						<div class="grid w-full gap-1.5">
							<Label class="text-left " for="fullName">Candidate Full Name</Label>
							<Input
								disabled={updateCandidateLoader}
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
								disabled={updateCandidateLoader}
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
					<AlertDialog.Cancel
						on:click={() => {
							formActionErrors = null;
							files = undefined;
							previewURL = undefined;
						}}>Cancel</AlertDialog.Cancel
					>
					<Button
						disabled={updateCandidateLoader}
						type="submit"
						class="{updateCandidateLoader ? 'cursor-not-allowed bg-mainred' : ''}
					 text-[14px] font-semibold hover:bg-mainred"
						on:click={() => (showUpdateCandidate = true)}
					>
						{#if updateCandidateLoader}
							Updating...
						{:else}
							Update Candidate
						{/if}
					</Button>
				</AlertDialog.Footer>
			</form>
		</AlertDialog.Content>
	</AlertDialog.Root>
{:else}
	<!--Forms for Mobile Screens-->
	<Drawer.Root bind:open={showUpdateCandidate}>
		<Drawer.Content>
			<form
				method="post"
				action="APIS?/updateCandidateAction"
				enctype="multipart/form-data"
				use:enhance={updateCandidateNews}
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
						<label
							title="Upload Candidate Photo"
							class="cursor-pointer transition-all active:scale-95"
						>
							<div class="">
								<img
									src={previewURL ? previewURL : candidate_upload_icon}
									alt="error-upload"
									class="h-[150px] w-[150px] rounded-[10px]"
								/>
								<input
									name="candidatePhoto"
									type="file"
									class="hidden"
									bind:files
									on:change={handleFileChange}
									accept=".jpg, .jpeg, .png, .webp"
								/>
							</div>
						</label>
						{#each formActionErrors?.candidatePhoto ?? [] as errorMsg}
							<p class="text-left text-[14px] text-red-600">{errorMsg}</p>
						{/each}
					</div>
					<div class="grid w-full gap-1.5">
						<Select.Root>
							<Select.Trigger class="w-full " disabled={updateCandidateLoader}>
								<Select.Value placeholder="Choose voter classification" />
							</Select.Trigger>
							<Select.Content class="mt-[10px]">
								<Select.Group>
									<Select.Label class="text-left">Select Voter Classification</Select.Label>
									{#each classifications as classification}
										<Select.Item value={classification.value} label={classification.label}
											>{classification.label}</Select.Item
										>
									{/each}
								</Select.Group>
							</Select.Content>
							<Select.Input name="classification" />
						</Select.Root>
						{#each formActionErrors?.classification ?? [] as errorMsg}
							<p class="text-left text-[14px] text-red-600">{errorMsg}</p>
						{/each}
					</div>

					<div class="grid w-full gap-1.5">
						<Select.Root>
							<Select.Trigger class="w-full " disabled={updateCandidateLoader}>
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
							disabled={updateCandidateLoader}
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
							disabled={updateCandidateLoader}
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
							disabled={updateCandidateLoader}
							type="submit"
							class="{updateCandidateLoader ? 'cursor-not-allowed bg-clicked' : 'bg-mainred'}
					 text-[14px] font-semibold"
							on:click={() => (showUpdateCandidate = true)}
						>
							{#if updateCandidateLoader}
								Creating...
							{:else}
								Create Candidate
							{/if}
						</Button>
						<Drawer.Close
							class="h-10 rounded-sm bg-subwhite px-4 py-2 text-[14px] font-semibold "
							on:click={() => (formActionErrors = null)}
							>Cancel
						</Drawer.Close>
					</Drawer.Footer>
				</div>
			</form>
		</Drawer.Content>
	</Drawer.Root>
{/if}
