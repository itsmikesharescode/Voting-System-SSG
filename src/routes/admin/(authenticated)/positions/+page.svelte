<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import { getAdminState } from '$lib/stores';
	import PositionTableCard from '$lib/route-components/admin/positions/position-table-card.svelte';
	import CreatePosition from '$lib/route-components/admin/positions/create-position.svelte';
	import type { LayoutServerData } from '../$types';
	import { onMount } from 'svelte';

	export let data: LayoutServerData;

	const adminState = getAdminState();

	const handleSelections = (classification: string) => {
		$adminState.positions.activeTab = classification;

		const tempArray = data.created_positions.data?.filter(
			(position) => position.classification === $adminState.positions.activeTab
		);

		if (tempArray) $adminState.positions.createdPositions = tempArray;
	};

	$: if (data.created_positions.data) {
		$adminState.positions.createdPositions = data.created_positions.data;
		handleSelections($adminState.positions.activeTab);
	}
</script>

<div class="mt-[30px] p-[22px]">
	<Tabs.Root bind:value={$adminState.positions.activeTab} class="w-full">
		<div class="flex w-full flex-wrap justify-between gap-[10px]">
			<div class="">
				<Tabs.List class="">
					<Tabs.Trigger
						class="w-full"
						value="highschool"
						on:click={() => handleSelections('highschool')}
						>High School
					</Tabs.Trigger>
					<Tabs.Trigger
						class="w-full"
						value="elementary"
						on:click={() => handleSelections('elementary')}
						>Elementary
					</Tabs.Trigger>
				</Tabs.List>
			</div>

			<div class="flex items-center gap-[10px]">
				<div class="">
					<CreatePosition />
				</div>
			</div>
		</div>
		<PositionTableCard />
	</Tabs.Root>
</div>
