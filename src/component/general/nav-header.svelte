<script lang="ts">
	import mobile_close_icon from '$lib/assets/mobile_close_icon.svg';
	import mobile_open_icon from '$lib/assets/mobile_open_icon.svg';
	import { selections } from '$lib';
	import Button from '$lib/components/ui/button/button.svelte';

	let showMobileMenu = false;
</script>

<nav
	class="bg-subwhite border-b-red flex h-[59px] w-full items-center justify-end border-b-[1px] px-[15px]"
>
	<button
		class="rounded-[10px] p-[10px] transition-all active:scale-105 sm:hidden"
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
	<menu
		class="bg-subwhite border-b-red relative flex flex-col gap-[30px] border-b-[1px] border-b-[] px-[75px] py-[50px] text-[24px] sm:hidden"
	>
		{#each selections as selection}
			<a href={selection.url} class="text-red max-w-fit">{selection.title}</a>
		{/each}

		<div class=" mt-[20px] flex items-center justify-end gap-[10px]">
			<p class="text-red text-[14px]">Admin</p>
			<Button>Log out</Button>
		</div>
	</menu>
{/if}
