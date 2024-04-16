<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import { getAdminState } from '$lib/stores';

	const adminState = getAdminState();
</script>

<div class="mt-[30px] p-[22px]">
	<Tabs.Root bind:value={$adminState.positions.activeTab} class="w-full">
		<div class="flex w-full flex-wrap justify-between gap-[10px]">
			<div class="">
				<Tabs.List class="">
					<Tabs.Trigger class="w-full" value="highschool">High School</Tabs.Trigger>
					<Tabs.Trigger class="w-full" value="elementary">Elementary</Tabs.Trigger>
				</Tabs.List>
			</div>

			<div class="flex items-center gap-[10px]">
				<div class="">
					<!-- <CreatePosition /> -->
				</div>
			</div>
		</div>
		<!-- <PositionTableCard /> -->
	</Tabs.Root>
</div>
