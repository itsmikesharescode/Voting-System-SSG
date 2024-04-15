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
	}

	let updateVoterLoader = false;
	let formActionErrors: UpdateVoterVal | null = null;
	const updateVoterAccountAction: SubmitFunction = () => {
		updateVoterLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<{ msg: string; errors: UpdateVoterVal }>;
			switch (status) {
				case 200:
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
					formActionErrors = null;
					updateVoterLoader = false;
					break;
			}
			await update();
		};
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
			use:enhance={updateVoterAccountAction}
		>
			<AlertDialog.Header>
				<AlertDialog.Title>Mike John Eviota ?</AlertDialog.Title>
				<AlertDialog.Description>This will update voters information.</AlertDialog.Description>

				<div class=" flex flex-col gap-[20px] pt-[20px]">
					<Select.Root>
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
					<div class="grid w-full gap-1.5">
						<Label class="text-left " for="fullName">Update Voter Full Name</Label>
						<Input
							name="fullName"
							class="text-[14px] "
							type="text"
							id="fullName"
							placeholder="Enter voter fullname"
						/>
					</div>

					<div class="grid w-full gap-1.5">
						<Label class="text-left " for="lrn">Update Voter LRN</Label>
						<Input
							name="lrn"
							class="text-[14px] "
							type="text"
							id="lrn"
							placeholder="Enter voter lrn"
						/>
					</div>

					<div class="grid w-full gap-1.5">
						<Label class="text-left " for="email">Update Voter Email</Label>
						<Input
							name="email"
							class="text-[14px] "
							type="email"
							id="email"
							placeholder="Enter voter email"
						/>
					</div>

					<div class="grid w-full gap-1.5">
						<Label class="text-left " for="password">Update Voter Password</Label>
						<Input
							name="password"
							class="text-[14px] "
							type="password"
							id="password"
							placeholder="Enter voter password"
						/>
					</div>

					<div class="grid w-full gap-1.5">
						<Label class="text-left " for="confirmPassword">Voter Confirm Password</Label>
						<Input
							name="confirmPassword"
							class="text-[14px] "
							type="password"
							id="confirmPassword"
							placeholder="Confirm voter password"
						/>
					</div>
				</div>
			</AlertDialog.Header>
			<AlertDialog.Footer class="mt-[20px]">
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<Button type="submit">Update Account</Button>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
