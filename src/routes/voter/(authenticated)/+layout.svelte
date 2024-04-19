<script lang="ts">
	import type { LayoutServerData } from './$types';
	import { getUserState, setUserState } from '$lib/stores';
	import NavVoterHeader from '$lib/route-components/general/nav-voter-header.svelte';

	export let data: LayoutServerData;

	setUserState(data.userData.data);
</script>

<NavVoterHeader />
<slot />
