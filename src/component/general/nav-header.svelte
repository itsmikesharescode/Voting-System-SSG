<script lang="ts">
	import mobile_close_icon from '$lib/assets/mobile_close_icon.svg';
	import mobile_open_icon from '$lib/assets/mobile_open_icon.svg';
	import { selections } from '$lib';
</script>

<nav
	class="flex h-[59px] w-full items-center justify-end border-b-[1px] border-b-[#800000] px-[15px]"
>
	<button class="rounded-[10px] p-[10px] transition-all active:scale-105">
		<img src={mobile_close_icon} alt={mobile_close_icon} class="" />
	</button>
</nav>
