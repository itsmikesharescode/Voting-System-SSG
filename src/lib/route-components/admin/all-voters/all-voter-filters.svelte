<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';

	const selections = [
		{ value: 'voted', label: 'Voted (20)' },
		{ value: 'unvoteed', label: 'Unvoted (30)' },
		{ value: 'notRegistered', label: 'Not Registered (40)' }
	];
</script>

<Select.Root portal={null}>
	<Select.Trigger class="w-[180px]">
		<Select.Value placeholder="Voted (20)" />
	</Select.Trigger>
	<Select.Content class="mt-[10px]">
		<Select.Group>
			<Select.Label>Choose Filter</Select.Label>
			{#each selections as selection}
				<Select.Item value={selection.value} label={selection.label}>{selection.label}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
	<Select.Input name="selectedFilter" />
</Select.Root>
