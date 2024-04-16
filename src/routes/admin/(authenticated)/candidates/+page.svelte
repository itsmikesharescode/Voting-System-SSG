<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import CreateCandidate from '$lib/route-components/admin/candidates/create-candidate.svelte';
	import { getAdminState } from '$lib/stores';
	import type { LayoutServerData } from '../$types';

	export let data: LayoutServerData;

	const adminState = getAdminState();
</script>

<div class="mt-[30px] p-[22px]">
	<Tabs.Root bind:value={$adminState.candidates.activeTab} class="w-full">
		<div class="flex w-full flex-wrap justify-between gap-[10px]">
			<div class="">
				<Tabs.List class="">
					<Tabs.Trigger class="w-full" value="highschool">High School</Tabs.Trigger>
					<Tabs.Trigger class="w-full" value="elementary">Elementary</Tabs.Trigger>
				</Tabs.List>
			</div>

			<div class="flex items-center gap-[10px]">
				<div class="">
					<CreateCandidate positionList={data.created_positions.data} />
				</div>
			</div>
		</div>
		<!-- <PositionTableCard /> -->
	</Tabs.Root>
</div>
