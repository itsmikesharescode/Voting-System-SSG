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
			filterSelection: 'voted'
		},
		positions: {
			activeTab: 'highschool',
			createdPositions: null
		},
		candidates: {
			activeTab: 'highschool',
			createdCandidates: null,
			filterSelection: null
		}
	};

	setAdminState(initialState);
</script>

<NavHeader />
<slot />
