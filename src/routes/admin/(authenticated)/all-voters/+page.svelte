<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import CreateVoter from '$lib/route-components/admin/all-voters/create-voter.svelte';
	import ImportData from '$lib/route-components/admin/all-voters/import-data.svelte';
	import { getAdminState } from '$lib/stores';
	import * as Select from '$lib/components/ui/select/index.js';
	import type { LayoutServerData } from '../$types';
	import VotersTableCard from '$lib/route-components/admin/all-voters/voters-table-card.svelte';

	const adminState = getAdminState();
	export let data: LayoutServerData;

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
				tempArray?.filter((voter) => voter.not_voted === false && voter.not_registered === false) ??
				[]);
		}

		if (unvotedFilter) {
			return ($adminState.votes.userList =
				tempArray?.filter((voter) => voter.not_voted === true && voter.not_registered === false) ??
				[]);
		}

		if (notRegisteredFilter) {
			return ($adminState.votes.userList =
				tempArray?.filter((voter) => voter.not_registered === true) ?? []);
		}
	};

	const handleElementary = () => {
		const { votedFilter, unvotedFilter, notRegisteredFilter } = $adminState.votes;

		let tempArray = generateElementaryList();
		$adminState.votes.activeTab = 'elementary';

		if (votedFilter) {
			return ($adminState.votes.userList =
				tempArray?.filter((voter) => voter.not_voted === false && voter.not_registered === false) ??
				[]);
		}

		if (unvotedFilter) {
			return ($adminState.votes.userList =
				tempArray?.filter((voter) => voter.not_voted === true && voter.not_registered === false) ??
				[]);
		}

		if (notRegisteredFilter) {
			return ($adminState.votes.userList =
				tempArray?.filter((voter) => voter.not_registered === true) ?? []);
		}
	};

	let filterSelection: 'voted' | 'unvoted' | 'notRegistered' = 'voted';

	const updateThis = () => {
		if (filterSelection === 'voted') {
			$adminState.votes.votedFilter = true;
			$adminState.votes.unvotedFilter = false;
			$adminState.votes.notRegisteredFilter = false;
			$adminState.votes.activeTab === 'elementary' ? handleElementary() : handleHighSchool();
		} else if (filterSelection === 'unvoted') {
			$adminState.votes.votedFilter = false;
			$adminState.votes.unvotedFilter = true;
			$adminState.votes.notRegisteredFilter = false;
			$adminState.votes.activeTab === 'elementary' ? handleElementary() : handleHighSchool();
		} else {
			$adminState.votes.votedFilter = false;
			$adminState.votes.unvotedFilter = false;
			$adminState.votes.notRegisteredFilter = true;
			$adminState.votes.activeTab === 'elementary' ? handleElementary() : handleHighSchool();
		}
	};

	$: if (filterSelection === 'voted') {
		$adminState.votes.votedFilter = true;
		$adminState.votes.unvotedFilter = false;
		$adminState.votes.notRegisteredFilter = false;
		$adminState.votes.activeTab === 'elementary' ? handleElementary() : handleHighSchool();
	} else if (filterSelection === 'unvoted') {
		$adminState.votes.votedFilter = false;
		$adminState.votes.unvotedFilter = true;
		$adminState.votes.notRegisteredFilter = false;
		$adminState.votes.activeTab === 'elementary' ? handleElementary() : handleHighSchool();
	} else {
		$adminState.votes.votedFilter = false;
		$adminState.votes.unvotedFilter = false;
		$adminState.votes.notRegisteredFilter = true;
		$adminState.votes.activeTab === 'elementary' ? handleElementary() : handleHighSchool();
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
