<script lang="ts">
	import printIcon from '$lib/assets/print_icon.svg';
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<Button class="flex items-center gap-[10px] bg-mainred">
	<img src={printIcon} alt="poorConnection" />
	Print
</Button>
