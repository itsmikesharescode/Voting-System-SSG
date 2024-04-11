<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select/index.js';

	let showCreateVoter = false;

	const classifications = [
		{ value: 'highschool', label: 'High School' },
		{ value: 'elementary', label: 'Elementary' }
	];
</script>

<Button
	class="rounded-[10px] bg-mainred text-[14px] font-semibold"
	on:click={() => (showCreateVoter = true)}>Create Voter</Button
>

<AlertDialog.Root bind:open={showCreateVoter}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Create Voter</AlertDialog.Title>
			<AlertDialog.Description>
				This will create a voter account for Lazaro Francisco Integrated School (SSG).
			</AlertDialog.Description>

			<Select.Root portal={null}>
				<Select.Trigger class="w-full">
					<Select.Value placeholder="Select a fruit" />
				</Select.Trigger>
				<Select.Content>
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

			<div class=" flex flex-col gap-[20px] pt-[20px]">
				<div class="grid w-full gap-1.5">
					<Label class="text-left text-red-900" for="username">Voter Full Name</Label>
					<Input
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
				class="rounded-[10px] bg-mainred text-[14px] font-semibold"
				on:click={() => (showCreateVoter = true)}>Create Voter</Button
			>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
