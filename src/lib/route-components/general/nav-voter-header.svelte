<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { getUserState } from '$lib/stores';

	const userState = getUserState();
</script>

<nav class="flex justify-end bg-subwhite p-[20px]">
	<div class="flex items-center gap-[20px]">
		<p class="text-[16px] font-semibold text-mainred">{$userState?.user_lrn} (LRN)</p>
		<Button class="rounded-[10px] bg-mainred text-[14px] font-semibold">Log out</Button>
	</div>
</nav>
