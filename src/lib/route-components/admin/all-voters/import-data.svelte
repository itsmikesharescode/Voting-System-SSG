<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<label class="">
	<div
		class="flex h-[40px] cursor-pointer items-center rounded-lg bg-mainred px-[10px] text-[14px] font-semibold text-white transition-all hover:bg-clicked"
	>
		<p>Import Data</p>
		<input type="file" class="hidden" />
	</div>
</label>
