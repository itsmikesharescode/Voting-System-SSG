<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ResultModel } from '$lib/types';
	import { toast } from 'svelte-sonner';

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

	let showCreateVoter = false;
	let createVoterLoader = false;
	let formActionErrors: CreateVoterVal | null = null;

	const createVoterActionNews: SubmitFunction = () => {
		createVoterLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<{ msg: string; errors: CreateVoterVal }>;

			switch (status) {
				case 200:
					formActionErrors = null;
					createVoterLoader = false;
					toast.success('Create Voter', { description: msg });
					break;

				case 400:
					formActionErrors = errors;
					createVoterLoader = false;
					break;

				case 401:
					formActionErrors = null;
					toast.error('Create Voter', { description: msg });
					createVoterLoader = false;
					break;
			}
			await update();
		};
	};
</script>

<Button
	class="rounded-[10px] bg-mainred text-[14px] font-semibold"
	on:click={() => (showCreateVoter = true)}>Create Voter</Button
>

<AlertDialog.Root bind:open={showCreateVoter}>
	<AlertDialog.Content>
		<form
			method="post"
			action="?/createVoterAction"
			enctype="multipart/form-data"
			use:enhance={createVoterActionNews}
		>
			<AlertDialog.Header>
				<AlertDialog.Title>Create Voter</AlertDialog.Title>
				<AlertDialog.Description>
					This will create a voter account for Lazaro Francisco Integrated School (SSG).
				</AlertDialog.Description>

				<div class=" flex flex-col gap-[20px] pt-[20px]">
					<Select.Root>
						<Select.Trigger class="w-full" disabled={createVoterLoader}>
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
						<p class="text-[14px] text-red-600">{errorMsg}</p>
					{/each}

					<div class="grid w-full gap-1.5">
						<Label class="text-left text-red-900" for="username">Voter Full Name</Label>
						<Input
							disabled={createVoterLoader}
							name="fullName"
							class="text-[14px] text-red-900"
							type="text"
							id="fullName"
							placeholder="Enter voter fullname"
						/>
					</div>

					<div class="grid w-full gap-1.5">
						<Label class="text-left text-red-900 " for="username">Voter LRN</Label>
						<Input
							disabled={createVoterLoader}
							name="voterLrn"
							class="text-[14px] text-red-900"
							type="text"
							id="voterLrn"
							placeholder="Enter voter lrn"
						/>
					</div>

					<div class="grid w-full gap-1.5">
						<Label class="text-left text-red-900 " for="username">Voter Email</Label>
						<Input
							disabled={createVoterLoader}
							name="email"
							class="text-[14px] text-red-900"
							type="email"
							id="email"
							placeholder="Enter voter email"
						/>
					</div>

					<div class="grid w-full items-center gap-1.5">
						<Label class="text-left text-red-900 " for="username">Voter Password</Label>
						<Input
							disabled={createVoterLoader}
							name="password"
							class="text-[14px] text-red-900"
							type="password"
							id="password"
							placeholder="Enter voter password"
						/>
					</div>

					<div class="grid w-full items-center gap-1.5">
						<Label class="text-left text-red-900 " for="username">Voter Confirm Password</Label>
						<Input
							disabled={createVoterLoader}
							name="password"
							class="text-[14px] text-red-900"
							type="password"
							id="password"
							placeholder="Enter voter password"
						/>
					</div>
				</div>
			</AlertDialog.Header>
			<AlertDialog.Footer class="mt-[20px]">
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<Button
					disabled={createVoterLoader}
					type="submit"
					class="{createVoterLoader ? 'cursor-not-allowed bg-clicked' : 'bg-mainred'}
					rounded-[10px] text-[14px] font-semibold"
					on:click={() => (showCreateVoter = true)}
				>
					{#if createVoterLoader}
						Creating...
					{:else}
						Create Voter
					{/if}
				</Button>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
