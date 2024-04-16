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

	const classifications = [
		{ value: 'highschool', label: 'High School' },
		{ value: 'elementary', label: 'Elementary' }
	];

	interface CreateVoterVal {
		classification: string[];
		fullName: string[];
		voterLrn: string[];
		email: string[];
		password: string[];
		confirmPassword: string[];
	}

	let showCreateCandidate = false;
	let createCandidateLoader = false;
	let formActionErrors: CreateVoterVal | null = null;

	const createCandidateActionNews: SubmitFunction = () => {
		createCandidateLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<{ msg: string; errors: CreateVoterVal }>;

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

{#if nativeWidthValue > 1024}
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
					<AlertDialog.Title>Create Voter</AlertDialog.Title>
					<AlertDialog.Description>
						This will create a voter account for Lazaro Francisco Integrated School (SSG).
					</AlertDialog.Description>

					<div class=" flex flex-col gap-[20px] pt-[20px]">
						<Select.Root>
							<Select.Trigger class="w-full " disabled={createCandidateLoader}>
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

						<div class="grid w-full gap-1.5">
							<Label class="text-left " for="fullName">Voter Full Name</Label>
							<Input
								disabled={createCandidateLoader}
								name="fullName"
								class="text-[14px] "
								type="text"
								id="fullName"
								placeholder="Enter voter fullname"
							/>
							{#each formActionErrors?.fullName ?? [] as errorMsg}
								<p class="text-left text-[14px] text-red-600">{errorMsg}</p>
							{/each}
						</div>

						<div class="grid w-full gap-1.5">
							<Label class="text-left  " for="voterLrn">Voter LRN</Label>
							<Input
								disabled={createCandidateLoader}
								name="voterLrn"
								class="text-[14px] "
								type="text"
								id="voterLrn"
								placeholder="Enter voter lrn"
							/>
							{#each formActionErrors?.voterLrn ?? [] as errorMsg}
								<p class="text-left text-[14px] text-red-600">{errorMsg}</p>
							{/each}
						</div>

						<div class="grid w-full gap-1.5">
							<Label class="text-left  " for="email">Voter Email</Label>
							<Input
								disabled={createCandidateLoader}
								name="email"
								class="text-[14px] "
								type="email"
								id="email"
								placeholder="Enter voter email"
							/>
							{#each formActionErrors?.email ?? [] as errorMsg}
								<p class="text-left text-[14px] text-red-600">{errorMsg}</p>
							{/each}
						</div>

						<div class="grid w-full items-center gap-1.5">
							<Label class="text-left  " for="password">Voter Password</Label>
							<Input
								disabled={createCandidateLoader}
								name="password"
								class="text-[14px] "
								type="password"
								id="password"
								placeholder="Enter voter password"
							/>
							{#each formActionErrors?.password ?? [] as errorMsg}
								<p class="text-left text-[14px] text-red-600">{errorMsg}</p>
							{/each}
						</div>

						<div class="grid w-full items-center gap-1.5">
							<Label class="text-left  " for="confirmPassword">Voter Confirm Password</Label>
							<Input
								disabled={createCandidateLoader}
								name="confirmPassword"
								class="text-[14px] "
								type="password"
								id="confirmPassword"
								placeholder="Enter voter password"
							/>
							{#each formActionErrors?.confirmPassword ?? [] as errorMsg}
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
							Create Voter
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
				action="APIS?/createVoterAction"
				enctype="multipart/form-data"
				use:enhance={createCandidateAction}
			>
				<Drawer.Header>
					<Drawer.Title>Create Voter</Drawer.Title>
					<Drawer.Description
						>This will create a voter account for Lazaro Francisco Integrated School (SSG).</Drawer.Description
					>
				</Drawer.Header>

				<div class=" flex h-[400px] flex-col gap-[20px] overflow-auto p-[20px]">
					<Select.Root>
						<Select.Trigger class="w-full " disabled={createCandidateLoader}>
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

					<div class="grid w-full gap-1.5">
						<Label class="text-left " for="fullName">Voter Full Name</Label>
						<Input
							disabled={createCandidateLoader}
							name="fullName"
							class="text-[14px] "
							type="text"
							id="fullName"
							placeholder="Enter voter fullname"
						/>
						{#each formActionErrors?.fullName ?? [] as errorMsg}
							<p class="text-left text-[14px] text-red-600">{errorMsg}</p>
						{/each}
					</div>

					<div class="grid w-full gap-1.5">
						<Label class="text-left  " for="voterLrn">Voter LRN</Label>
						<Input
							disabled={createCandidateLoader}
							name="voterLrn"
							class="text-[14px] "
							type="text"
							id="voterLrn"
							placeholder="Enter voter lrn"
						/>
						{#each formActionErrors?.voterLrn ?? [] as errorMsg}
							<p class="text-left text-[14px] text-red-600">{errorMsg}</p>
						{/each}
					</div>

					<div class="grid w-full gap-1.5">
						<Label class="text-left  " for="email">Voter Email</Label>
						<Input
							disabled={createCandidateLoader}
							name="email"
							class="text-[14px] "
							type="email"
							id="email"
							placeholder="Enter voter email"
						/>
						{#each formActionErrors?.email ?? [] as errorMsg}
							<p class="text-left text-[14px] text-red-600">{errorMsg}</p>
						{/each}
					</div>

					<div class="grid w-full items-center gap-1.5">
						<Label class="text-left  " for="password">Voter Password</Label>
						<Input
							disabled={createCandidateLoader}
							name="password"
							class="text-[14px] "
							type="password"
							id="password"
							placeholder="Enter voter password"
						/>
						{#each formActionErrors?.password ?? [] as errorMsg}
							<p class="text-left text-[14px] text-red-600">{errorMsg}</p>
						{/each}
					</div>

					<div class="grid w-full items-center gap-1.5">
						<Label class="text-left  " for="confirmPassword">Voter Confirm Password</Label>
						<Input
							disabled={createCandidateLoader}
							name="confirmPassword"
							class="text-[14px] "
							type="password"
							id="confirmPassword"
							placeholder="Enter voter password"
						/>
						{#each formActionErrors?.confirmPassword ?? [] as errorMsg}
							<p class="text-left text-[14px] text-red-600">{errorMsg}</p>
						{/each}
					</div>
				</div>

				<Drawer.Footer class="flex flex-col gap-[10px]">
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
							Create Voter
						{/if}
					</Button>
					<Drawer.Close class="h-10 rounded-sm bg-subwhite px-4 py-2 text-[14px] font-semibold "
						>Cancel</Drawer.Close
					>
				</Drawer.Footer>
			</form>
		</Drawer.Content>
	</Drawer.Root>
{/if}
