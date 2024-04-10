<script lang="ts">
	import mobile_close_icon from '$lib/assets/mobile_close_icon.svg';
	import mobile_open_icon from '$lib/assets/mobile_open_icon.svg';
	import { selections } from '$lib';

	let showMobileMenu = false;
</script>

<nav
	class="bg-subwhite border-b-red flex h-[59px] w-full items-center justify-end border-b-[1px] px-[15px]"
>
	<button
		class="rounded-[10px] p-[10px] transition-all active:scale-105"
		on:click={() => (showMobileMenu = !showMobileMenu)}
	>
		<img
			src={showMobileMenu ? mobile_open_icon : mobile_close_icon}
			alt={mobile_close_icon}
			class=""
		/>
	</button>
</nav>

{#if showMobileMenu}
	<menu class="bg-subwhite flex flex-col gap-[30px] border-b-[] py-[50px] text-[24px]">
		{#each selections as selection}
			<a href={selection.url} class="text-red px-[75px]">{selection.title}</a>
		{/each}
	</menu>
{/if}
