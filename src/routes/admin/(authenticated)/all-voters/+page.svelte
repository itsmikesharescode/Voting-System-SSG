<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import AllVoterFilters from '$lib/route-components/admin/all-voters/all-voter-filters.svelte';
	import CreateVoter from '$lib/route-components/admin/all-voters/create-voter.svelte';
	import ImportData from '$lib/route-components/admin/all-voters/import-data.svelte';
	import { getAdminState } from '$lib/stores';
	import * as Select from '$lib/components/ui/select/index.js';
	import type { UserListDB } from '$lib/types';
	import type { PageServerData } from './$types';

	const adminState = getAdminState();
	export let data: PageServerData;

	const generateHighSchoolList = () =>
		data.user_list.data?.filter((voter) => voter.classification === 'highschool');

	const generateElementaryList = () =>
		data.user_list.data?.filter((voter) => voter.classification === 'elementary');

	const handleHighSchool = () => {
		const { votedFilter, unvotedFilter, notRegisteredFilter } = $adminState.votes;

		let tempArray = generateHighSchoolList();
		$adminState.votes.activeTab = 'highschool';

		if (votedFilter) {
			return ($adminState.votes.userList =
				tempArray?.filter((voter) => voter.is_voted === true) ?? []);
		}

		if (unvotedFilter) {
			return ($adminState.votes.userList =
				tempArray?.filter((voter) => voter.is_voted === false) ?? []);
		}

		if (notRegisteredFilter) {
			return ($adminState.votes.userList =
				tempArray?.filter((voter) => voter.is_registered === false) ?? []);
		}
	};

	const handleElementary = () => {
		const { votedFilter, unvotedFilter, notRegisteredFilter } = $adminState.votes;

		let tempArray = generateElementaryList();
		$adminState.votes.activeTab = 'elementary';

		if (votedFilter) {
			return ($adminState.votes.userList =
				tempArray?.filter((voter) => voter.is_voted === true) ?? []);
		}

		if (unvotedFilter) {
			return ($adminState.votes.userList =
				tempArray?.filter((voter) => voter.is_voted === false) ?? []);
		}

		if (notRegisteredFilter) {
			return ($adminState.votes.userList =
				tempArray?.filter((voter) => voter.is_registered === false) ?? []);
		}
	};
</script>

<div class="mt-[30px] p-[22px]">
	<Tabs.Root class="w-full">
		<div class="flex w-full flex-wrap justify-between gap-[10px]">
			<div class="">
				<Tabs.List class="">
					<Tabs.Trigger class="w-full" value="highschool" on:click={handleHighSchool}
						>High School</Tabs.Trigger
					>
					<Tabs.Trigger class="w-full" value="elementary" on:click={handleElementary}
						>Elementary</Tabs.Trigger
					>
				</Tabs.List>
			</div>

			<div class="flex items-center gap-[10px]">
				<div class="">
					<CreateVoter />
				</div>

				<div class="">
					<ImportData />
				</div>
			</div>
		</div>

		<div class="mt-[10px]">
			<Select.Root portal={null}>
				<Select.Trigger class="w-[180px]">
					<Select.Value />
				</Select.Trigger>
				<Select.Content class="mt-[10px]">
					<Select.Group>
						<Select.Label>Choose Filter</Select.Label>

						<Select.Item
							value="voted"
							label="Voted"
							on:click={() => {
								$adminState.votes.votedFilter = true;
								$adminState.votes.unvotedFilter = false;
								$adminState.votes.notRegisteredFilter = false;
								$adminState.votes.activeTab === 'elementary'
									? handleElementary()
									: handleHighSchool();
							}}>Voted</Select.Item
						>
						<Select.Item
							value="unvoted"
							label="Unvoted"
							on:click={() => {
								$adminState.votes.votedFilter = false;
								$adminState.votes.unvotedFilter = true;
								$adminState.votes.notRegisteredFilter = false;
								$adminState.votes.activeTab === 'elementary'
									? handleElementary()
									: handleHighSchool();
							}}>Unvoted</Select.Item
						>
						<Select.Item
							value="notRegistered"
							label="Not Registered"
							on:click={() => {
								$adminState.votes.votedFilter = false;
								$adminState.votes.unvotedFilter = false;
								$adminState.votes.notRegisteredFilter = true;
								$adminState.votes.activeTab === 'elementary'
									? handleElementary()
									: handleHighSchool();
							}}>Not Registered</Select.Item
						>
					</Select.Group>
				</Select.Content>
				<Select.Input name="selectedFilter" />
			</Select.Root>
		</div>

		{#each $adminState.votes.userList ?? [] as voter}
			<p>{voter.user_fullname}</p>
		{/each}
	</Tabs.Root>
</div>
