<script lang="ts">
	import { formatDate } from '$lib/helpers';
	import { getAdminState, getUserState } from '$lib/stores';

	const adminState = getAdminState();
</script>

<div class=" mt-[10px] text-[14px] font-semibold text-white xs:text-[16px] md:text-[18px]">
	<div class="flex w-full justify-between border-b-[1px] border-b-subwhite bg-mainred p-[10px]">
		<div class=" grid w-full grid-cols-4 gap-[20px] overflow-auto truncate">
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
		</div>
	</div>

	<div class="max-h-[800px] w-full overflow-auto truncate bg-subwhite">
		{#each $adminState.votes.userList ?? [] as voterObj}
			<div
				class=" grid w-full grid-cols-4 gap-[20px] border-b-[1px] border-mainred px-[10px] py-[5px] text-mainred"
			>
				<button
					class="grid max-w-fit overflow-auto transition-all duration-200 after:absolute after:right-full after:top-0 after:z-[-1] after:h-full after:w-full after:bg-white after:duration-200 hover:text-slate-950 hover:underline hover:after:translate-x-full"
				>
					{voterObj.user_fullname}
				</button>

				<div class="grid overflow-auto">
					<p>{voterObj.user_lrn}</p>
				</div>
				<div class="grid overflow-auto">
					<p>{voterObj.user_email}</p>
				</div>

				<div class="grid overflow-auto">
					<p>{formatDate(voterObj.created_at)}</p>
				</div>
			</div>
		{/each}
	</div>
</div>
