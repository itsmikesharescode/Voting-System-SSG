<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import AllVoterFilters from '$lib/route-components/admin/all-voters/all-voter-filters.svelte';
	import CreateVoter from '$lib/route-components/admin/all-voters/create-voter.svelte';
	import ImportData from '$lib/route-components/admin/all-voters/import-data.svelte';
	import { getAdminState } from '$lib/stores';
	import type { PageServerData } from './$types';

	const adminState = getAdminState();
	export let data: PageServerData;

	//filter functions
	const generateVotedCount = () => data.user_list.data?.filter((voter) => voter.is_voted === true);
	const generateUnvotedCount = () =>
		data.user_list.data?.filter((voter) => voter.is_voted === true);
	const generateNotRegisteredCount = () =>
		data.user_list.data?.filter((voter) => voter.is_registered === false);
</script>

<div class="mt-[30px] p-[22px]">
	<Tabs.Root value="highschool" class="w-full">
		<div class="flex w-full flex-wrap justify-between gap-[10px]">
			<div class="">
				<Tabs.List class="">
					<Tabs.Trigger class="w-full" value="highschool">High School</Tabs.Trigger>
					<Tabs.Trigger class="w-full" value="elementary">Elementary</Tabs.Trigger>
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
			<AllVoterFilters />
		</div>

		<Tabs.Content value="highschool" class="mt-[30px] ">highschool</Tabs.Content>
		<Tabs.Content value="elementary" class="mt-[30px]">Elementary Votes</Tabs.Content>
	</Tabs.Root>
</div>
