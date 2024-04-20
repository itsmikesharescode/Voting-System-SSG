<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import VotesTableCard from '$lib/route-components/admin/votes/votes-table-card.svelte';
	import { fade } from 'svelte/transition';

	export let showRealTimeResult = false;
</script>

<div class="m-[20px] md:m-[40px]" in:fade>
	<Button on:click={() => (showRealTimeResult = false)}>Back</Button>
	real time vote count here
</div>
