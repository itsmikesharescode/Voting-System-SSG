<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	export let title = '';
	export let total: number | undefined = 0;
	export let imageUrl = '';
</script>

<!--
    @component
    defaults to title: string, total: string, imageUrl: string
    
-->

<Card.Root class="bg-mainred">
	<Card.Header>
		<Card.Title class="text-white">{title}</Card.Title>
	</Card.Header>
	<Card.Content class="flex justify-between">
		<img src={imageUrl} alt="poorConnection" />

		<p class="text-[36px] text-white">{total}</p>
	</Card.Content>
</Card.Root>
