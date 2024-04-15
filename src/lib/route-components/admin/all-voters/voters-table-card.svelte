<script lang="ts">
	import { formatDate } from '$lib/helpers';
	import { getAdminState } from '$lib/stores';
	import { flip } from 'svelte/animate';
	import DeleteVoter from './delete-voter.svelte';
	import UpdateVoterContent from './update-voter-content.svelte';
	import { fade } from 'svelte/transition';

	const adminState = getAdminState();
</script>

<div class=" mt-[10px] text-[14px] font-semibold text-white xs:text-[16px] md:text-[18px]">
	<div class="flex w-full justify-between border-b-[1px] border-b-subwhite bg-mainred p-[10px]">
		<div class=" grid w-full grid-cols-[1fr,1fr,1fr,1fr,190px] gap-[20px] overflow-auto truncate">
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
	</div>

	<div class="max-h-[800px] w-full overflow-auto truncate bg-subwhite">
		{#each $adminState.votes.userList ?? [] as voterObj, index (voterObj.id)}
			<div
				animate:flip={{ duration: 350 }}
				in:fade
				class=" grid w-full grid-cols-[1fr,1fr,1fr,1fr,190px] gap-[20px] border-b-[1px] border-mainred px-[10px] py-[5px] text-mainred"
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
	</div>
</div>
