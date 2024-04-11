<script lang="ts">
	import { page } from '$app/stores';
	import NavHeader from '$lib/route-components/general/nav-header.svelte';
	import { setAdminState } from '$lib/stores';
	import type { AdminState } from '$lib/types';

	const initialState: AdminState = {
		activeItem: $page.url.pathname,
		dashboard: null,
		votes: {
			activeTab: 'highschool',
			userList: null,
			votedFilter: true,
			unvotedFilter: false,
			notRegisteredFilter: false
		},
		allvoters: null,
		positions: null,
		candidates: null
	};

	setAdminState(initialState);
</script>

<NavHeader />
<slot />
