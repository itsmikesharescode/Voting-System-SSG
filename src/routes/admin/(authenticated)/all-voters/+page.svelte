<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import CreateVoter from '$lib/route-components/admin/all-voters/create-voter.svelte';
	import ImportData from '$lib/route-components/admin/all-voters/import-data.svelte';
	import { getAdminState } from '$lib/stores';
	import type { LayoutServerData } from '../$types';
	import VotersTableCard from '$lib/route-components/admin/all-voters/voters-table-card.svelte';

	const adminState = getAdminState();
	export let data: LayoutServerData;

	const generateHighSchoolList = () =>
		data.user_list.data?.filter((voter) => voter.classification === 'highschool');

	const generateElementaryList = () =>
		data.user_list.data?.filter((voter) => voter.classification === 'elementary');

	const handleHighSchool = () => {
		const { votedFilter, unvotedFilter, notRegisteredFilter } = $adminState.allvoters;

		let tempArray = generateHighSchoolList();
		$adminState.allvoters.activeTab = 'highschool';

		if (votedFilter) {
			return ($adminState.allvoters.userList =
				tempArray?.filter((voter) => voter.not_voted === false && voter.not_registered === false) ??
				[]);
		}

		if (unvotedFilter) {
			return ($adminState.allvoters.userList =
				tempArray?.filter((voter) => voter.not_voted === true && voter.not_registered === false) ??
				[]);
		}

		if (notRegisteredFilter) {
			return ($adminState.allvoters.userList =
				tempArray?.filter((voter) => voter.not_registered === true) ?? []);
		}
	};

	const handleElementary = () => {
		const { votedFilter, unvotedFilter, notRegisteredFilter } = $adminState.allvoters;

		let tempArray = generateElementaryList();
		$adminState.allvoters.activeTab = 'elementary';

		if (votedFilter) {
			return ($adminState.allvoters.userList =
				tempArray?.filter((voter) => voter.not_voted === false && voter.not_registered === false) ??
				[]);
		}

		if (unvotedFilter) {
			return ($adminState.allvoters.userList =
				tempArray?.filter((voter) => voter.not_voted === true && voter.not_registered === false) ??
				[]);
		}

		if (notRegisteredFilter) {
			return ($adminState.allvoters.userList =
				tempArray?.filter((voter) => voter.not_registered === true) ?? []);
		}
	};

	let filterSelection: 'voted' | 'unvoted' | 'notRegistered' = 'voted';

	const updateThis = () => {
		if (filterSelection === 'voted') {
			$adminState.allvoters.votedFilter = true;
			$adminState.allvoters.unvotedFilter = false;
			$adminState.allvoters.notRegisteredFilter = false;
			$adminState.allvoters.activeTab === 'elementary' ? handleElementary() : handleHighSchool();
		} else if (filterSelection === 'unvoted') {
			$adminState.allvoters.votedFilter = false;
			$adminState.allvoters.unvotedFilter = true;
			$adminState.allvoters.notRegisteredFilter = false;
			$adminState.allvoters.activeTab === 'elementary' ? handleElementary() : handleHighSchool();
		} else {
			$adminState.allvoters.votedFilter = false;
			$adminState.allvoters.unvotedFilter = false;
			$adminState.allvoters.notRegisteredFilter = true;
			$adminState.allvoters.activeTab === 'elementary' ? handleElementary() : handleHighSchool();
		}
	};

	$: if (filterSelection === 'voted') {
		$adminState.allvoters.votedFilter = true;
		$adminState.allvoters.unvotedFilter = false;
		$adminState.allvoters.notRegisteredFilter = false;
		$adminState.allvoters.activeTab === 'elementary' ? handleElementary() : handleHighSchool();
	} else if (filterSelection === 'unvoted') {
		$adminState.allvoters.votedFilter = false;
		$adminState.allvoters.unvotedFilter = true;
		$adminState.allvoters.notRegisteredFilter = false;
		$adminState.allvoters.activeTab === 'elementary' ? handleElementary() : handleHighSchool();
	} else {
		$adminState.allvoters.votedFilter = false;
		$adminState.allvoters.unvotedFilter = false;
		$adminState.allvoters.notRegisteredFilter = true;
		$adminState.allvoters.activeTab === 'elementary' ? handleElementary() : handleHighSchool();
	}

	$: data.user_list.data ? updateThis() : '';
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
			<!---Filters-->
			<RadioGroup.Root bind:value={filterSelection} class="mt-[20px]">
				<div class="flex items-center space-x-2">
					<RadioGroup.Item value="voted" id="r1" />
					<Label for="r1">Voted</Label>
				</div>
				<div class="flex items-center space-x-2">
					<RadioGroup.Item value="unvoted" id="r2" />
					<Label for="r2">Unvoted</Label>
				</div>
				<div class="flex items-center space-x-2">
					<RadioGroup.Item value="notRegistered" id="r3" />
					<Label for="r3">Not Registered</Label>
				</div>
				<RadioGroup.Input name="spacing" />
			</RadioGroup.Root>
		</div>

		<VotersTableCard />
	</Tabs.Root>
</div>
