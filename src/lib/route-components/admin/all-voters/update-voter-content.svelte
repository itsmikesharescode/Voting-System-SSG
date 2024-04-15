<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select/index';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ResultModel, UserListDB } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import { fade } from 'svelte/transition';
	import { invalidateAll } from '$app/navigation';

	export let voterObj: UserListDB;

	const classifications = [
		{ value: 'highschool', label: 'High School' },
		{ value: 'elementary', label: 'Elementary' }
	];

	let showUpdateVoterDialoag = false;

	interface UpdateVoterVal {
		classification: string[];
		fullName: string[];
		voterLrn: string[];
		email: string[];
		password: string[];
		confirmPassword: string[];
	}

	let updateVoterLoader = false;
	let formActionErrors: UpdateVoterVal | null = null;
	const updateVoterAccountActionNews: SubmitFunction = () => {
		updateVoterLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<{ msg: string; errors: UpdateVoterVal }>;
			switch (status) {
				case 200:
					invalidateAll();
					formActionErrors = null;
					toast.success('Update Voter', { description: msg });
					updateVoterLoader = false;
					showUpdateVoterDialoag = false;
					break;

				case 400:
					formActionErrors = errors;
					updateVoterLoader = false;
					break;

				case 401:
					toast.error('Update Voter', { description: msg });
					formActionErrors = null;
					updateVoterLoader = false;
					break;
			}
			await update();
		};
	};

	const detectClassification = () => {
		const matchedArray = classifications.filter(
			(classification) => classification.value === voterObj.classification
		);

		return matchedArray[0];
	};
</script>

<Button
	class="w-full transition-all hover:bg-mainred"
	on:click={() => (showUpdateVoterDialoag = true)}>Update</Button
>

<AlertDialog.Root bind:open={showUpdateVoterDialoag}>
	<AlertDialog.Content>
		<form
			method="post"
			action="APIS?/updateVoterAccountAction"
			enctype="multipart/form-data"
			use:enhance={updateVoterAccountActionNews}
		>
			<input name="voterId" type="hidden" value={voterObj.id} />
			<input name="userId" type="hidden" value={voterObj.user_id ?? 'no value'} />
			<AlertDialog.Header>
				<AlertDialog.Title>{voterObj.user_fullname}</AlertDialog.Title>
				<AlertDialog.Description>This will update voters information.</AlertDialog.Description>

				<div class=" flex flex-col gap-[20px] pt-[20px]">
					<Select.Root selected={detectClassification()} disabled={updateVoterLoader}>
						<Select.Trigger class="w-full">
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
						<p class="text-left text-[14px] text-red-600" in:fade>{errorMsg}</p>
					{/each}
					<div class="grid w-full gap-1.5">
						<Label class="text-left " for="fullName">Update Voter Full Name</Label>
						<Input
							disabled={updateVoterLoader}
							name="fullName"
							class="text-[14px] "
							type="text"
							id="fullName"
							placeholder="Enter voter fullname"
							value={voterObj.user_fullname}
						/>
						{#each formActionErrors?.fullName ?? [] as errorMsg}
							<p class="text-left text-[14px] text-red-600" in:fade>{errorMsg}</p>
						{/each}
					</div>

					<div class="grid w-full gap-1.5">
						<Label class="text-left " for="voterLrn">Update Voter LRN</Label>
						<Input
							disabled={updateVoterLoader}
							name="voterLrn"
							class="text-[14px] "
							type="text"
							id="voterLrn"
							placeholder="Enter voter lrn"
							value={voterObj.user_lrn}
						/>
						{#each formActionErrors?.voterLrn ?? [] as errorMsg}
							<p class="text-left text-[14px] text-red-600" in:fade>{errorMsg}</p>
						{/each}
					</div>

					<div class="grid w-full gap-1.5">
						<Label class="text-left " for="email">Update Voter Email</Label>
						<Input
							disabled={updateVoterLoader}
							name="email"
							class="text-[14px] "
							type="email"
							id="email"
							placeholder="Enter voter email"
							value={voterObj.user_email}
						/>
						{#each formActionErrors?.email ?? [] as errorMsg}
							<p class="text-left text-[14px] text-red-600" in:fade>{errorMsg}</p>
						{/each}
					</div>

					<div class="grid w-full gap-1.5">
						<Label class="text-left " for="password">Update Voter Password</Label>
						<Input
							disabled={updateVoterLoader}
							name="password"
							class="text-[14px] "
							type="password"
							id="password"
							placeholder="Enter voter password"
						/>
						{#each formActionErrors?.password ?? [] as errorMsg}
							<p class="text-left text-[14px] text-red-600" in:fade>{errorMsg}</p>
						{/each}
					</div>

					<div class="grid w-full gap-1.5">
						<Label class="text-left " for="confirmPassword">Voter Confirm Password</Label>
						<Input
							disabled={updateVoterLoader}
							name="confirmPassword"
							class="text-[14px] "
							type="password"
							id="confirmPassword"
							placeholder="Confirm voter password"
						/>
						{#each formActionErrors?.confirmPassword ?? [] as errorMsg}
							<p class="text-left text-[14px] text-red-600" in:fade>{errorMsg}</p>
						{/each}
					</div>
				</div>
			</AlertDialog.Header>
			<AlertDialog.Footer class="mt-[20px]">
				<AlertDialog.Cancel disabled={updateVoterLoader} on:click={() => (formActionErrors = null)}
					>Cancel
				</AlertDialog.Cancel>
				<Button
					disabled={updateVoterLoader}
					class="hover:bg-mainred active:bg-clicked"
					type="submit"
				>
					{#if updateVoterLoader}
						Updating...
					{:else}
						Update Account
					{/if}
				</Button>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
