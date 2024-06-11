<script lang="ts">
	import { formatDate } from '$lib/helpers';
	import { getAdminState } from '$lib/stores';
	import { flip } from 'svelte/animate';
	import DeleteVoter from './delete-voter.svelte';
	import UpdateVoterContent from './update-voter-content.svelte';
	import { fade } from 'svelte/transition';
	import type { UserListDB } from '$lib/types';

	export let filteredUsers: UserListDB[] | undefined;
</script>

<div class="mt-[10px] text-[14px] font-semibold text-white xs:text-[16px] md:text-[18px]">
	<div
		class="hidden w-full gap-[20px] overflow-auto bg-mainred p-[10px] lg:grid lg:grid-cols-[1fr,1fr,1fr,300px,190px]"
	>
		<div class="grid overflow-auto">
			<p class="">Voter Full Name</p>
		</div>
		<div class="grid overflow-auto">
			<p class="">LRN</p>
		</div>
		<div class="grid overflow-auto">
			<p class="">Email</p>
		</div>

		<div class="grid overflow-auto">
			<p class="">Date Created</p>
		</div>

		<div class="grid overflow-auto">
			<p class="">Options</p>
		</div>
	</div>

	<div class="  flex flex-col gap-[10px] text-mainred lg:gap-[5px]">
		{#if filteredUsers}
			{#each filteredUsers ?? [] as voterObj, index (voterObj.id)}
				<div
					animate:flip={{ duration: 350 }}
					class="grid items-center gap-[20px] border-b-[1px] bg-subwhite p-[10px] lg:grid lg:grid-cols-[1fr,1fr,1fr,300px,190px]"
				>
					<div class="grid overflow-auto">
						<p>{voterObj.user_fullname}</p>
					</div>

					<div class="grid overflow-auto">
						<p>{voterObj.user_lrn}</p>
					</div>
					<div class="grid overflow-auto">
						<p>{voterObj.user_email}</p>
					</div>

					<div class="grid overflow-auto">
						<p>{formatDate(voterObj.created_at)}</p>
					</div>

					<div class="w-full">
						<div class="flex w-full items-center gap-[10px]">
							<UpdateVoterContent {voterObj} />
							<DeleteVoter {voterObj} />
						</div>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>
