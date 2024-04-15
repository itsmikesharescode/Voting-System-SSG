<script lang="ts">
	import { page } from '$app/stores';
	import NavHeader from '$lib/route-components/general/nav-header.svelte';
	import { setAdminState } from '$lib/stores';
	import type { AdminState } from '$lib/types';

	const initialState: AdminState = {
		activeItem: $page.url.pathname,
		dashboard: null,
		votes: null,
		allvoters: {
			activeTab: 'highschool',
			userList: null,
			votedFilter: true,
			unvotedFilter: false,
			notRegisteredFilter: false
		},
		positions: {
			activeTab: 'highschool',
			createdPositions: null
		},
		candidates: null
	};

	setAdminState(initialState);
</script>

<NavHeader />
<slot />
