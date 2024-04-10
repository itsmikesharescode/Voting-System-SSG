<script lang="ts">
	import mobile_close_icon from '$lib/assets/mobile_close_icon.svg';
	import mobile_open_icon from '$lib/assets/mobile_open_icon.svg';
	import { selections } from '$lib';
	import Button from '$lib/components/ui/button/button.svelte';
	import { getAdminState } from '$lib/stores';

	let showMobileMenu = false;
	let logoutLoader = false;

	const adminState = getAdminState();
</script>

<nav
	class="border-b-red flex h-[59px] w-full items-center justify-end border-b-[1px] bg-subwhite px-[15px] sm:justify-start"
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

	<div class="hidden w-full items-center justify-between sm:flex">
		<div class="flex items-center gap-[10px] text-mainred">
			{#each selections as selection}
				<a
					href={selection.url}
					class="text-red max-w-fit underline {$adminState.activeItem === selection.url
						? 'font-bold'
						: ''}"
					on:click={() => ($adminState.activeItem = selection.url)}>{selection.title}</a
				>
			{/each}
		</div>

		<div class="flex items-center gap-[10px]">
			<p class="text-red text-[14px]">Admin</p>

			<Button
				class="{logoutLoader ? 'cursor-not-allowed bg-clicked' : 'bg-mainred'}
				mx-auto rounded-[10px] text-[14px] font-semibold"
				>Log out
			</Button>
		</div>
	</div>
</nav>

{#if showMobileMenu}
	<menu
		class="border-b-red relative flex flex-col gap-[30px] border-b-[1px] border-b-[] bg-subwhite px-[75px] py-[50px] text-[24px] text-mainred sm:hidden"
	>
		{#each selections as selection}
			<a
				href={selection.url}
				class="text-red max-w-fit {$adminState.activeItem === selection.url
					? 'font-bold underline'
					: ''}"
				on:click={() => {
					$adminState.activeItem = selection.url;
					showMobileMenu = false;
				}}
				>{selection.title}
			</a>
		{/each}

		<div class=" mt-[20px] flex items-center justify-end gap-[10px]">
			<p class="text-red text-[14px]">Admin</p>
			<Button>Log out</Button>
		</div>
	</menu>
{/if}