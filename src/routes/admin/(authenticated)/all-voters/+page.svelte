<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import CreateVoter from '$lib/route-components/admin/all-voters/create-voter.svelte';
	import ImportData from '$lib/route-components/admin/all-voters/import-data.svelte';
	import { getAdminState } from '$lib/stores';
	import type { LayoutServerData } from '../$types';
	import VotersTableCard from '$lib/route-components/admin/all-voters/voters-table-card.svelte';
	import type { UserListDB } from '$lib/types';

	const adminState = getAdminState();
	export let data: LayoutServerData;

	const handleSelections = (classification: 'highschool' | 'elementary') => {
		const { filterSelection } = $adminState.allvoters;

		$adminState.allvoters.activeTab = classification;

		let tempArray: UserListDB[] | undefined = undefined;

		if (filterSelection === 'voted') {
			tempArray = data.user_list.data?.filter(
				(voter) =>
					voter.classification === classification &&
					voter.not_voted === false &&
					voter.not_registered === false
			);
		} else if (filterSelection === 'unvoted') {
			tempArray = data.user_list.data?.filter(
				(voter) =>
					voter.classification === classification &&
					voter.not_voted === true &&
					voter.not_registered === false
			);
		} else if (filterSelection === 'notRegistered') {
			tempArray = data.user_list.data?.filter(
				(voter) => voter.classification === classification && voter.not_registered === true
			);
		}

		if (tempArray) $adminState.allvoters.userList = tempArray;
	};

	$: $adminState.allvoters.filterSelection ? handleSelections($adminState.allvoters.activeTab) : '';

	$: data.user_list.data ? handleSelections($adminState.allvoters.activeTab) : '';
</script>

<div class="mt-[30px] p-[22px]">
	<Tabs.Root bind:value={$adminState.allvoters.activeTab} class="w-full">
		<div class="flex w-full flex-wrap justify-between gap-[10px]">
			<div class="">
				<Tabs.List class="">
					<Tabs.Trigger
						class="w-full"
						value="highschool"
						on:click={() => handleSelections('highschool')}
					>
						High School
					</Tabs.Trigger>

					<Tabs.Trigger
						class="w-full"
						value="elementary"
						on:click={() => handleSelections('elementary')}
					>
						Elementary
					</Tabs.Trigger>
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
			<RadioGroup.Root bind:value={$adminState.allvoters.filterSelection} class="mt-[20px]">
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
