<script lang="ts">
	import { formatDate } from '$lib/helpers';
	import { getAdminState } from '$lib/stores';
	import { flip } from 'svelte/animate';
	import DeletePosition from './delete-position.svelte';
	import UpdatePosition from './update-position.svelte';
	import { fade } from 'svelte/transition';

	const adminState = getAdminState();
</script>

<div class="mt-[10px] text-[14px] font-semibold text-white xs:text-[16px] md:text-[18px]">
	<div
		class="hidden w-full gap-[20px] overflow-auto bg-mainred p-[10px] md:grid md:grid-cols-[1fr,150px,300px,190px]"
	>
		<div class="grid overflow-auto">
			<p class="">Positions</p>
		</div>
		<div class="grid overflow-auto">
			<p class="">Maximum Vote</p>
		</div>

		<div class="grid overflow-auto">
			<p class="">Date Created</p>
		</div>

		<div class="grid overflow-auto">
			<p class="">Options</p>
		</div>
	</div>

	<div class="  flex flex-col gap-[10px] text-mainred md:gap-[5px]">
		{#each $adminState.positions.createdPositions ?? [] as positionObj, index (positionObj.id)}
			<div
				animate:flip={{ duration: 350 }}
				in:fade
				class="grid items-center gap-[20px] border-b-[1px] bg-subwhite p-[10px] md:grid md:grid-cols-[1fr,150px,300px,190px]"
			>
				<div class="grid overflow-auto">
					<p class="md:hidden">Position:</p>
					<p>{positionObj.position_name}</p>
				</div>

				<div class="grid overflow-auto">
					<p class="md:hidden">Maximum Votes:</p>
					<p>{positionObj.maximum_votes}</p>
				</div>

				<div class="grid overflow-auto">
					<p class="md:hidden">Date Created:</p>
					<p>{formatDate(positionObj.created_at)}</p>
				</div>

				<div class="grid overflow-auto">
					<div class="flex w-full items-center gap-[10px]">
						<UpdatePosition {positionObj} />
						<DeletePosition {positionObj} />
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
