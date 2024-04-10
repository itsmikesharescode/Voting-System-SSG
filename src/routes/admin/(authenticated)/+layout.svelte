<script lang="ts">
	import { setAdminState } from '$lib/stores';
	import type { AdminState } from '$lib/types';

	const initialState: AdminState = {
		activeItem: '/admin/dashboard',
		dashboard: null,
		votes: null,
		allvoters: null,
		positions: null,
		candidates: null
	};

	setAdminState(initialState);
</script>

<div class=""></div>
