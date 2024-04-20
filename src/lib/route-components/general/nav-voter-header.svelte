<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import { getUserState } from '$lib/stores';
	import type { ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';

	const userState = getUserState();

	let logoutLoader = false;
	const logoutActionNews: SubmitFunction = () => {
		logoutLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg }
			} = result as ResultModel<{ msg: string }>;

			switch (status) {
				case 200:
					toast.success('Log out', { description: msg });
					logoutLoader = false;
					goto('/voter');
					break;

				case 401:
					toast.error('Log out', { description: msg });
					logoutLoader = false;
					break;
			}
			await update();
		};
	};
</script>

<nav class="sticky top-0 z-10 flex justify-end border-b-[1px] border-mainred bg-subwhite p-[20px]">
	<div class="flex items-center gap-[20px]">
		<p class="text-[16px] font-semibold text-mainred">{$userState?.user_lrn} (LRN)</p>
		<form
			method="post"
			action="/voter?/logoutAction"
			enctype="multipart/form-data"
			use:enhance={logoutActionNews}
		>
			<Button
				disabled={logoutLoader}
				type="submit"
				class="{logoutLoader ? 'cursor-not-allowed bg-clicked' : 'bg-mainred'}
                rounded-[10px]  text-[14px] font-semibold"
			>
				{#if logoutLoader}
					Logging out...
				{:else}
					Log out
				{/if}
			</Button>
		</form>
	</div>
</nav>
