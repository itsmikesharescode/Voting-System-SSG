<script lang="ts">
	import DashboardCard from '$lib/route-components/admin/dashboard/dashboard-card.svelte';
	import totalUsersIcon from '$lib/assets/total_users_icon.svg';
	import totalCandidatesIcon from '$lib/assets/total_candidates_icon.svg';
	import totalPositionsIcon from '$lib/assets/total_positions_icon.svg';
</script>

<div class="  mt-[30px] grid gap-[20px] px-[15px] lg:grid-cols-2">
	<div class="">
		<DashboardCard title="Total Voter" total="30" imageUrl={totalUsersIcon} />
	</div>

	<div class="">
		<DashboardCard title="Total Voted" total="25" imageUrl={totalUsersIcon} />
	</div>

	<div class="">
		<DashboardCard title="Created Candidates" total="10" imageUrl={totalCandidatesIcon} />
	</div>

	<div class="">
		<DashboardCard title="Created Positions" total="5" imageUrl={totalPositionsIcon} />
	</div>
</div>
