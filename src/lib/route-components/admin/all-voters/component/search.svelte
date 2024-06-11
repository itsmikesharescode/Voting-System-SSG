<script lang="ts">
	import { Search } from 'lucide-svelte';

	export let searchTerms: string;
</script>

<div class="relative flex items-center">
	<Search class="absolute ml-[10px]" />
	<input
		type="search"
		placeholder="Search voter"
		class="w-full rounded-lg border-[1px] border-black p-[10px] pl-[40px] sm:max-w-[400px]"
		bind:value={searchTerms}
	/>
</div>
