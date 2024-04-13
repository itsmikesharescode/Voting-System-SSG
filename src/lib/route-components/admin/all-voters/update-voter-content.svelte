<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select/index';
	const classifications = [
		{ value: 'highschool', label: 'High School' },
		{ value: 'elementary', label: 'Elementary' }
	];
	let showUpdateVoterDialoag = false;
</script>

<Button
	class="w-full transition-all hover:bg-mainred"
	on:click={() => (showUpdateVoterDialoag = true)}>Update</Button
>

<AlertDialog.Root bind:open={showUpdateVoterDialoag}>
	<AlertDialog.Content>
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
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action>Continue</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
