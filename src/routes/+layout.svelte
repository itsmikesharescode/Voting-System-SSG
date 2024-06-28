<script lang="ts">
	import '../app.pcss';
	import { Toaster } from 'svelte-sonner';
	import { navigating } from '$app/stores';
	import { Circle3 } from 'svelte-loading-spinners';
	import { supabaseStore } from '$lib/stores';

	import type { LayoutData } from './$types';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';

	export let data: LayoutData;

	supabaseStore.set(data.supabase);

	onMount(() => {
		const {
			data: { subscription }
		} = data.supabase.auth.onAuthStateChange(async (event, _session) => {
			if (_session?.expires_at !== data.session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<Toaster richColors />
{#if $navigating}
	<div class="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-[#00000088]">
		<div class="flex flex-col items-center justify-center">
			<Circle3 size="150" unit="px" duration="1s" />
			<p class="font-semibold text-white">Connecting to Servers.</p>
		</div>
	</div>
{/if}
<slot />
