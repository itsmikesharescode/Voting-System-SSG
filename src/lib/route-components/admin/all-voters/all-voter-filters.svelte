<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { getAdminState } from '$lib/stores';
	import type { UserListDB } from '$lib/types';

	const adminState = getAdminState();
</script>

<Select.Root portal={null}>
	<Select.Trigger class="w-[180px]">
		<Select.Value />
	</Select.Trigger>
	<Select.Content class="mt-[10px]">
		<Select.Group>
			<Select.Label>Choose Filter</Select.Label>

			<Select.Item
				value="voted"
				label="Voted"
				on:click={() => {
					$adminState.votes.votedFilter = true;
					$adminState.votes.unvotedFilter = false;
					$adminState.votes.notRegisteredFilter = false;
				}}>Voted</Select.Item
			>
			<Select.Item
				value="unvoted"
				label="Unvoted"
				on:click={() => {
					$adminState.votes.votedFilter = false;
					$adminState.votes.unvotedFilter = true;
					$adminState.votes.notRegisteredFilter = false;
				}}>Unvoted</Select.Item
			>
			<Select.Item
				value="notRegistered"
				label="Not Registered"
				on:click={() => {
					$adminState.votes.votedFilter = false;
					$adminState.votes.unvotedFilter = false;
					$adminState.votes.notRegisteredFilter = true;
				}}>Not Registered</Select.Item
			>
		</Select.Group>
	</Select.Content>
	<Select.Input name="selectedFilter" />
</Select.Root>
