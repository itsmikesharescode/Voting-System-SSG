<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index';
	import { Button } from '$lib/components/ui/button/index';
	import type { Candidates } from '$lib/types';

	export let candidate: Candidates;

	let showPlatformDialog = false;
</script>

<Button class="bg-mainred active:bg-clicked" on:click={() => (showPlatformDialog = true)}
	>PLATFORM</Button
>

<AlertDialog.Root bind:open={showPlatformDialog}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>{candidate.candidateName}'s Platform</AlertDialog.Title>
			<AlertDialog.Description class="max-h-[500px] overflow-auto"
				>{candidate.candidateMotto}</AlertDialog.Description
			>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Action>Back</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
